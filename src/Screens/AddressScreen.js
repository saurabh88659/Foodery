import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel} from '../Components/Dimensions';
import {OcticonsIcon} from '../utils/Const';
import {RadioButton} from 'react-native-paper';

export default function AddressScreen({navigation}) {
  const [checked, setChecked] = React.useState('first');

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeaderNo2
        title={'Choose Your Address'}
        onPress={() => navigation.goBack()}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddressScreenWithMap')}
        activeOpacity={0.6}
        style={Styles.BOX}>
        <OcticonsIcon title={'plus'} size={22} IconColor={COLORS.BLUE} />
        <Text style={{color: COLORS.BLUE, paddingLeft: 10, fontWeight: '800'}}>
          Address
        </Text>
      </TouchableOpacity>
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Text
            style={{
              color: COLORS.BLACK,
              fontSize: fontPixel(18),
              paddingHorizontal: 5,
              textAlign: 'left',
            }}>
            Noida sector 62 Noida sector 62Noida sector sector 62Noida sector
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
          />
          <Text
            style={{
              color: COLORS.BLACK,
              fontSize: fontPixel(18),
              marginHorizontal: 5,
              textAlign: 'left',
            }}>
            Noida sector 62 Noida sector 62Noida sector sector 62Noida sector
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  BOX: {
    borderWidth: 1,
    marginVertical: heightPixel(25),
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1,
    borderColor: COLORS.GRAYDARK,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
