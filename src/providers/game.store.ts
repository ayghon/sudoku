import { GameMode } from '@utils';
import { createStore, useStore } from 'zustand';

type GameStore = {
  gameMode: GameMode;
  changeGameMode: (mode: GameMode) => void;
};

const gameStore = createStore<GameStore>((set, get) => ({
  changeGameMode: (mode) => {
    if (!Object.values(GameMode).includes(mode)) {
      throw new Error(`Invalid game mode: ${mode}`);
    }

    return set({ gameMode: mode });
  },
  gameMode: GameMode.Easy,
}));

export const useGameState = () => useStore(gameStore);
