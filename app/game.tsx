import { GameControls, GameHeader, GameInfo, NewGameDialog, Numbers } from '@components';
import { Board } from '@ui';
import { useTimer, GameMode } from '@utils';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type GameSearchParams = {
  mode: string;
};

export default function Game() {
  const { mode = GameMode.Easy } = useLocalSearchParams<GameSearchParams>();
  const { top, bottom } = useSafeAreaInsets();
  const [isNotesModeEnabled, setIsNotesMode] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>(mode as GameMode);
  const [isNewGameDialogVisible, setIsNewGameDialogVisible] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number>();
  const { resetTimer, timer } = useTimer();

  // TODO move to global store, use logic directly in child components

  // GAME FUNCTIONS
  const launchNewGame = () => setIsNewGameDialogVisible(true);
  const hideDialog = () => setIsNewGameDialogVisible(false);
  const handleEasyMode = () => {
    resetTimer();
    setGameMode(GameMode.Easy);
    hideDialog();
  };
  const handleHardMode = () => {
    resetTimer();
    setGameMode(GameMode.Hard);
    hideDialog();
  };
  const handleMediumMode = () => {
    resetTimer();
    setGameMode(GameMode.Medium);
    hideDialog();
  };

  // CONTROLS FUNCTIONS
  const undoLastMove = () => {};
  const eraseCell = () => {};
  const toggleNotesMode = () => {
    setIsNotesMode((s) => !s);
  };

  // BOARD FUNCTIONS
  const selectNumber = (selected: number) => {
    setSelectedNumber(selected);
  };

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

        <GameInfo mode={gameMode} timer={timer} />

        <Board />

        <GameControls
          eraseCell={eraseCell}
          isNotesModeEnabled={isNotesModeEnabled}
          toggleNotesMode={toggleNotesMode}
          undoLastMove={undoLastMove}
        />

        <Numbers onNumberSelect={selectNumber} activeNumber={selectedNumber} />
      </View>
      {isNewGameDialogVisible && (
        <NewGameDialog
          hideDialog={hideDialog}
          isVisible={isNewGameDialogVisible}
          onEasy={handleEasyMode}
          onHard={handleHardMode}
          onMedium={handleMediumMode}
        />
      )}
    </>
  );
}
