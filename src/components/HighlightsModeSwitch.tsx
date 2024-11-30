import { useBoardState } from '@providers';
import { View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

export const HighlightsModeSwitch = () => {
  const { toggleHighlights, isHighlightsEnabled } = useBoardState((state) => ({
    isHighlightsEnabled: state.isHighlightsEnabled,
    toggleHighlights: state.toggleHighlights,
  }));

  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <Text variant="labelSmall">Number highlights</Text>
      <Switch value={isHighlightsEnabled} onValueChange={toggleHighlights} />
    </View>
  );
};
