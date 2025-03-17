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
  caughtPokemons: any[];
  addCaughtPokemon: (pokemon: any) => void;
  releasePokemon: (name: string) => void;
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

      // Manage Caught Pokémon
      caughtPokemons: [],

      // Add a Pokémon (Catch)
      addCaughtPokemon: pokemon =>
        set(state => {
          // Avoid duplicates
          if (state.caughtPokemons.some(p => p.name === pokemon.name)) {
            alert(`${pokemon.name} is already caught!`);
            return state;
          }

          const updatedPokemons = [...state.caughtPokemons, pokemon];
          return {caughtPokemons: updatedPokemons};
        }),

      // Remove a Pokémon (Release)
      releasePokemon: name =>
        set(state => {
          const updatedPokemons = state.caughtPokemons.filter(
            p => p.name !== name,
          );
          return {caughtPokemons: updatedPokemons};
        }),
    }),
    {
      name: 'userState',
      storage,
    },
  ),
);

export default useStore;
