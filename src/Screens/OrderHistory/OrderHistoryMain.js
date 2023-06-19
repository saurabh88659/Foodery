import {View, Text, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import MyHeader from '../../Components/MyHeader';
import {COLORS} from '../../utils/Colors';
import Routes from '../../Navigation/Routes';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrderHistoryLive from './OrderHistoryLive';
import OrderHistory from './OrderHistory';
import {IonIcon} from '../../utils/Const';

const Tab = createMaterialTopTabNavigator();

export default function OrderHistoryMain({navigation}) {
  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <StatusBar
        hidden={false}
        backgroundColor={COLORS.GREEN}
        translucent={true}
      />
      <MyHeader
        title={'Order History'}
        onPress={() => navigation.goBack()}
        onPressserchbar={() => navigation.navigate(Routes.SEARCH_BAR)}
        UIBACK={
          <IonIcon
            title="arrow-back-outline"
            size={30}
            IconColor={COLORS.WHITE}
          />
        }
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarIndicatorStyle: {
            borderBottomColor: COLORS.GREEN,
            borderBottomWidth: 3,
          },
        }}>
        <Tab.Screen name="Order History" component={OrderHistory} />
        <Tab.Screen name="Live Order" component={OrderHistoryLive} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
