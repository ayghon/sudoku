import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type GameHeaderProps = {
  launchNewGame: () => void;
};

export const GameHeader: FC<GameHeaderProps> = ({ launchNewGame }) => {
  return (
    <View style={styles.row}>
      <Button onPress={launchNewGame} mode="contained-tonal" labelStyle={{ fontWeight: '900' }}>
        New game
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
