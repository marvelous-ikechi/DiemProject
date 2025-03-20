import * as mocks from '../mocks/mockSetup'; // Import the complete mock file

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {render, screen, waitFor} from '@testing-library/react-native';

import HomeScreen from '../src/screens/tab/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import React from 'react';

// Create a fresh QueryClient for each test
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

// Apply all mocks
jest.mock('@tanstack/react-query', () => mocks.reactQueryMocks);
jest.mock('../src/api/apiClient', () => mocks.apiClientMocks);
jest.mock(
  '../src/hooks/usePushNotifications',
  () => mocks.usePushNotificationsMock,
);
jest.mock('../src/store/store', () => mocks.storeMock);
jest.mock('@react-navigation/native', () => mocks.reactNavigationMocks);
jest.mock(
  '../src/components/ui/BottomSheet/BottomSheet',
  () => mocks.bottomSheetMock,
);
jest.mock('@notifee/react-native', () => mocks.notifeeMock);
jest.mock('react-native-push-notification', () => mocks.pushNotificationMock);
jest.mock(
  '@react-native-community/push-notification-ios',
  () => mocks.pushNotificationIOSMock,
);
jest.mock('react-native-toast-message', () => mocks.toastMessageMock);
jest.mock('@react-native-firebase/messaging', () => mocks.messagingMock);
jest.mock(
  '@react-native-async-storage/async-storage',
  () => mocks.asyncStorageMock,
);

test('fetches and renders data', async () => {
  const queryClient = createQueryClient();

  try {
    render(
      <Provider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <HomeScreen />
          </NavigationContainer>
        </QueryClientProvider>
      </Provider>,
    );
  } catch (error) {
    console.error('Render failed with:', error);
    throw error;
  }

  await waitFor(
    () => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    },
    {timeout: 2000},
  );
});
