import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type NoteTextProps = { value?: number };

export const NoteText: FC<NoteTextProps> = ({ value }) => {
  return (
    <Text variant="labelSmall" style={[styles.note]}>
      {value ?? '  '}
    </Text>
  );
};

const styles = StyleSheet.create({
  note: {
    fontWeight: '300',
    lineHeight: 0,
  },
});
