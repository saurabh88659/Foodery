import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/Navigation/AuthStack';
import 'react-native-gesture-handler';

function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;
