import { FC } from 'react';
import { Dialog } from 'react-native-paper';

import { GameModeButtonGroup, GameModeButtonGroupProps } from './GameModeButtonGroup';

type VictoryDialogProps = GameModeButtonGroupProps & {
  isVisible: boolean;
  hideDialog: () => void;
};

export const VictoryDialog: FC<VictoryDialogProps> = ({ isVisible, hideDialog, onMode }) => {
  // TODO launch victory confetti animation + melody

  return (
    <Dialog visible={isVisible} onDismiss={hideDialog}>
      <Dialog.Title>You win !</Dialog.Title>
      <Dialog.Content>
        <GameModeButtonGroup onMode={onMode} />
      </Dialog.Content>
    </Dialog>
  );
};
