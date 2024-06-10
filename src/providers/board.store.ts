import { createStore, useStore } from 'zustand';

type Position = { line: number; column: number };

type BoardStore = {
  selected?: Position;
  selectCell: (position: Position) => void;
  getHighlightForPosition: (position: Position) => boolean;
};

const boardStore = createStore<BoardStore>((set, get) => ({
  getHighlightForPosition: (position) => {
    const selected = get().selected;

    if (!selected || (selected.line === position.line && position.column === selected.column)) {
      return false;
    }

    return selected.column === position.column || selected.line === position.line;
  },
  selectCell: (position) => set({ selected: position }),
  selected: undefined,
}));

export const useBoardState = () => useStore(boardStore);
