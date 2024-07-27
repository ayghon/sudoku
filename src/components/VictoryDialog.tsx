import { useBoardState, useTimerState } from '@providers';
import { GameStatus } from '@types';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import { FC, useEffect, useState } from 'react';
import { Dialog } from 'react-native-paper';

import { GameModeButtonGroup, GameModeButtonGroupProps } from './GameModeButtonGroup';

type VictoryDialogProps = GameModeButtonGroupProps & {
  isVisible: boolean;
  hideDialog: () => void;
};

export const VictoryDialog: FC<VictoryDialogProps> = ({ isVisible, hideDialog, onMode }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();
  const checkGameStatus = useBoardState((state) => state.checkGameStatus);
  const gameStatus = checkGameStatus();
  const { pauseTimer, resetTimer } = useTimerState();

  useEffect(() => {
    if (gameStatus === GameStatus.Victorious) {
      pauseTimer();
    }

    return () => {
      resetTimer();
      pauseTimer();
    };
  }, [gameStatus, pauseTimer, resetTimer]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/victory.wav'));
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <>
      {!showDialog && isVisible && (
        <LottieView
          source={require('../../assets/animations/victory.json')}
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
            position: 'absolute',
            width: '100%',
          }}
          onAnimationLoaded={playSound}
          onAnimationFinish={() => setShowDialog(true)}
          autoPlay
          loop={false}
        />
      )}
      <Dialog
        dismissable={false}
        dismissableBackButton={false}
        visible={showDialog}
        onDismiss={hideDialog}
      >
        <Dialog.Title>You win !</Dialog.Title>
        <Dialog.Content>
          <GameModeButtonGroup onMode={onMode} />
        </Dialog.Content>
      </Dialog>
    </>
  );
};
