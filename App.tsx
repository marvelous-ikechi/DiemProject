import './gesture-handler';
import 'src/services/firebase';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar, View, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from 'src/navigation/RootNavigator';

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
        <View style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <RootNavigator />
        </View>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
