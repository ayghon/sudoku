import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type TimerStore = {
  seconds: number;
  isPaused: boolean;
  resetTimer: () => void;
  pauseTimer: () => void;
  getTime: () => string;
  stopTimer: () => void;
  interval: NodeJS.Timeout;
};

const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      getTime: () => format(new Date().setHours(0, 0, get().seconds, 0), 'HH:mm:ss'),
      interval: setInterval(() => {
        if (get().isPaused) {
          return;
        }

        set({ seconds: get().seconds + 1 });
      }, 1000),
      isPaused: false,
      pauseTimer: () => set({ isPaused: !get().isPaused }),
      resetTimer: () => set({ seconds: 0 }),
      seconds: 0,
      stopTimer: () => {
        clearInterval(get().interval);
        set({ seconds: 0 });
      },
    }),
    {
      name: '@timer-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

const TimerContext = createContext<TimerStore | undefined>(undefined);

export const TimerProvider: FC<PropsWithChildren> = ({ children }) => {
  const timerStore = useTimerStore();

  return <TimerContext.Provider value={timerStore}>{children}</TimerContext.Provider>;
};

export const useTimerState = () => {
  const timerState = useContext(TimerContext);

  if (!timerState) {
    throw new Error('Missing TimerProvider');
  }

  return timerState;
};
