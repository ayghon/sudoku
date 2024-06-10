import { GameMode } from '@utils';
import { createStore, useStore } from 'zustand';

type GameStore = {
  gameMode: GameMode;
  isNotesModeEnabled: boolean;
  changeGameMode: (mode: GameMode) => void;
  toggleNotesMode: () => void;
  selectedNumber?: number;
  changeSelectedNumber: (value: number) => void;
};

const gameStore = createStore<GameStore>((set, get) => ({
  changeGameMode: (mode) => {
    if (!Object.values(GameMode).includes(mode)) {
      throw new Error(`Invalid game mode: ${mode}`);
    }

    return set({ gameMode: mode });
  },
  changeSelectedNumber: (value) => {
    if (value < 1 || value > 9) {
      throw new Error(`Invalid selected number: ${value}`);
    }

    return set({
      selectedNumber: value,
    });
  },
  gameMode: GameMode.Easy,
  isNotesModeEnabled: false,
  selectedNumber: undefined,
  toggleNotesMode: () => set({ isNotesModeEnabled: !get().isNotesModeEnabled }),
}));

export const useGameState = () => useStore(gameStore);
