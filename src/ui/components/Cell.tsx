import { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type CellProps = {
  style?: StyleProp<ViewStyle>;
};

export const Cell: FC<CellProps> = ({ style }) => {
  return <View style={[styles.cell, style]} />;
};

const styles = StyleSheet.create({
  cell: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    height: 37.1,
    width: 37.1,
  },
});
