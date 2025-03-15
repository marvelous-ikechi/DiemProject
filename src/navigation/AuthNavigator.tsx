import {AuthStackParamList} from './types/AuthStackParamList';
import BottomTab from './BottomNavigator';
import Login from 'src/screens/auth/Login';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BottomTab"
        component={BottomTab}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
