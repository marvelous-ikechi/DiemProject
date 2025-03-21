// @ts-ignore
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import {PermissionsAndroid, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {useCallback, useEffect} from 'react';

import {AppStackParamList} from '@src/navigation/types/AppStackParamList';
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

  // Request permission for notifications
  const requestPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
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
            ? 'Notification permission granted (Android)'
            : 'Notification permission denied (Android)',
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

  // Handle notification navigation
  const handleNotificationNavigation = useCallback(
    (message: any) => {
      if (message?.url) {
        navigation.navigate('PokemonDetails', {pokemon: message});
      } else {
        navigation.navigate('BottomTab');
      }
    },
    [navigation],
  );

  // handle Background notification
  notifee.onBackgroundEvent(async event => {
    handleNotificationNavigation(event?.detail?.notification?.data);
  });

  // Create a notification channel
  const createNotificationChannel = async () => {
    await notifee.createChannel({
      id: 'pokemon-channel',
      name: 'Pokemon Channel',
      importance: AndroidImportance.HIGH,
      description: 'A channel for pokemon notifications',
      vibration: true,
    });
  };

  // Initialize Firebase
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
      onNotification: async (notification: any) => {
        await notifee.displayNotification({
          title: notification.title,
          body: notification.message,
          android: {channelId: 'pokemon-channel'},
        });

        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      onRegistrationError: (err: any) => {
        console.error('Push Notification Registration Error:', err);
      },
      permissions: {alert: true, badge: true, sound: true},
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };

  useEffect(() => {
    createNotificationChannel();
    configurePushNotifications();
    getToken();

    const unsubscribeOnMessage = messaging().onMessage(onMessageReceived);
    const unsubscribeOnOpen = messaging().onNotificationOpenedApp(
      handleNotificationNavigation,
    );

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleNotificationNavigation(remoteMessage);
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnOpen();
    };
  }, [handleNotificationNavigation]);

  return {configurePushNotifications, initializeFirebase};
};

export default usePushNotifications;
