import AuthNavigator from './AuthNavigator';
import BottomTab from './BottomNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './types/RootStackParamList';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="BottomNavigator" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
