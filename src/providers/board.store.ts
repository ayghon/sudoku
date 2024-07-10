import { mockCells } from '@constants';
import { Cell, Position } from '@types';
import { createStore, useStore } from 'zustand';

type BoardStore = {
  selectedCell?: Position;
  selectCell: (position: Position) => void;
  getHighlightForPosition: (position: Position) => boolean;
  fillCell: (value?: number, note?: number, position?: Position) => void;
  filledCells: Cell[];
  getCellFilled: (position: Position) => Cell | undefined;
  isNotesModeEnabled: boolean;
  toggleNotesMode: () => void;
  eraseCell: (position?: Position) => void;
  history: (Omit<Cell, 'notes'> & { note?: number })[];
  undoLastMove: () => void;
  highlightedNumber: number | undefined;
  startNumbers: Cell[];
  initialiseBoard: () => void;
  checkCellValidity: (position: Position) => boolean;
};

const positionsAreEqual = (positionA: Position, positionB: Position) => {
  return positionA.column === positionB.column && positionA.line === positionB.line;
};

const boardStore = createStore<BoardStore>((set, get) => ({
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
  eraseCell: (position) => {
    const selectedPoint = position ?? get().selectedCell;

    if (!selectedPoint) {
      throw new Error('Missing position');
    }

    if (get().filledCells.find((cell) => positionsAreEqual(cell.position, selectedPoint))?.fixed) {
      throw new Error('Invalid operation: You cannot update a fixed cell');
    }

    return set({
      filledCells: get().filledCells.filter(
        (cell) => !positionsAreEqual(cell.position, selectedPoint),
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
  filledCells: [],
  getCellFilled: (position) =>
    get().filledCells.find((filledCell) => positionsAreEqual(filledCell.position, position)),
  getHighlightForPosition: (position) => {
    const selected = get().selectedCell;

    if (!selected || positionsAreEqual(selected, position)) {
      return false;
    }

    return selected.column === position.column || selected.line === position.line;
  },
  highlightedNumber: undefined,
  history: [],
  initialiseBoard: () => {
    return set({
      filledCells: mockCells,
      startNumbers: mockCells,
    });
  },
  isNotesModeEnabled: false,
  selectCell: (position) => {
    set({ selectedCell: position });

    const { value } = get().getCellFilled(position) ?? {};

    set({
      highlightedNumber: value,
    });
  },
  selectedCell: undefined,
  startNumbers: [],
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
    });
  },
}));

export const useBoardState = () => useStore(boardStore);
