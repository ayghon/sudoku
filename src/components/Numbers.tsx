import { useBoardState } from '@providers';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export const Numbers = () => {
  const { fillCell, selectedCell, numbersDepleted, getCellFilled, isNotesModeEnabled } =
    useBoardState();
  const selectedIsFixed = selectedCell && getCellFilled(selectedCell)?.fixed;

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
          disabled={
            selectedIsFixed || numbersDepleted.find((item) => item.value === index + 1)?.count === 9
          }
          onPress={() => onPress(index + 1)}
          labelStyle={{ fontSize: 20 }}
          compact
          key={`button-${index + 1}`}
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
