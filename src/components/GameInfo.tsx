import { useGameState } from '@providers';
import { gameModeToText } from '@utils';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type GameInfoProps = {
  timer: string;
};

export const GameInfo: FC<GameInfoProps> = ({ timer }) => {
  const gameMode = useGameState((state) => state.gameMode);
  const gameModeText = gameModeToText[gameMode];

  return (
    <View style={[styles.row, { justifyContent: 'space-around' }]}>
      <Text variant="bodyMedium">{gameModeText}</Text>
      <Text variant="bodyMedium">{timer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
