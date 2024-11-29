import { useBoardState, useTimerState } from '@providers';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export const Numbers = () => {
  const { isPaused } = useTimerState();
  const { selectedCell, numbersDepleted, isNotesModeEnabled, fillCell, getCellFilled } =
    useBoardState((state) => ({
      fillCell: state.fillCell,
      getCellFilled: state.getCellFilled,
      isNotesModeEnabled: state.isNotesModeEnabled,
      numbersDepleted: state.numbersDepleted,
      selectedCell: state.selectedCell,
    }));

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
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {new Array(9).fill(0).map((_, index) => (
        <Button
          disabled={
            isPaused || numbersDepleted.find((item) => item.value === index + 1)?.count === 9
          }
          onPress={!selectedIsFixed ? () => onPress(index + 1) : undefined}
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
