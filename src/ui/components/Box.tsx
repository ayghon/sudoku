import { FC } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import { Cell } from './Cell';

type BoxProps = {
  style?: StyleProp<ViewStyle>;
};

export const Box: FC<BoxProps> = ({ style }) => {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.row}>
        <Cell />
        <Cell />
        <Cell />
      </View>
      <View style={styles.row}>
        <Cell style={styles.box_separator} />
        <Cell />
        <Cell />
      </View>
      <View style={styles.row}>
        <Cell style={styles.box_separator} />
        <Cell />
        <Cell />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box_separator: {
    borderLeftWidth: 2,
  },
  row: {
    flexDirection: 'row',
  },
});
