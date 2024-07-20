import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameMode } from '@utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type GameStore = {
  gameMode: GameMode;
  changeGameMode: (mode: GameMode) => void;
};

export const useGameState = create<GameStore>()(
  persist(
    (set) => ({
      changeGameMode: (mode) => {
        if (!Object.values(GameMode).includes(mode)) {
          throw new Error(`Invalid game mode: ${mode}`);
        }

        return set({ gameMode: mode });
      },
      gameMode: GameMode.Easy,
    }),
    {
      name: '@game-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
