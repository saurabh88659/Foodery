import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Platform} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'the new genrated token');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'error rasied in fcmToken');
      showError(error.message);
    }
  }
};

export const pushNoti = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notifications caused app to open from background state',
      remoteMessage.notification,
    );
  });
  messaging().onMessage(async remoteMessage => {
    console.log('recive in forbround', remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

async function onDisplayNotification(data) {
  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }
  const channelId = await notifee.createChannel({
    id: 'Noti 8',
    name: 'Noti 8',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: data?.notification.title,
    body: data?.notification.body,
    android: {
      channelId: channelId,
    },
  });
}

export async function notificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    onDisplayNotification(remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
  });

  return unsubscribe;
}
