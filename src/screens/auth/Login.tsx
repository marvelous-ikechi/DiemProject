import React, {FunctionComponent, useState} from 'react';

import {AuthStackParamList} from '@src/navigation/types/AuthStackParamList';
import GoogleIcon from 'src/assets/Icons/GoogleIcon';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenWrapper from 'src/components/container/ScreenWrapper';
import {StyleSheet} from 'react-native';
import SubmitButton from 'src/components/ui/Button/SubmitButton';
import Text from 'src/components/ui/Text/Text';
import TextInput from 'src/components/ui/Text/TextInput';
import View from 'src/components/ui/View/View';
import {size} from 'src/utils/size';
import useSignIn from 'src/hooks/useSignIn';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login: FunctionComponent<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {
    googleSignIn,
    signInOrSignUpWithEmailAndPassword,
    isEmailAndPasswordSignInLoading,
    isGoogleSignInLoading,
  } = useSignIn();

  return (
    <ScreenWrapper>
      <Text bold size={size.XL}>
        Login
      </Text>
      <Text medium size={size.S}>
        Welcome back
      </Text>
      <View style={styles.inputFieldsContainer}>
        <TextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
        />
        <SubmitButton
          text="Login"
          onPress={() => signInOrSignUpWithEmailAndPassword(email, password)}
          textColor="secondary"
          isLoading={isEmailAndPasswordSignInLoading}
        />
        <SubmitButton
          text="Sign up with google"
          onPress={googleSignIn}
          textColor="secondary"
          backgroundColor="secondary"
          leftIcon={<GoogleIcon style={styles.iconStyle} />}
          isLoading={isGoogleSignInLoading}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  inputFieldsContainer: {
    marginTop: 40,
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default Login;
