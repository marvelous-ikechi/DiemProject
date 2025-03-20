// __tests__/mocks.js
import {jest} from '@jest/globals';

// React Query
const actualReactQuery = jest.requireActual('@tanstack/react-query');
const reactQueryMocks = {
  ...actualReactQuery,
  useInfiniteQuery: jest.fn(() => ({
    data: {
      pages: [
        {
          results: [
            {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
          ],
          next: 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=10',
        },
      ],
      pageParams: ['https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'],
    },
    isFetchingNextPage: false,
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isLoading: false,
    isError: false,
    error: null,
  })),
  useQueryClient: jest.fn(() => ({
    ensureQueryData: jest.fn(() =>
      Promise.resolve({
        name: 'bulbasaur',
        id: 1,
        sprites: {front_default: 'https://example.com/bulbasaur.png'},
        height: 7,
        weight: 69,
        base_experience: 64,
        abilities: [{ability: {name: 'overgrow'}}],
      }),
    ),
  })),
};

// API Client
const apiClientMocks = {
  apiClient: {
    get: jest.fn(url => {
      if (url.includes('pokemon?limit=10')) {
        return Promise.resolve({
          data: {
            results: [
              {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
            ],
            next: 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=10',
          },
        });
      }
      if (url.includes('pokemon/')) {
        return Promise.resolve({
          data: {
            name: 'bulbasaur',
            id: 1,
            sprites: {front_default: 'https://example.com/bulbasaur.png'},
            height: 7,
            weight: 69,
            base_experience: 64,
            abilities: [{ability: {name: 'overgrow'}}],
          },
        });
      }
      return Promise.resolve({data: {}});
    }),
  },
};

// usePushNotifications
const usePushNotificationsMock = jest.fn(() => ({
  initializeFirebase: jest.fn(() => Promise.resolve()),
  configurePushNotifications: jest.fn(),
}));

// Zustand Store
const mockStore = {
  caughtPokemons: [],
  addCaughtPokemon: jest.fn(),
  releasePokemon: jest.fn(),
};
const storeMock = {
  __esModule: true,
  default: () => mockStore,
};

// React Navigation
const actualReactNavigation = jest.requireActual('@react-navigation/native');
const reactNavigationMocks = {
  ...actualReactNavigation,
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  })),
};

// BottomSheet
const {View} = require('react-native');
const BottomSheet = jest.fn(({children, ...otherProps}) => (
  <View testID="mocked-bottomview" {...otherProps}>
    {children}
  </View>
));
const bottomSheetMock = {
  __esModule: true,
  default: BottomSheet,
  BottomSheet,
};

// Notifee
const AndroidImportance = {HIGH: 4, DEFAULT: 3, LOW: 2, MIN: 1, NONE: 0};
const notifeeMock = {
  __esModule: true,
  requestPermission: jest.fn(() => Promise.resolve(true)),
  createChannel: jest.fn(() => Promise.resolve('pokemon-channel')),
  displayNotification: jest.fn(() => Promise.resolve()),
  onBackgroundEvent: jest.fn(),
  AndroidImportance,
};

// react-native-push-notification
const pushNotificationMock = {
  getInitialNotification: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
  onBackgroundMessage: jest.fn(),
  configure: jest.fn(),
};

// @react-native-community/push-notification-ios
const pushNotificationIOSMock = {
  getInitialNotification: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
  onBackgroundMessage: jest.fn(),
  configure: jest.fn(),
};

// react-native-toast-message
const toastMessageMock = {
  show: jest.fn(),
};

// @react-native-firebase/messaging
const messagingMock = {
  __esModule: true,
  default: jest.fn(() => ({
    setBackgroundMessageHandler: jest.fn(),
    getToken: jest.fn(() => Promise.resolve('mocked-token')),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    hasPermission: jest.fn(() => Promise.resolve(true)),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    registerDeviceForRemoteMessages: jest.fn(() => Promise.resolve()),
  })),
};

// @react-native-async-storage/async-storage
const asyncStorageMock = (() => {
  let storageCache = {};
  return {
    __esModule: true,
    default: {
      getItem: jest.fn(key => Promise.resolve(storageCache[key] || null)),
      setItem: jest.fn((key, value) => {
        storageCache[key] = value;
        return Promise.resolve(null);
      }),
      removeItem: jest.fn(key => {
        delete storageCache[key];
        return Promise.resolve(null);
      }),
      clear: jest.fn(() => {
        storageCache = {};
        return Promise.resolve(null);
      }),
    },
  };
})();

// Export all mocks
module.exports = {
  reactQueryMocks,
  apiClientMocks,
  usePushNotificationsMock,
  storeMock,
  reactNavigationMocks,
  bottomSheetMock,
  notifeeMock,
  pushNotificationMock,
  pushNotificationIOSMock,
  toastMessageMock,
  messagingMock,
  asyncStorageMock,
};
