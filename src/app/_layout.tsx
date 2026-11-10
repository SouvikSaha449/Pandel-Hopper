import { Stack } from 'expo-router';
import '@/i18n'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="splash" options={{ animation: 'none' }} />
      <Stack.Screen
        name="welcome"
        options={{
          animation: 'fade',
          animationDuration: 400, 
        }}
      />
      <Stack.Screen name='(tabs)' options={{animation: 'fade'}} />
    </Stack>
  );
}