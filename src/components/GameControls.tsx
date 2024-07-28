import { useBoardState, useTimerState } from '@providers';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export const GameControls = () => {
  const { isPaused } = useTimerState();
  const {
    isNotesModeEnabled,
    selectedCell,
    eraseCell,
    getCellFilled,
    history,
    toggleNotesMode,
    undoLastMove,
  } = useBoardState((state) => ({
    eraseCell: state.eraseCell,
    getCellFilled: state.getCellFilled,
    history: state.history,
    isNotesModeEnabled: state.isNotesModeEnabled,
    selectedCell: state.selectedCell,
    toggleNotesMode: state.toggleNotesMode,
    undoLastMove: state.undoLastMove,
  }));

  const cell = selectedCell ? getCellFilled(selectedCell) : undefined;
  const isEraserDisabled =
    !selectedCell || (!cell?.value && cell?.notes?.length === 0) || cell?.fixed;
  const isNotesDisabled = !selectedCell || !!cell?.fixed;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button
        icon="undo"
        disabled={isPaused || history.length === 0}
        onPress={undoLastMove}
        mode="outlined"
      >
        Undo
      </Button>
      <Button
        icon="eraser"
        style={{ shadowOpacity: 0 }}
        disabled={isPaused || isEraserDisabled}
        onPress={() => eraseCell()}
        mode="outlined"
      >
        Erase
      </Button>
      <Button
        icon="note"
        disabled={isPaused || isNotesDisabled}
        onPress={toggleNotesMode}
        mode={isNotesModeEnabled ? 'contained' : 'outlined'}
      >
        Notes
      </Button>
    </View>
  );
};
