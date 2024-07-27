import { GameMode } from '@utils';
import { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export type GameModeButtonGroupProps = {
  onMode: (mode: GameMode) => void;
};

export const GameModeButtonGroup: FC<GameModeButtonGroupProps> = ({ onMode }) => {
  return (
    <View style={{ gap: 20 }}>
      {Object.values(GameMode).map((button) => (
        <Button key={button} mode="contained" onPress={() => onMode(button)}>
          {button}
        </Button>
      ))}
    </View>
  );
};
