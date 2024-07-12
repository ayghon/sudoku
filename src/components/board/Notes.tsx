import { useBoardState } from '@providers';
import { Position } from '@types';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { NoteText } from './NoteText';

const notesFirstLine = [1, 2, 3];
const notesMiddleLine = [4, 5, 6];
const notesLastLine = [7, 8, 9];
const notesList = [notesFirstLine, notesMiddleLine, notesLastLine];

type NotesProps = { position: Position };

export const Notes: FC<NotesProps> = ({ position }) => {
  const getCellFilled = useBoardState((state) => state.getCellFilled);
  const filledCell = getCellFilled(position);

  if (!filledCell?.notes) {
    return null;
  }

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      {notesList.map((notes, index) => (
        <View key={`notes-list_${index}`} style={styles.note_line}>
          {notes.map((note) => (
            <NoteText key={note} value={filledCell.notes?.includes(note) ? note : undefined} />
          ))}
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
