import { useBoardState } from '@providers';
import { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

import { Notes } from './Notes';

type CellProps = {
  style?: StyleProp<ViewStyle>;
  position: { line: number; column: number };
};

export const Cell: FC<CellProps> = ({ style, position }) => {
  const theme = useTheme();
  const { getHighlightForPosition, selectCell, selectedCell, getCellFilledValue } = useBoardState();

  const handleSelect = () => selectCell(position);

  const filledValue = getCellFilledValue(position);
  const hasNotes = Array.isArray(filledValue);

  const isHighlighted = getHighlightForPosition(position);
  const isSelected =
    selectedCell?.column === position.column && selectedCell.line === position.line;

  return (
    <TouchableRipple
      onPress={handleSelect}
      style={[
        {
          backgroundColor:
            (isHighlighted && theme.colors.surfaceVariant) ||
            (isSelected && theme.colors.primaryContainer) ||
            undefined,
        },
        styles.cell,
        style,
        {
          alignItems: 'center',
          flexDirection: 'row',
        },
      ]}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {hasNotes ? (
          <Notes position={position} />
        ) : (
          <Text
            variant="bodyLarge"
            style={{
              flex: 1,
              textAlign: 'center',
            }}
          >
            {filledValue}
          </Text>
        )}
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    height: 37.1,
    width: 37.1,
  },
});
