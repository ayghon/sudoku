import { useBoardState } from '@providers';
import { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

type CellProps = {
  style?: StyleProp<ViewStyle>;
  value?: number;
  position: { line: number; column: number };
};

export const Cell: FC<CellProps> = ({ style, value, position }) => {
  const theme = useTheme();
  const { getHighlightForPosition, selectCell, selected } = useBoardState();
  const handleSelect = () => selectCell(position);

  const isHighlighted = getHighlightForPosition(position);
  const isSelected = selected?.column === position.column && selected.line === position.line;

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
      ]}
    >
      <Text style={{ alignSelf: 'center', flex: 1 }}>{value}</Text>
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
  highlight: {
    backgroundColor: 'lightblue',
  },
});
