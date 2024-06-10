import { FC } from 'react';
import { Dialog } from 'react-native-paper';

import { GameModeButtonGroup, GameModeButtonGroupProps } from './GameModeButtonGroup';

type NewGameDialogProps = GameModeButtonGroupProps & {
  isVisible: boolean;
  hideDialog: () => void;
};

export const NewGameDialog: FC<NewGameDialogProps> = ({ isVisible, hideDialog, onMode }) => {
  return (
    <Dialog visible={isVisible} onDismiss={hideDialog}>
      <Dialog.Title>New game</Dialog.Title>
      <Dialog.Content>
        <GameModeButtonGroup onMode={onMode} />
      </Dialog.Content>
    </Dialog>
  );
};
