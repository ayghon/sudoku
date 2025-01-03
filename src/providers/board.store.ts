import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cell, GameMode, GameStatus, Position } from '@types';
import { getSudoku } from 'sudoku-gen';
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn as create } from 'zustand/traditional';

type History = (Omit<Cell, 'notes'> & { note?: number })[];

type BoardAction = {
  selectCell: (position: Position) => void;
  getHighlightForPosition: (position: Position) => boolean;
  fillCell: (value?: number, note?: number, position?: Position) => void;
  getCellFilled: (position: Position) => Cell | undefined;
  toggleNotesMode: () => void;
  eraseCell: (position?: Position) => void;
  undoLastMove: () => void;
  initialiseBoard: (mode: GameMode) => void;
  checkCellValidity: (position: Position) => boolean;
  checkIsFinished: () => boolean;
  checkGameStatus: () => GameStatus;
  solvePuzzle: () => void;
  toggleHighlights: () => void;
};

type BoardState = {
  isHighlightsEnabled: boolean;
  gameStatus: GameStatus;
  history: History;
  selectedCell?: Position;
  filledCells: Cell[];
  isNotesModeEnabled: boolean;
  highlightedNumber?: number;
  startNumbers: Cell[];
  solution: Cell[];
  numbersDepleted: { value: number; count: number }[];
};

type BoardStore = BoardState & BoardAction;

const positionsAreEqual = (positionA: Position, positionB: Position) => {
  return positionA.column === positionB.column && positionA.line === positionB.line;
};

export const useBoardState = create<BoardStore>()(
  persist(
    (set, get) => ({
      checkCellValidity: (position) => {
        const cellFilled = get().getCellFilled(position);

        if (!cellFilled) {
          return true;
        }

        const { fixed, value } = cellFilled;

        if (fixed || !value) {
          return true;
        }

        return !get().filledCells.find((cell) => {
          if (
            // different values or same position
            cell.value !== cellFilled.value ||
            positionsAreEqual(cellFilled.position, cell.position)
          ) {
            return false;
          }

          if (
            // same column or same line
            cell.position.column === cellFilled.position.column ||
            cell.position.line === cellFilled.position.line
          ) {
            return true;
          }

          // same box
          return (
            Math.floor(cell.position.column / 3) === Math.floor(cellFilled.position.column / 3) &&
            Math.floor(cell.position.line / 3) === Math.floor(cellFilled.position.line / 3)
          );
        });
      },
      checkGameStatus: () => {
        if (get().filledCells.length === get().startNumbers.length) {
          return GameStatus.Idle;
        }

        const isFinished = get().checkIsFinished();

        if (!isFinished) {
          return GameStatus.InProgress;
        }

        const boardValidity = get().filledCells.map(
          ({ fixed, position }): boolean => fixed || get().checkCellValidity(position),
        );
        const isVictorious = !boardValidity.some((value) => !value);

        if (isVictorious) {
          return GameStatus.Victorious;
        } else {
          return GameStatus.Failure;
        }
      },
      checkIsFinished: () => {
        const fullBoard = get().filledCells.length === 81;
        const noNotes = !get().filledCells.find((cell) => cell.notes?.length);

        return fullBoard && noNotes;
      },
      eraseCell: (position) => {
        const selectedPoint = position ?? get().selectedCell;

        if (!selectedPoint) {
          throw new Error('Missing position');
        }

        const cell = get().getCellFilled(selectedPoint);
        if (cell?.fixed) {
          throw new Error('Invalid operation: You cannot update a fixed cell');
        }

        return set({
          filledCells: get().filledCells.filter(
            (cell) => !positionsAreEqual(cell.position, selectedPoint),
          ),
          numbersDepleted: get().numbersDepleted.map((item) =>
            item.value === cell?.value
              ? {
                  ...item,
                  count: item.count > 0 ? item.count - 1 : 0,
                }
              : item,
          ),
        });
      },
      fillCell: (value, note, position?: Position) => {
        const newPoint = position ?? get().selectedCell;

        if (!newPoint) {
          throw new Error('Missing position');
        }
        if (typeof value === 'undefined' && typeof note === 'undefined') {
          throw new Error('Missing cell value or cell note');
        }

        const cellToUpdate = get().filledCells.find((cell) =>
          positionsAreEqual(cell.position, newPoint),
        );

        if (cellToUpdate?.fixed) {
          throw new Error('Invalid operation: You cannot update a fixed cell');
        }

        const isUpdate = !!cellToUpdate;

        // don't update if values are identical
        if (isUpdate && typeof value !== 'undefined' && cellToUpdate.value === value) {
          return;
        }

        if (!isUpdate) {
          const newFilledCells = [
            ...get().filledCells,
            value
              ? { fixed: false, notes: [], position: newPoint, value }
              : {
                  fixed: false,
                  notes: [note as number],
                  position: newPoint,
                },
          ];

          return set({
            filledCells: newFilledCells,
            highlightedNumber: value,
            history: [...get().history, { fixed: false, note, position: newPoint, value }],
            numbersDepleted: get().numbersDepleted.map((item) =>
              item.value === value
                ? {
                    ...item,
                    count: item.count < 9 ? item.count + 1 : 9,
                  }
                : item,
            ),
            selectedCell: newPoint,
          });
        }

        const modifiedCells = get().filledCells.map((cell) => {
          if (!positionsAreEqual(cell.position, newPoint)) {
            return cell;
          }

          if (!note) {
            const modifiedCell = { fixed: false, notes: [], position: newPoint, value };

            set({
              history: [...get().history, { fixed: false, position: newPoint, value }],
              numbersDepleted: get().numbersDepleted.map((item) => {
                if (item.value === cell.value) {
                  return {
                    ...item,
                    count: item.count > 0 ? item.count - 1 : 0,
                  };
                }

                if (item.value === value) {
                  return {
                    ...item,
                    count: item.count < 9 ? item.count + 1 : 9,
                  };
                }

                return item;
              }),
            });

            return modifiedCell;
          }

          const modifiedNotes = {
            fixed: false,
            notes: cell.notes?.includes(note)
              ? cell.notes?.filter((n) => n !== note)
              : [...(cell.notes ?? []), note],
            position: newPoint,
            value: undefined,
          };

          set({
            history: [...get().history, { fixed: false, note, position: newPoint }],
          });

          return modifiedNotes;
        });

        return set({
          filledCells: modifiedCells,
          highlightedNumber: value,
          selectedCell: newPoint,
        });
      },
      filledCells: [] as Cell[],
      gameStatus: GameStatus.Idle,
      getCellFilled: (position) =>
        get().filledCells.find((filledCell) => positionsAreEqual(filledCell.position, position)),
      getHighlightForPosition: (position) => {
        const selected = get().selectedCell;

        if (!selected || positionsAreEqual(selected, position)) {
          return false;
        }

        return selected.column === position.column || selected.line === position.line;
      },
      history: [],
      initialiseBoard: (mode) => {
        const modeToDifficulty: Difficulty = mode.toLowerCase() as Difficulty;
        const sudoku = getSudoku(modeToDifficulty);

        const sudokuGeneratorToFilledCells = sudokuToCells(sudoku.puzzle);
        const sudokuGeneratorSolution = sudokuToCells(sudoku.solution);

        return set({
          filledCells: sudokuGeneratorToFilledCells,
          gameStatus: GameStatus.InProgress,
          highlightedNumber: undefined,
          history: [],
          isNotesModeEnabled: false,
          numbersDepleted: get().numbersDepleted.map((item) => {
            const count = sudokuGeneratorToFilledCells.reduce(
              (acc, it) => (item.value === it.value ? (acc += 1) : acc),
              0,
            );
            return { ...item, count };
          }),
          selectedCell: undefined,
          solution: sudokuGeneratorSolution,
          startNumbers: sudokuGeneratorToFilledCells,
        });
      },
      isHighlightsEnabled: true,
      isNotesModeEnabled: false,
      numbersDepleted: new Array(9).fill(0).map((value, index) => ({
        count: value,
        value: index + 1,
      })),
      selectCell: (position) => {
        set({ selectedCell: position });

        const { value } = get().getCellFilled(position) ?? {};

        if (get().isHighlightsEnabled) {
          set({
            highlightedNumber: value,
          });
        }
      },
      solution: [],
      solvePuzzle: () =>
        set({
          filledCells: get().solution,
          startNumbers: [],
        }),
      startNumbers: [] as Cell[],
      toggleHighlights: () => {
        const isHighlightEnabled = !get().isHighlightsEnabled;

        const selectedCell = get().selectedCell;
        const highlightedNumber =
          get().highlightedNumber || (selectedCell && get().getCellFilled(selectedCell)?.value);

        set({
          highlightedNumber: isHighlightEnabled ? highlightedNumber : undefined,
          isHighlightsEnabled: isHighlightEnabled,
        });
      },
      toggleNotesMode: () => set({ isNotesModeEnabled: !get().isNotesModeEnabled }),
      undoLastMove: () => {
        const history = get().history;
        const lastMove = history.slice(-1)[0];
        const lastMoveForLastPosition = history
          .slice(0, -1)
          .findLast((move) => positionsAreEqual(move.position, lastMove.position));

        get().eraseCell(lastMove.position);
        if (lastMoveForLastPosition) {
          get().fillCell(
            lastMoveForLastPosition.value,
            lastMoveForLastPosition.note,
            lastMoveForLastPosition.position,
          );
        }

        return set({
          history: history.slice(0, -1),
          numbersDepleted: get().numbersDepleted.map((item) =>
            item.value === lastMove.value
              ? {
                  ...item,
                  count: item.count > 0 ? item.count - 1 : 0,
                }
              : item,
          ),
        });
      },
    }),
    {
      name: '@board-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

const sudokuToCells = (sudoku: string): Cell[] =>
  sudoku.split('').reduce<Cell[]>((acc, it, index) => {
    if (it === '-') {
      return acc;
    }

    const line = Math.floor(index / 9);
    return [
      ...acc,
      {
        fixed: true,
        position: {
          column: index - 9 * line,
          line,
        },
        value: parseInt(it, 10),
      },
    ];
  }, []);
