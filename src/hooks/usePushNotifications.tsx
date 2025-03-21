// @ts-ignore
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import {PermissionsAndroid, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {useCallback, useEffect} from 'react';

import {AppStackParamList} from '@src/navigation/types/AppStackParamList';
import {PokemonType} from 'src/types/appTypes';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {StackNavigationProp} from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<AppStackParamList, 'BottomTab'>;

// Background Message Handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    data: remoteMessage?.data,
    android: {
      channelId: 'pokemon-channel',
      pressAction: {id: 'default'},
    },
  });
});

const usePushNotifications = () => {
  const navigation = useNavigation<Props>();
  //  Request permission for notifications
  const requestPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().hasPermission();
        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          return;
        }
        await messaging().requestPermission();
      } else if (Platform.OS === 'android') {
        const currentStatus = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (currentStatus) {
          return;
        }
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        const permissionGranted =
          granted === PermissionsAndroid.RESULTS.GRANTED;

        Toast.show({
          type: permissionGranted ? 'genericToast' : 'error',
          text1: 'Notification permission',
          text2: permissionGranted
            ? ' Notification permission granted (Android)'
            : ' Notification permission denied (Android)',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Notification permission',
        text2:
          error instanceof Error
            ? error.message
            : 'An error occurred while requesting notification permission',
      });
    }
  };

  // Get the device token
  const getToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().getToken();
    } catch (error) {
      console.error('Failed to get token:', error);
    }
  };

  // Handle incoming foreground notifications
  const onMessageReceived = async (message: any) => {
    await notifee.displayNotification({
      title: message?.notification?.title,
      body: message?.notification?.body,
      data: message?.data,
      android: {
        channelId: 'pokemon-channel',
        pressAction: {id: 'default'},
      },
    });
  };

  const handleNotificationNavigation = useCallback(
    (message: PokemonType) => {
      if (message?.url) {
        navigation.navigate('PokemonDetails', {pokemon: message});
      } else {
        navigation.navigate('BottomTab');
      }
    },
    [navigation],
  );

  // handle Background n
  notifee.onBackgroundEvent(async event => {
    handleNotificationNavigation(
      event?.detail?.notification?.data as PokemonType,
    );
  });

  // Create a notification channel
  const createNotificationChannel = async () => {
    await notifee.createChannel({
      id: 'pokemon-channel',
      name: 'Pokemon Channel',
      importance: AndroidImportance.HIGH,
    });

    PushNotification.createChannel({
      channelId: 'pokemon-channel',
      channelName: 'Pokemon Channel',
      channelDescription: 'A channel for pokemon notifications',
      importance: 4,
      vibrate: true,
    });
  };

  // Initialize Firebase and permissions
  const initializeFirebase = async () => {
    try {
      await messaging().getToken();
      await requestPermission();
    } catch (error) {
      console.log('Error while initializing Firebase:', error);
    }
  };

  // Configure push notifications
  const configurePushNotifications = () => {
    PushNotification.configure({
      onNotification: function (notification: any) {
        // Display local notification for foreground messages
        PushNotification.localNotification({
          channelId: 'pokemon-channel',
          title: notification.title,
          message: notification.message,
        });

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onRegistrationError: function (err: any) {
        console.error('Push Notification Registration Error:', err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  };

  notifee.onBackgroundEvent(async event => {
    handleNotificationNavigation(
      event?.detail?.notification?.data as PokemonType,
    );
  });

  useEffect(() => {
    createNotificationChannel();
    configurePushNotifications();
    getToken();
    messaging().onMessage(onMessageReceived);
    messaging().onNotificationOpenedApp(remoteMessage => {
      handleNotificationNavigation(remoteMessage as unknown as PokemonType);
    });

    // Handle app opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleNotificationNavigation(remoteMessage as unknown as PokemonType);
        }
      });
  }, [handleNotificationNavigation]);

  return {configurePushNotifications, initializeFirebase};
};

export default usePushNotifications;
