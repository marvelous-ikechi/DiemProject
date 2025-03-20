import {ChevronRight, User} from 'lucide-react-native';
import {Image, Pressable, StyleSheet} from 'react-native';
import React, {FunctionComponent} from 'react';

import {AppStackParamList} from '@src/navigation/types/AppStackParamList';
import ScreenWrapper from 'src/components/container/ScreenWrapper';
import {StackNavigationProp} from '@react-navigation/stack';
import SubmitButton from 'src/components/ui/Button/SubmitButton';
import Text from 'src/components/ui/Text/Text';
import {UserType} from '@src/types/appTypes';
import View from 'src/components/ui/View/View';
import {colors} from 'src/utils/colors';
import {useNavigation} from '@react-navigation/native';
import useStore from 'src/store/store';

type Props = StackNavigationProp<AppStackParamList, 'BottomTab'>;

const ProfileScreen: FunctionComponent = () => {
  const {user, removeUser} = useStore();
  const userData: UserType | null = user;
  const navigation = useNavigation<Props>();
  return (
    <ScreenWrapper>
      <View style={styles.imageContainer}>
        {userData?.photo ? (
          <Image source={{uri: userData?.photo}} style={styles.image} />
        ) : (
          <User size={60} color={colors.primary} />
        )}
        <Text>
          {userData?.givenName ?? 'A man has no name'}{' '}
          {userData?.familyName ?? ''}
        </Text>
      </View>
      <View style={styles.card}>
        <Pressable onPress={() => navigation.navigate('CaughtPokemons')}>
          <View row>
            <Text color={colors.secondary}>Caught Pokemons</Text>
            <ChevronRight size={20} color={colors.secondary} />
          </View>
        </Pressable>
      </View>
      <View style={styles.logoutButton}>
        <SubmitButton
          textColor={colors.danger}
          text="Logout"
          backgroundColor={'secondary'}
          onPress={removeUser}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.card,
  },
});

export default ProfileScreen;
