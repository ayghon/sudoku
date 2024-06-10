import { GameMode, gameModeToText } from '@utils';
import { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export type GameModeButtonGroupProps = {
  onMode: (mode: GameMode) => void;
};

export const GameModeButtonGroup: FC<GameModeButtonGroupProps> = ({ onMode }) => {
  const onEasy = () => onMode(GameMode.Easy);
  const onMedium = () => onMode(GameMode.Medium);
  const onHard = () => onMode(GameMode.Hard);

  return (
    <View style={{ gap: 20 }}>
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
