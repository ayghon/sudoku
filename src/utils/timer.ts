import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

// TODO add pause function

export const useTimer = () => {
  const [timer, setTimer] = useState<string>('00:00');
  const [startOfGame, setStartOfGame] = useState(new Date().getTime());

  const interval = useMemo(
    () =>
      setInterval(() => {
        const now = new Date().getTime();
        const distanceInMilliseconds = now - startOfGame;
        const distanceDate = new Date().setTime(distanceInMilliseconds);
        const date = format(distanceDate, 'mm:ss');

        setTimer(date);
      }, 1000),
    [startOfGame],
  );

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, [interval]);

  const resetTimer = () => {
    clearInterval(interval);
    setStartOfGame(new Date().getTime());
    setTimer('00:00');
  };

  return { resetTimer, timer };
};
