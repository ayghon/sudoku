import { useGameState, useTimerState } from '@providers';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export const GameInfo = () => {
  const gameMode = useGameState((state) => state.gameMode);

  const { getTime } = useTimerState();
  const time = getTime();

  return (
    <View style={[styles.row, { justifyContent: 'space-around' }]}>
      <Text variant="bodyMedium">{gameMode}</Text>
      <Text variant="bodyMedium">{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
