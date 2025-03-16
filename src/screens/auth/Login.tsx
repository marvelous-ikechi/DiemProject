import * as yup from 'yup';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import React, {FunctionComponent} from 'react';

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
import useAuth from 'src/hooks/useAuth';
import {yupResolver} from '@hookform/resolvers/yup';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
type Inputs = {
  email: string;
  password: string;
};

const Login: FunctionComponent<Props> = () => {
  const {
    googleSignIn,
    signInOrSignUpWithEmailAndPassword,
    isEmailAndPasswordSignInLoading,
    isGoogleSignInLoading,
  } = useAuth();

  const authSchema = yup.object().shape({
    email: yup
      .string()
      .email('Enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password cannot exceed 100 characters')
      .required('Password is required'),
  });

  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm<Inputs>({
    resolver: yupResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    signInOrSignUpWithEmailAndPassword(data?.email, data?.password);
  };

  return (
    <ScreenWrapper>
      <Text bold size={size.XL}>
        Login
      </Text>
      <Text medium size={size.S}>
        Welcome back
      </Text>
      <View style={styles.inputFieldsContainer}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Email Address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        {errors.email && <Text color="danger">{errors.email.message}</Text>}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text color="danger">{errors.password.message}</Text>
        )}
        <SubmitButton
          text="Login"
          onPress={handleSubmit(onSubmit)}
          textColor="secondary"
          backgroundColor="blue"
          isLoading={isEmailAndPasswordSignInLoading}
          disabled={!isValid}
        />
        <SubmitButton
          text="Sign up with google"
          onPress={googleSignIn}
          textColor="secondary"
          backgroundColor="primary"
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
