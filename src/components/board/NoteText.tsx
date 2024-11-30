import { FC } from 'react';
import { Text } from 'react-native-paper';

type NoteTextProps = { value?: number };

export const NoteText: FC<NoteTextProps> = ({ value }) => {
  return (
    <Text
      variant="labelSmall"
      style={{
        fontWeight: '300',
        lineHeight: 12,
      }}
    >
      {value ?? '  '}
    </Text>
  );
};
