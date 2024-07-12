import { useBoardState } from '@providers';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export const GameControls = () => {
  const selectedCell = useBoardState((state) => state.selectedCell);
  const isNotesModeEnabled = useBoardState((state) => state.isNotesModeEnabled);
  const history = useBoardState((state) => state.history);
  const toggleNotesMode = useBoardState((state) => state.toggleNotesMode);
  const eraseCell = useBoardState((state) => state.eraseCell);
  const getCellFilled = useBoardState((state) => state.getCellFilled);
  const undoLastMove = useBoardState((state) => state.undoLastMove);

  const cell = selectedCell ? getCellFilled(selectedCell) : undefined;
  const isEraserDisabled =
    !selectedCell || (!cell?.value && cell?.notes?.length === 0) || cell?.fixed;
  const isNotesDisabled = !selectedCell || !!cell?.fixed;

  return (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      <Button icon="undo" disabled={history.length === 0} onPress={undoLastMove} mode="outlined">
        Undo
      </Button>
      <Button
        icon="eraser"
        style={{ shadowOpacity: 0 }}
        disabled={isEraserDisabled}
        onPress={() => eraseCell()}
        mode="outlined"
      >
        Erase
      </Button>
      <Button
        icon="note"
        disabled={isNotesDisabled}
        onPress={toggleNotesMode}
        mode={isNotesModeEnabled ? 'contained' : 'outlined'}
      >
        Notes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
