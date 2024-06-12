import { useBoardState } from '@providers';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export const Numbers = () => {
  const { fillCell, selectedCell, isNotesModeEnabled } = useBoardState();

  const onPress = (selectedNumber: number) => {
    if (!selectedCell) {
      return;
    }

    if (isNotesModeEnabled) {
      fillCell(undefined, selectedNumber);
    } else {
      fillCell(selectedNumber);
    }
  };

  return (
    <View style={styles.row}>
      {new Array(9).fill(0).map((_, index) => (
        <Button
          onPress={() => onPress(index + 1)}
          labelStyle={{ fontSize: 20 }}
          compact
          key={`button-${index}`}
          mode="elevated"
        >
          {index + 1}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
