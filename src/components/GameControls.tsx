import { useBoardState } from '@providers';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type GameControlsProps = {
  undoLastMove: () => void;
  eraseCell: () => void;
};

export const GameControls: FC<GameControlsProps> = ({ undoLastMove, eraseCell }) => {
  const { toggleNotesMode, isNotesModeEnabled } = useBoardState();

  return (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      <Button icon="undo" onPress={undoLastMove} mode="elevated">
        Undo
      </Button>
      <Button icon="eraser" onPress={eraseCell} mode="elevated">
        Erase
      </Button>
      <Button
        icon="note"
        onPress={toggleNotesMode}
        mode={isNotesModeEnabled ? 'contained-tonal' : 'elevated'}
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
