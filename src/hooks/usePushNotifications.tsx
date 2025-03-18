import {PermissionsAndroid, Platform} from 'react-native';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const usePushNotifications = () => {
  // Request permission to receive notifications (iOS & Android 13+)
  const requestPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        console.log('Authorization status (iOS):', authStatus);
      } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted (Android)');
        } else {
          console.log('Notification permission denied (Android)');
        }
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
    }
  };

  // Get the device token
  const getToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('Device token:', token);
      // Send this token to your server for sending messages
    } catch (error) {
      console.error('Failed to get token:', error);
    }
  };

  // Handle incoming messages
  const handleMessages = () => {
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Message received:', remoteMessage);

      // Show local notification for foreground messages (Android)
      PushNotification.localNotification({
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body ?? '',
        channelId: 'every-user-channel',
      });
    });

    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('Notification opened app:', remoteMessage);
        // Do some action
      },
    );

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  };

  useEffect(() => {
    getToken();
    return handleMessages();
  }, []);

  const initializeFirebase = async () => {
    try {
      await messaging().getToken();
      await requestPermission();
      handleMessages();
    } catch (error) {
      console.log('Error while initializing firebase:', error);
    }
  };

  const configurePushNotifications = () => {
    PushNotification.createChannel(
      {
        channelId: 'every-user-channel',
        channelName: 'Every User Channel',
        channelDescription: 'A channel for every user notifications',
        importance: 4,
        vibrate: true,
      },
      (created: any) => console.log(`Notification channel created: ${created}`),
    );

    PushNotification.configure({
      onNotification: function (notification: {
        title: any;
        message: any;
        finish: (arg0: any) => void;
      }) {
        console.log('NOTIFICATION:', notification);

        // Show local notification if received in foreground
        PushNotification.localNotification({
          channelId: 'every-user-channel',
          title: notification.title,
          message: notification.message,
        });

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onRegistrationError: function (err: {message: any}) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  useEffect(() => {
    configurePushNotifications();
  }, []);

  return {configurePushNotifications, initializeFirebase};
};

export default usePushNotifications;
