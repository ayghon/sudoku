import { useGameState } from '@providers';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export const Numbers = () => {
  const { changeSelectedNumber, selectedNumber } = useGameState();

  return (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      {new Array(9).fill(0).map((_, index) => (
        <Button
          onPress={() => changeSelectedNumber(index + 1)}
          labelStyle={{ fontSize: 20 }}
          compact
          key={`button-${index}`}
          mode={selectedNumber === index + 1 ? 'contained-tonal' : 'elevated'}
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
  },
});
