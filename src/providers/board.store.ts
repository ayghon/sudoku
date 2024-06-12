import { createStore, useStore } from 'zustand';

export type Position = { line: number; column: number };

type BoardStore = {
  selectedCell?: Position;
  selectCell: (position: Position) => void;
  getHighlightForPosition: (position: Position) => boolean;
  fillCell: (value?: number, note?: number, position?: Position) => void;
  filledCells: { position: Position; value?: number; notes?: number[] }[];
  getCellFilledValue: (position: Position) => number[] | number | undefined;
  isNotesModeEnabled: boolean;
  toggleNotesMode: () => void;
  eraseCell: (position?: Position) => void;
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

    const isUpdate = !!get().filledCells.find((cell) => positionsAreEqual(cell.position, newPoint));

    const newFilledCell = [
      ...get().filledCells,
      value
        ? { notes: [], position: newPoint, value }
        : {
            notes: [note as number],
            position: newPoint,
          },
    ];
    const modifiedCell = get().filledCells.map((cell) => {
      if (!positionsAreEqual(cell.position, newPoint)) {
        return cell;
      }
      if (!note) {
        return { ...cell, notes: [], position: newPoint, value };
      }

      return {
        ...cell,
        notes: cell.notes?.includes(note)
          ? cell.notes?.filter((n) => n !== note)
          : [...(cell.notes ?? []), note],
        position: newPoint,
        value: undefined,
      };
    });

    return set({
      filledCells: isUpdate ? modifiedCell : newFilledCell,
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
  isNotesModeEnabled: false,
  selectCell: (position) => set({ selectedCell: position }),
  selectedCell: undefined,
  toggleNotesMode: () => set({ isNotesModeEnabled: !get().isNotesModeEnabled }),
}));

export const useBoardState = () => useStore(boardStore);
