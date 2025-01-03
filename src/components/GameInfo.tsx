import { useGameState } from '@providers';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export const GameInfo = () => {
  const gameMode = useGameState((state) => state.gameMode);
  // TODO uncomment when timer is fixed
  // const { getTime } = useTimerState();
  // const time = getTime();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Text variant="bodyMedium">{gameMode}</Text>
      <Text variant="bodyMedium"> {/*{time}*/}</Text>
    </View>
  );
};
