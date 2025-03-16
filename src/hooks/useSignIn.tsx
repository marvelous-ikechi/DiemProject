import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import {AuthStackParamList} from '@src/navigation/types/AuthStackParamList';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const useSignIn = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] =
    useState<boolean>(false);
  const [isEmailAndPasswordSignInLoading, setIsEmailAndPasswordSignInLoading] =
    useState<boolean>(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
    });
    GoogleSignin.signInSilently().catch(() => null);
  }, []);

  const googleSignIn = async () => {
    setIsGoogleSignInLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response);

      navigation.navigate('BottomTab', {screen: 'Home'});
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    } finally {
      setIsGoogleSignInLoading(false);
    }
  };

  const signInOrSignUpWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    setIsEmailAndPasswordSignInLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // Navigate only if sign-in is successful
      navigation.navigate('BottomTab', {screen: 'Home'});
    } catch (error: any) {
      // If email is already registered, try signin in.
      if (error.code === 'auth/email-already-in-use') {
        try {
          const userCredential = await auth().signInWithEmailAndPassword(
            email,
            password,
          );
          console.log('User signed up:', userCredential.user);
          // Navigate only if sign-up is successful
          navigation.navigate('BottomTab', {screen: 'Home'});
        } catch (signUpError: any) {
          console.error('Signup Error:', signUpError.code);
        }
      } else {
        console.error('Firebase Auth Error:', error.code);
      }
    } finally {
      setIsEmailAndPasswordSignInLoading(false);
    }
  };

  return {
    googleSignIn,
    signInOrSignUpWithEmailAndPassword,
    isGoogleSignInLoading,
    isEmailAndPasswordSignInLoading,
  };
};

export default useSignIn;
