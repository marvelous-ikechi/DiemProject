import {AppStackParamList} from './types/AppStackParamList';
import BottomTab from './BottomNavigator';
import CaughtPokemonList from 'src/screens/profile/CaughPokemonList';
import PokemonDetails from 'src/screens/home/PokemonDetails';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="BottomTab">
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
      <Stack.Screen name="CaughtPokemons" component={CaughtPokemonList} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
