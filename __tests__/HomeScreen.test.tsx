import * as mocks from '../mocks/mockSetup'; // Import the complete mock file

import {CirclePlus, Eye} from 'lucide-react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import HomeScreen from '../src/screens/tab/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import React from 'react';
import SubmitButton from 'src/components/ui/Button/SubmitButton';

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

// @ts-ignore
jest.mock('@tanstack/react-query', () => mocks.reactQueryMocks);
// @ts-ignore
jest.mock('../src/api/apiClient', () => mocks.apiClientMocks);
jest.mock(
  '../src/hooks/usePushNotifications',
  // @ts-ignore
  () => mocks.usePushNotificationsMock,
);
// @ts-ignore
jest.mock('../src/store/store', () => mocks.storeMock);
// @ts-ignore
jest.mock('@react-navigation/native', () => mocks.reactNavigationMocks);
// @ts-ignore
jest.mock(
  '../src/components/ui/BottomSheet/BottomSheet',
  // @ts-ignore
  () => mocks.bottomSheetMock,
);
// @ts-ignore
jest.mock('@notifee/react-native', () => mocks.notifeeMock);
// @ts-ignore
jest.mock('react-native-push-notification', () => mocks.pushNotificationMock);
jest.mock(
  '@react-native-community/push-notification-ios',
  // @ts-ignore

  () => mocks.pushNotificationIOSMock,
);
// @ts-ignore
jest.mock('react-native-toast-message', () => mocks.toastMessageMock);
// @ts-ignore
jest.mock('@react-native-firebase/messaging', () => mocks.messagingMock);
jest.mock(
  '@react-native-async-storage/async-storage',
  // @ts-ignore
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
  await waitFor(() => {
    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });
});

test('should call catchPokemon when Catch Pokemon button is pressed', () => {
  const mockCatchPokemon = jest.fn();
  const mockItem = {
    name: 'Pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  const {getByTestId} = render(
    <SubmitButton
      text="Catch Pokemon"
      onPress={() => mockCatchPokemon(mockItem)}
      textColor="red"
      style={{}}
      textSize={12}
      testID="catch-pokemon-button"
      rightIcon={<CirclePlus color="red" size={20} />}
    />,
  );

  fireEvent.press(getByTestId('catch-pokemon-button'));

  expect(mockCatchPokemon).toHaveBeenCalledWith(mockItem);
});

test('should navigate to PokemonDetails screen when View Pokemon button is pressed', () => {
  const mockNavigation = {navigate: jest.fn()};
  const mockItem = {
    name: 'Pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  const {getByTestId} = render(
    <SubmitButton
      text="View Pokemon"
      onPress={() =>
        mockNavigation.navigate('PokemonDetails', {pokemon: mockItem})
      }
      textColor="red"
      style={{}}
      textSize={12}
      rightIcon={<Eye color="red" size={20} />}
      testID="view-pokemon-button"
    />,
  );

  fireEvent.press(getByTestId('view-pokemon-button'));

  expect(mockNavigation.navigate).toHaveBeenCalledWith('PokemonDetails', {
    pokemon: mockItem,
  });
});
