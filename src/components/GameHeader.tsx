import { useTimerState } from '@providers';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, useTheme } from 'react-native-paper';

type GameHeaderProps = {
  launchNewGame: () => void;
};

export const GameHeader: FC<GameHeaderProps> = ({ launchNewGame }) => {
  const theme = useTheme();
  const { pauseTimer, isPaused } = useTimerState();

  return (
    <View style={styles.row}>
      <Button onPress={launchNewGame} mode="contained-tonal">
        New
      </Button>
      <IconButton
        onPress={pauseTimer}
        icon={isPaused ? 'play' : 'pause'}
        mode="outlined"
        iconColor={theme.colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
