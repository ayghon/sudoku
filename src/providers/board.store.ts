import { createStore, useStore } from 'zustand';

export type Position = { line: number; column: number };
export type Cell = { position: Position; value?: number; notes?: number[] };

type BoardStore = {
  selectedCell?: Position;
  selectCell: (position: Position) => void;
  getHighlightForPosition: (position: Position) => boolean;
  fillCell: (value?: number, note?: number, position?: Position) => void;
  filledCells: Cell[];
  getCellFilledValue: (position: Position) => number[] | number | undefined;
  isNotesModeEnabled: boolean;
  toggleNotesMode: () => void;
  eraseCell: (position?: Position) => void;
  history: (Omit<Cell, 'notes'> & { note?: number })[];
  undoLastMove: () => void;
  highlightedNumber: number | undefined;
};

const positionsAreEqual = (positionA: Position, positionB: Position) => {
  return positionA.column === positionB.column && positionA.line === positionB.line;
};

const boardStore = createStore<BoardStore>((set, get) => ({
  eraseCell: (position) => {
    const selectedPoint = position ?? get().selectedCell;

    if (!selectedPoint) {
      throw new Error('Missing position');
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
    const isUpdate = !!cellToUpdate;

    if (isUpdate && typeof value !== 'undefined' && cellToUpdate.value === value) {
      return;
    }

    if (!isUpdate) {
      const newFilledCells = [
        ...get().filledCells,
        value
          ? { notes: [], position: newPoint, value }
          : {
              notes: [note as number],
              position: newPoint,
            },
      ];

      return set({
        filledCells: newFilledCells,
        highlightedNumber: value,
        history: [...get().history, { note, position: newPoint, value }],
        selectedCell: newPoint,
      });
    }

    const modifiedCells = get().filledCells.map((cell) => {
      if (!positionsAreEqual(cell.position, newPoint)) {
        return cell;
      }

      if (!note) {
        const modifiedCell = { notes: [], position: newPoint, value };

        set({
          history: [...get().history, { position: newPoint, value }],
        });

        return modifiedCell;
      }

      const modifiedNotes = {
        notes: cell.notes?.includes(note)
          ? cell.notes?.filter((n) => n !== note)
          : [...(cell.notes ?? []), note],
        position: newPoint,
        value: undefined,
      };

      set({
        history: [...get().history, { note, position: newPoint }],
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
  getCellFilledValue: (position) => {
    const { notes, value } =
      get().filledCells.find((filledCell) => positionsAreEqual(filledCell.position, position)) ??
      {};

    return value ?? notes;
  },
  getHighlightForPosition: (position) => {
    const selected = get().selectedCell;

    if (!selected || positionsAreEqual(selected, position)) {
      return false;
    }

    return selected.column === position.column || selected.line === position.line;
  },
  highlightedNumber: undefined,
  history: [],
  isNotesModeEnabled: false,
  selectCell: (position) => {
    set({ selectedCell: position });

    const filledValue = get().getCellFilledValue(position);

    set({
      highlightedNumber: !!filledValue && !Array.isArray(filledValue) ? filledValue : undefined,
    });
  },
  selectedCell: undefined,
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
