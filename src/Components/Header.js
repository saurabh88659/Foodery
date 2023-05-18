import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {COLORS} from '../utils/Colors';
import {heightPixel, widthPixel, fontPixel} from '../Components/Dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {EvilIconsIcon, FontAwesome5Icon, userIconHome} from '../utils/Const';

const Header = props => {
  const {headerHeight} = props;
  return (
    <SafeAreaView style={{backgroundColor: COLORS.GREEN}}>
      <View style={Styles.HeadersSty}>
        <TouchableOpacity onPress={props.titleonPress} style={{paddingTop: 15}}>
          <Text
            numberOfLines={1}
            style={{
              color: COLORS.WHITE,
              fontSize: fontPixel(15),
              fontWeight: '500',
              letterSpacing: 0.5,
            }}>
            Delivery to
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 3,
              width: widthPixel(300),
            }}>
            <Text
              style={{
                color: COLORS.WHITE,
                fontSize: fontPixel(17),
                fontWeight: '500',
                letterSpacing: 0.5,
              }}>
              Home-Kickr Tech Home-Kickr Tech
            </Text>
            <Icon name="arrow-drop-down" color={COLORS.WHITE} size={25} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            top: '4%',
          }}>
          <FontAwesome5Icon
            title={'user-circle'}
            size={30}
            IconColor={COLORS.WHITE}
          />
        </TouchableOpacity>
      </View>

      <View style={Styles.sectionStyle}>
        <EvilIcons name="search" color={COLORS.GRAYDARK} size={25} />
        <TextInput
          placeholderTextColor={COLORS.GRAY}
          placeholder="Serch for you fovourites"
          style={Styles.inputStyles}
        />
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversation: {color: COLORS.BLACK, fontSize: 16, fontWeight: 'bold'},
  searchText: {
    color: COLORS.BLACK,
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
  },
  searchBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#0F0F0F',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  Container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  HeadersSty: {
    height: heightPixel(120),
    backgroundColor: COLORS.GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.GRAY,
    height: 45,
    marginHorizontal: 15,
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
export default Header;
