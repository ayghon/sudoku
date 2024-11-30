import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameMode } from '@types';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn as create } from 'zustand/traditional';

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
