import { GameModeButtonGroup } from '@components';
import { useBoardState } from '@providers';
import { GameStatus } from '@types';
import { GameMode } from '@utils';
import { useRouter, Redirect } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  const { replace } = useRouter();
  const { initialiseBoard, checkGameStatus } = useBoardState((state) => ({
    checkGameStatus: state.checkGameStatus,
    initialiseBoard: state.initialiseBoard,
  }));

  const gameStatus = checkGameStatus();

  if (gameStatus === GameStatus.InProgress || gameStatus === GameStatus.Failure) {
    return <Redirect href="/game" />;
  }

  const onMode = (mode: GameMode) => {
    replace({ params: { mode }, pathname: '/game' });
    initialiseBoard(mode);
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
