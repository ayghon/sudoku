import { FC } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import { Cell } from './Cell';

type BoxProps = {
  style?: StyleProp<ViewStyle>;
  line: number;
};

const cells: number[] = new Array(9).fill(undefined);

export const Line: FC<BoxProps> = ({ style, line }) => {
  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
        },
      ]}
    >
      {cells.map((_, index) => (
        <Cell
          key={`line:${line}_cell:${index}`}
          style={
            index !== 0 && index % 3 === 0
              ? {
                  // box separator
                  borderLeftWidth: 2,
                }
              : undefined
          }
          position={{ column: index, line }}
        />
      ))}
    </View>
  );
};
