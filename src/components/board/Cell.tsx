import { useBoardState } from '@providers';
import { FC } from 'react';
import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

import { Notes } from './Notes';

type CellProps = {
  style?: StyleProp<ViewStyle>;
  position: { line: number; column: number };
};

export const Cell: FC<CellProps> = ({ style, position }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const cellSize = (width - 40) / 9 - 0.1;

  const highlightedNumber = useBoardState((state) => state.highlightedNumber);
  const selectedCell = useBoardState((state) => state.selectedCell);
  const checkCellValidity = useBoardState((state) => state.checkCellValidity);
  const getHighlightForPosition = useBoardState((state) => state.getHighlightForPosition);
  const selectCell = useBoardState((state) => state.selectCell);
  const getCellFilled = useBoardState((state) => state.getCellFilled);

  const handleSelect = () => selectCell(position);

  const filledCell = getCellFilled(position);

  const isCellValid = checkCellValidity(position);
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
            (!isCellValid && theme.colors.errorContainer) ||
            (isNumberHighlighted && theme.colors.tertiaryContainer) ||
            (isCellHighlighted && theme.colors.surfaceVariant) ||
            (isSelected && theme.colors.primaryContainer) ||
            undefined,
        },
        {
          height: cellSize,
          width: cellSize,
        },
        styles.cell,
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {filledCell?.notes?.length ? (
          <Notes position={position} />
        ) : (
          <Text
            variant="bodyLarge"
            style={{
              color:
                (!isCellValid && theme.colors.error) ||
                (!isFixedNumber && theme.colors.tertiary) ||
                undefined,
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
    alignItems: 'center',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
});
