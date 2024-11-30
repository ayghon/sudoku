import { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { HighlightsModeSwitch } from './HighlightsModeSwitch';

type GameHeaderProps = {
  launchNewGame: () => void;
};

export const GameHeader: FC<GameHeaderProps> = ({ launchNewGame }) => {
  // TODO uncomment when timer is fixed
  // const theme = useTheme();
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
      <HighlightsModeSwitch />
      {/*<IconButton*/}
      {/*  onPress={pauseTimer}*/}
      {/*  icon={isPaused ? 'play' : 'pause'}*/}
      {/*  mode="outlined"*/}
      {/*  iconColor={theme.colors.primary}*/}
      {/*/>*/}
    </View>
  );
};
