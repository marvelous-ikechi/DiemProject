import {BottomTabParamList} from './BottomTabParamList';

export type AuthStackParamList = {
  Login: undefined;
  BottomTab: {screen?: keyof BottomTabParamList};
};
