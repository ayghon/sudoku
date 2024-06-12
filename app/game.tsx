import { Board, GameControls, GameHeader, GameInfo, NewGameDialog, Numbers } from '@components';
import { useGameState } from '@providers';
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
    hideDialog();
  };

  // CONTROLS FUNCTIONS
  const undoLastMove = () => {};
  const eraseCell = () => {};

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

        <GameControls eraseCell={eraseCell} undoLastMove={undoLastMove} />

        <Numbers />
      </View>

      {isNewGameDialogVisible && (
        <NewGameDialog
          hideDialog={hideDialog}
          isVisible={isNewGameDialogVisible}
          onMode={handleMode}
        />
      )}
    </>
  );
}
