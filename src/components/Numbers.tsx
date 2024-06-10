import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type NumbersProps = {
  onNumberSelect: (selected: number) => void;
  activeNumber?: number;
};

export const Numbers: FC<NumbersProps> = ({ onNumberSelect, activeNumber }) => {
  return (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      {new Array(9).fill(0).map((_, index) => (
        <Button
          onPress={() => onNumberSelect(index + 1)}
          labelStyle={{ fontSize: 20 }}
          compact
          key={`button-${index}`}
          mode={activeNumber === index + 1 ? 'contained-tonal' : 'elevated'}
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
