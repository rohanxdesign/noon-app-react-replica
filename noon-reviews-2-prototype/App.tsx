import { useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './src/store';
import DeviceFrame from './src/components/DeviceFrame';
import RootNavigator from './src/navigation/RootNavigator';
import { mountRetune } from './src/retune-mount';
import { useNoontreeFonts } from './src/fonts';

export default function App() {
  const [fontsLoaded] = useNoontreeFonts();

  useEffect(() => {
    mountRetune();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#0b0d12' }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <DeviceFrame>
          <RootNavigator />
          <StatusBar style="dark" />
        </DeviceFrame>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
