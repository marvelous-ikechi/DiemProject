import './gesture-handler';
import 'src/services/firebase';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {StatusBar, View, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import RootNavigator from 'src/navigation/RootNavigator';
import usePushNotifications from 'src/hooks/usePushNotifications';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient();
  const {initializeFirebase} = usePushNotifications();

  useEffect(() => {
    initializeFirebase();
  }, [initializeFirebase]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <View style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <RootNavigator />
          </View>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
