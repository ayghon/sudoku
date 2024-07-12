import { GameMode } from '@utils';
import { create } from 'zustand';

type GameStore = {
  gameMode: GameMode;
  changeGameMode: (mode: GameMode) => void;
};

export const useGameState = create<GameStore>((set) => ({
  changeGameMode: (mode) => {
    if (!Object.values(GameMode).includes(mode)) {
      throw new Error(`Invalid game mode: ${mode}`);
    }

    return set({ gameMode: mode });
  },
  gameMode: GameMode.Easy,
}));
