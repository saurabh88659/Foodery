import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import React from 'react';
import {IonIcon} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {heightPixel} from '../Components/Dimensions';

export default function SearchBar({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, marginVertical: heightPixel(80)}}>
      <View style={Styles.sectionStyle}>
        <Pressable onPress={() => navigation.goBack()}>
          <IonIcon
            title="arrow-back-outline"
            size={30}
            IconColor={COLORS.BLACK}
          />
        </Pressable>
        <TextInput
          placeholderTextColor={COLORS.GRAY}
          placeholder="Serch for you fovourites"
          style={Styles.inputStyles}
        />
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: COLORS.GRAY,
    height: heightPixel(60),
    marginHorizontal: 10,
    borderRadius: 7,
    elevation: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    top: -15,
    // marginTop: 10,
  },
  inputStyles: {
    flex: 1,
    height: 45,
    color: COLORS.BLACK,
    fontSize: 15,
    paddingHorizontal: 10,
    letterSpacing: 0.3,
    fontWeight: '500',
  },
});
