import { useBoardState } from '@providers';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export const GameControls = () => {
  const {
    toggleNotesMode,
    isNotesModeEnabled,
    eraseCell,
    selectedCell,
    getCellFilledValue,
    undoLastMove,
    history,
  } = useBoardState();

  const selectedCellValue = selectedCell ? getCellFilledValue(selectedCell) : undefined;
  const isEraserDisabled =
    !selectedCell ||
    !selectedCellValue ||
    (Array.isArray(selectedCellValue) && selectedCellValue.length === 0);

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
