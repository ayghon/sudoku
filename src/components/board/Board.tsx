import { StyleSheet, View } from 'react-native';

import { Line } from './Line';

// Board and boardStart index
// [0] [1] [2] lines 0 -> 2
// [3] [4] [5] lines 3 -> 5
// [6] [7] [8] lines 6 -> 8
// const boardStartMock: (number | null)[][] = [
//   [null, null, null, 9, 1, null, 8, null, null], //                 line 0
//   [2, null, null, null, null, 4, null, 3, 9], //                    line 1
//   [null, 4, 5, null, null, null, null, 7, null], //                 line 2
//   [null, null, 4, 2, null, null, 5, 6, null], //                    line 3
//   [1, null, 3, null, null, 5, null, null, null], //                 line 4
//   [null, null, null, null, null, null, null, null, null], //        line 5
//   [6, null, null, null, null, null, null, null, 9], //              line 6
//   [null, null, null, null, 8, null, 4, null, null], //              line 7
//   [null, 2, 9, 1, null, null, 6, null, null], //                    line 8
// ];

const boxesByLine: number[] = new Array(3).fill(undefined);

export const Board = () => {
  return (
    <View>
      {boxesByLine.map((_, index) => {
        const lineIndex = index + index * 2;

        return (
          <View key={`range_${lineIndex}:${index + 2}`}>
            <Line line={lineIndex} style={[styles.box_right_border]} />
            <Line line={lineIndex + 1} style={[styles.box_right_border]} />
            <Line
              line={lineIndex + 2}
              style={[
                styles.box_right_border,
                lineIndex === 2 ? styles.line_bottom_border : styles.box_separator,
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
