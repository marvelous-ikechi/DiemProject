import {Home, User} from 'lucide-react-native';

import {size as AppSize} from 'src/utils/size';
import {BottomTabParamList} from './types/BottomTabParamList';
import HomeScreen from 'src/screens/tab/HomeScreen';
import ProfileScreen from 'src/screens/tab/ProfileScreen';
import {colors} from 'src/utils/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useStore from 'src/store/store';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  const tabIcon = (
    name: string,
    color: string,
    size: number,
    focused: boolean,
  ) => {
    if (name === 'Home') {
      return <Home size={size} color={focused ? colors.blue : color} />;
    }
    return <User size={size} color={focused ? colors.blue : color} />;
  };
  const {currentScreen, setCurrentScreen} = useStore();
  return (
    <Tab.Navigator
      initialRouteName={currentScreen}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size, focused}) => {
          return tabIcon(route.name, color, size, focused);
        },
        tabBarStyle: {
          backgroundColor: 'black',
          height: 60,
          marginBottom: 40,
          marginHorizontal: 30,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 20,
        },
        tabBarLabelStyle: {
          color: 'white',
          fontSize: AppSize.XS,
          fontFamily: 'Figtree-Regular',
        },
        tabBarActiveTintColor: 'blue', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
        listeners={({route}) => ({
          tabPress: () => {
            console.log(`${route.name} tab was pressed`);
            setCurrentScreen(route.name);
          },
        })}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Profile"
        component={ProfileScreen}
        listeners={({route}) => ({
          tabPress: () => {
            setCurrentScreen(route.name);
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
