/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/Redux/Store/store';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import {_getStorage, _setStorage} from './src/utils/Storage';
import messaging from '@react-native-firebase/messaging';
let persiststor = persistStore(store);

messaging().onMessage(async remoteMessage => {
  console.log('Foreground Message:', remoteMessage);
});

// Handle background and terminated app notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Message:', remoteMessage);
});

// Handle notification tap when the app is in the background or terminated
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('Notification Tapped:', remoteMessage);
});

// Handle notification tap when the app is closed
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log('Initial Notification Tapped:', remoteMessage);
    }
  });

const NewApp = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persiststor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => NewApp);
