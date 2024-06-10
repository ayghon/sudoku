import { GameMode, gameModeToText } from '@utils';
import { FC } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export type GameModeButtonGroupProps = {
  onEasy: () => void;
  onMedium: () => void;
  onHard: () => void;
};

export const GameModeButtonGroup: FC<GameModeButtonGroupProps> = ({ onEasy, onMedium, onHard }) => {
  return (
    <View style={{ gap: 20 }}>
      <Text variant="bodyMedium">Choose a game mode</Text>

      <Button mode="contained" onPress={onEasy}>
        {gameModeToText[GameMode.Easy]}
      </Button>
      <Button mode="contained" onPress={onMedium}>
        {gameModeToText[GameMode.Medium]}
      </Button>
      <Button mode="contained" onPress={onHard}>
        {gameModeToText[GameMode.Hard]}
      </Button>
    </View>
  );
};
