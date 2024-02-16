import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/Navigation/AuthStack';
import 'react-native-gesture-handler';
import {
  notificationListeners,
  requestUserPermission,
} from './src/utils/Handler/FirebaseMessagingNoti';

function App() {
  useEffect(() => {
    requestUserPermission();
    notificationListeners();

  }, []);
  console.log("hello")
  return (
    <NavigationContainer>``
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;
