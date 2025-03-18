import './gesture-handler';
import 'src/services/firebase';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar, View, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import React from 'react';
import RootNavigator from 'src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import toastConfig from 'src/utils/toastConfig';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient();

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
            <Toast config={toastConfig} />
          </View>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
