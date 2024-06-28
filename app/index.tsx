import { GameModeButtonGroup } from '@components';
import { useBoardState } from '@providers';
import { GameMode } from '@utils';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  const { replace } = useRouter();
  const { initialiseBoard } = useBoardState();

  // TODO redirect to board automatically if ongoing game found

  const onMode = (mode: GameMode) => {
    replace({ params: { mode }, pathname: '/game' });
    initialiseBoard();
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 0.95,
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}
    >
      <GameModeButtonGroup onMode={onMode} />
    </View>
  );
}
