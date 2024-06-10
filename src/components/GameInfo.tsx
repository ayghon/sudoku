import { GameMode, gameModeToText } from '@utils';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type GameInfoProps = {
  mode: GameMode;
  timer: string;
};

export const GameInfo: FC<GameInfoProps> = ({ mode, timer }) => {
  return (
    <View style={[styles.row, { justifyContent: 'space-around' }]}>
      <Text>{gameModeToText[mode]}</Text>
      <Text>{timer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
