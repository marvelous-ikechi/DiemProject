import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {AuthStackParamList} from '@src/navigation/types/AuthStackParamList';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';

const useSignIn = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: IOS_CLIENT_ID,
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
    GoogleSignin.signInSilently().catch(() => null);
  }, []);

  const googleSignIn = async () => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      if (!hasPlayServices) {
        console.error('Google Play Services not available.');
        return;
      }

      const response = await GoogleSignin.signIn();
      if (response.type === 'success') {
        navigation.navigate('BottomTab', {
          screen: 'Home',
        });
      }
      console.log(response);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return {
    googleSignIn,
  };
};

export default useSignIn;
