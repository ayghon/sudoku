import { Position, useBoardState } from '@providers';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { NoteText } from './NoteText';

const notesFirstLine = [1, 2, 3];
const notesMiddleLine = [4, 5, 6];
const notesLastLine = [7, 8, 9];
const notesList = [notesFirstLine, notesMiddleLine, notesLastLine];

type NotesProps = { position: Position };

export const Notes: FC<NotesProps> = ({ position }) => {
  const { getCellFilledValue } = useBoardState();
  const filledValue = getCellFilledValue(position);
  const filledNotes = Array.isArray(filledValue) ? filledValue : undefined;

  if (!filledNotes) {
    return null;
  }

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      {notesList.map((notes, index) => (
        <View key={`notes-list_${index}`} style={styles.note_line}>
          {notes.map((note) => {
            return <NoteText key={note} value={filledNotes.includes(note) ? note : undefined} />;
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  note_line: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
});
