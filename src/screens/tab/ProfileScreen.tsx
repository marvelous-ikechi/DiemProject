import {Image, StyleSheet} from 'react-native';
import React, {FunctionComponent} from 'react';

import ScreenWrapper from 'src/components/container/ScreenWrapper';
import SubmitButton from 'src/components/ui/Button/SubmitButton';
import Text from 'src/components/ui/Text/Text';
import {User} from 'lucide-react-native';
import {UserType} from '@src/types/appTypes';
import View from 'src/components/ui/View/View';
import {colors} from 'src/utils/colors';
import useStore from 'src/store/store';

const ProfileScreen: FunctionComponent = () => {
  const {user, removeUser} = useStore();
  const userData: UserType | null = user;
  return (
    <ScreenWrapper>
      <View style={styles.imageContainer}>
        {userData?.photo ? (
          <Image source={{uri: userData?.photo}} style={styles.image} />
        ) : (
          <User size={60} color={colors.primary} />
        )}
        <Text>
          {userData?.givenName} {userData?.familyName}
        </Text>
      </View>
      <View style={styles.logoutButton}>
        <SubmitButton
          textColor={'danger'}
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
});

export default ProfileScreen;
