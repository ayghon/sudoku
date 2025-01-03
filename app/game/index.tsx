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
import { GameMode, GameStatus } from '@types';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  // TODO uncomment when timer is fixed
  // const { resetTimer, startTimer } = useTimerState();
  const { back } = useRouter();

  const changeGameMode = useGameState((state) => state.changeGameMode);
  const { initialiseBoard, checkGameStatus } = useBoardState((state) => ({
    checkGameStatus: state.checkGameStatus,
    initialiseBoard: state.initialiseBoard,
  }));

  useEffect(() => {
    if (!mode) {
      return;
    }

    if (!Object.values(GameMode).includes(mode as GameMode)) {
      back();
      return;
    }

    // startTimer();

    changeGameMode(mode as GameMode);
  }, [back, changeGameMode, mode]);

  const launchNewGame = () => setIsNewGameDialogVisible(true);
  const hideDialog = () => setIsNewGameDialogVisible(false);
  const handleMode = (mode: GameMode) => {
    // resetTimer();
    changeGameMode(mode);
    initialiseBoard(mode);
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
