import { TimerProvider } from '@providers';
import { Slot } from 'expo-router';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  return (
    <TimerProvider>
      <Slot />
    </TimerProvider>
  );
}
