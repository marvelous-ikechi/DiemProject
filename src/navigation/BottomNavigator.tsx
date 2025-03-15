import {BottomTabParamList} from './types/BottomTabParamList';
import HomeScreen from 'src/screens/tab/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
