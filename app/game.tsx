import {
  Board,
  GameControls,
  GameHeader,
  GameInfo,
  NewGameDialog,
  Numbers,
  VictoryDialog,
} from '@components';
import { useBoardState, useGameState } from '@providers';
import { GameStatus } from '@types';
import { GameMode, useTimer } from '@utils';
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
  const { resetTimer, timer } = useTimer();
  const { changeGameMode } = useGameState();
  const { initialiseBoard, checkGameStatus } = useBoardState();

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

        <GameInfo timer={timer} />

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
