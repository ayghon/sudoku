import { GameModeButtonGroup } from '@components';
import { GameMode } from '@utils';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  const { replace } = useRouter();

  // TODO redirect to board automatically if ongoing game found

  const onEasy = () => replace({ params: { mode: GameMode.Easy }, pathname: '/game' });
  const onMedium = () => replace({ params: { mode: GameMode.Medium }, pathname: '/game' });
  const onHard = () => replace({ params: { mode: GameMode.Hard }, pathname: '/game' });

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 0.95,
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}
    >
      <GameModeButtonGroup onEasy={onEasy} onMedium={onMedium} onHard={onHard} />
    </View>
  );
}
