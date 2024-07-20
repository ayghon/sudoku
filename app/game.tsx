import {
  Board,
  GameControls,
  GameHeader,
  GameInfo,
  NewGameDialog,
  Numbers,
  VictoryDialog,
} from '@components';
import { useBoardState, useGameState, useTimerState } from '@providers';
import { GameStatus } from '@types';
import { GameMode } from '@utils';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type GameSearchParams = {
  mode: string;
};

export default function Game() {
  const [isNewGameDialogVisible, setIsNewGameDialogVisible] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const { mode } = useLocalSearchParams<GameSearchParams>();
  const { resetTimer } = useTimerState();

  const changeGameMode = useGameState((state) => state.changeGameMode);
  const initialiseBoard = useBoardState((state) => state.initialiseBoard);
  const checkGameStatus = useBoardState((state) => state.checkGameStatus);

  useEffect(() => {
    if (!mode) {
      return;
    }
    const parsedMode = parseInt(mode, 10);

    changeGameMode(parsedMode);
  }, [changeGameMode, mode]);

  // GAME FUNCTIONS
  const launchNewGame = () => setIsNewGameDialogVisible(true);
  const hideDialog = () => setIsNewGameDialogVisible(false);
  const handleMode = (mode: GameMode) => {
    resetTimer();
    changeGameMode(mode);
    initialiseBoard();
    hideDialog();
  };

  const isVictorious = checkGameStatus() === GameStatus.Victorious;

  return (
    <>
      <View
        style={{
          gap: 32,
          marginTop: top,
          paddingBottom: bottom + 20,
          paddingHorizontal: 20,
          paddingTop: 12,
        }}
      >
        <GameHeader launchNewGame={launchNewGame} />

        <GameInfo />

        <Board />

        <GameControls />

        <Numbers />
      </View>

      {isNewGameDialogVisible && (
        <NewGameDialog
          hideDialog={hideDialog}
          isVisible={isNewGameDialogVisible}
          onMode={handleMode}
        />
      )}
      {isVictorious && (
        <VictoryDialog hideDialog={hideDialog} isVisible={isVictorious} onMode={handleMode} />
      )}
    </>
  );
}
