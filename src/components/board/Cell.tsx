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
  const { highlightedNumber, getHighlightForPosition, selectCell, selectedCell, getCellFilled } =
    useBoardState();

  const handleSelect = () => selectCell(position);

  const filledCell = getCellFilled(position);

  const isCellHighlighted = getHighlightForPosition(position);
  const isSelected =
    selectedCell?.column === position.column && selectedCell.line === position.line;
  const isNumberHighlighted =
    typeof filledCell?.value !== 'undefined' && highlightedNumber === filledCell.value;
  const isFixedNumber = !!filledCell?.fixed;

  return (
    <TouchableRipple
      onPress={handleSelect}
      style={[
        {
          backgroundColor:
            (isNumberHighlighted && theme.colors.tertiaryContainer) ||
            (isCellHighlighted && theme.colors.surfaceVariant) ||
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
        {filledCell?.notes?.length ? (
          <Notes position={position} />
        ) : (
          <Text
            variant="bodyLarge"
            style={{
              color: !isFixedNumber ? theme.colors.tertiary : undefined,
              flex: 1,
              textAlign: 'center',
            }}
          >
            {filledCell?.value}
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
