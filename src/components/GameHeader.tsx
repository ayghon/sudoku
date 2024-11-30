import { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

type GameHeaderProps = {
  launchNewGame: () => void;
};

export const GameHeader: FC<GameHeaderProps> = ({ launchNewGame }) => {
  // const theme = useTheme();
  // TODO uncomment when timer is fixed
  // const { pauseTimer, isPaused } = useTimerState();

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Button onPress={launchNewGame} mode="contained-tonal">
        New
      </Button>
      {/*<IconButton*/}
      {/*  onPress={pauseTimer}*/}
      {/*  icon={isPaused ? 'play' : 'pause'}*/}
      {/*  mode="outlined"*/}
      {/*  iconColor={theme.colors.primary}*/}
      {/*/>*/}
    </View>
  );
};
