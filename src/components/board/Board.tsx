import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { Line } from './Line';

const countOfLinesWithBoxes: number[] = new Array(3).fill(undefined);

export const Board = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width: width - 40 }}>
      {countOfLinesWithBoxes.map((_, index) => {
        const lineIndex = index + index * 2;

        return (
          <View key={`range_${lineIndex}:${index + 2}`}>
            <Line line={lineIndex} style={styles.box_right_border} />
            <Line line={lineIndex + 1} style={styles.box_right_border} />
            <Line
              line={lineIndex + 2}
              style={[
                styles.box_right_border,
                lineIndex === 6 ? styles.line_bottom_border : styles.box_separator,
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  box_right_border: {
    borderRightWidth: 1,
  },
  box_separator: {
    borderBottomWidth: 2,
  },
  line_bottom_border: {
    borderBottomWidth: 1,
  },
});
