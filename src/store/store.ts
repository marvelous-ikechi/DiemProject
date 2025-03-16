import {createJSONStorage, persist} from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from 'src/types/appTypes';
import {create} from 'zustand';

type ScreenType = 'Home' | 'Profile';

type AuthState = {
  user: UserType | null;
  addUser: (user: UserType) => void;
  removeUser: () => void;
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
};

const storage = createJSONStorage(() => AsyncStorage);

export const useStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      addUser: user => set(() => ({user})),
      removeUser: () => set(() => ({user: null})),
      currentScreen: 'Home',
      setCurrentScreen: screen => set(() => ({currentScreen: screen})),
    }),
    {
      name: 'userState',
      storage,
    },
  ),
);

export default useStore;
