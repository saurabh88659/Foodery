import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from './Dimensions';
import {FontAwesomeIcon} from '../utils/Const';
import {IonIcon} from '../utils/Const';
import {MaterialIconsIcon} from '../utils/Const';

export default function Productinfo(props) {
  const [heart, setHeart] = useState(true);

  return (
    <View key={props.index} style={[Styles.CONTAINERBOX, props.Styles]}>
      <View>
        <TouchableOpacity
          onPress={props.heartonPress}
          style={[Styles.CONTAINERHEART]}>
          <FontAwesomeIcon
            title={props.FontAwesomeIcontitle}
            size={20}
            IconColor={props.IconColor}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={props.heartonPress}
          style={[Styles.CONTAINERHEART, {backgroundColor: 'red'}]}>
          <FontAwesomeIcon
            title={props.FontAwesomeIcontitle}
            size={20}
            IconColor={props.IconColor}
          />
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity onPress={props.onPress}>
        <View style={{alignItems: 'center'}}>
          <Image source={props.Productimage} style={Styles.imagestyle} />
        </View>
        <View style={{marginHorizontal: 7}}>
          <Text numberOfLines={1} style={Styles.TITLESTYL}>
            {props.ProductName}
          </Text>
          <Text numberOfLines={2} style={Styles.SUBTITLRSTYL}>
            {props.ProductSubName}
          </Text>
          <Text style={Styles.TITLEPRICEDISSTYL}>{props.discountPrice}</Text>
          <View style={Styles.PRICECONTAINER}>
            <Text style={[Styles.PRICESTYL, props.StylesPrices]}>{props.ProductPrice}</Text>

            {/* <TouchableOpacity
              onPress={props.addtocartonPress}
              activeOpacity={0.5}
              style={Styles.ADDBOTTONSTYL}>
              <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
            </TouchableOpacity> */}
            {props.UIBotton}
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: widthPixel(60),
                backgroundColor: COLORS.PURPLE,
                alignItems: 'center',
                paddingHorizontal: 7,
                borderRadius: 4,
                top: -5,
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: 14,
                    paddingVertical: 4,
                  }}>
                  -
                </Text>
                <MaterialIconsIcon
                  title={'minimize'}
                  size={15}
                  IconColor={COLORS.WHITE}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: COLORS.WHITE,
                  fontSize: 13,
                  paddingVertical: 4,
                  fontWeight: '500',
                }}>
                0
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: 14,
                    paddingVertical: 4,
                  }}>
                  +
                </Text>
                <IonIcon title={'add'} size={14} IconColor={COLORS.WHITE} />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  CONTAINERBOX: {
    backgroundColor: COLORS.WHITE,
    // height: heightPixel(195),
    width: widthPixel(130),
    marginHorizontal: 3,
    marginTop: 10,
    elevation: 10,
    borderRadius: 4,
  },
  CONTAINERBOXMAIN: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 15,
    alignItems: 'center',
  },
  CONTAINERHEART: {alignItems: 'flex-end', margin: 5},
  imagestyle: {
    height: heightPixel(60),
    width: widthPixel(100),
    resizeMode: 'contain',
    top: -5,
  },
  TITLESTYL: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(15),
  },
  SUBTITLRSTYL: {
    color: COLORS.GRAYDARK,
    fontWeight: '500',
    fontSize: fontPixel(13),
    top: 2,
  },
  TITLEPRICEDISSTYL: {
    color: COLORS.GRAYDARK,
    fontWeight: '500',
    fontSize: fontPixel(12),
    textDecorationLine: 'line-through',
    top: 5,
  },
  PRICECONTAINER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 5,
    alignItems: 'center',
  },
  PRICESTYL: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(15),
  },
  ADDBOTTONSTYL: {
    borderWidth: 1,
    borderColor: COLORS.PURPLE,
    paddingVertical: 4,
    width: widthPixel(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    top: -5,
  },
  BOTTONTEXTSTYL: {
    color: COLORS.PURPLE,
    fontWeight: '500',
    fontSize: fontPixel(13),
  },
  Modalimagestyle: {
    height: heightPixel(200),
    width: widthPixel(400),
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginTop: '4%',
  },
  MODALTITLE: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(18),
  },
  SUBMODALTITLE: {
    color: COLORS.GRAYDARK,
    marginTop: 8,
    fontSize: fontPixel(18),
  },

  SUBMODALTITLEPRICE: {},
});
