import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from './Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';

const GlobelStyles = StyleSheet.create({
  INCREAMENTBOTTONMAIN: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPixel(60),
    backgroundColor: COLORS.PURPLE,
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: 4,
    top: -5,
  },
  DCREAMENTTITLE: {
    color: COLORS.WHITE,
    fontSize: 14,
    paddingVertical: 4,
  },
  ITEMTITEL: {
    color: COLORS.WHITE,
    fontSize: 13,
    paddingVertical: 4,
    fontWeight: '500',
  },
  INCREAMENTTITLE: {
    color: COLORS.WHITE,
    fontSize: 14,
    paddingVertical: 4,
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

  ACTIONCON: {
    height: heightPixel(600),
    width: widthPixel(380),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE,
  },

  Modalimagestyle: {
    height: heightPixel(200),
    width: widthPixel(400),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '4%',
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
  ACTIONMAINCONQ: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    borderColor: COLORS.GRAYDARK,
  },
  MAINQ: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MAINQTEXT: {
    fontSize: fontPixel(25),
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  MAINQDISCOUNT: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(13),
    paddingLeft: 5,
    fontWeight: '500',
    top: 4,
    textDecorationLine: 'line-through',
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
  MAINQCON: {
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.GRAYDARK,
  },
  MAINQTEXTDEL: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(19),
  },
  MAINQTEXTDAY: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(14),
    top: 2,
  },
  MAINQTEXTVIEWDETAILS: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  MAINQVIEWMORE: {
    color: COLORS.PURPLE,
    fontSize: fontPixel(14),
  },
  MAINQSIMILAR: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(19),
    marginTop: 7,
  },
  manufTitle: {
    color: COLORS.BLACK,
    fontSize: fontPixel(12),
    fontWeight: '500',
    letterSpacing: 0.5,
    paddingTop: 5,
  },
  EXPLOREBOX: {
    height: heightPixel(100),
  },
  EXPLORETITLESUB: {
    color: COLORS.BLACK,
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
});

export default GlobelStyles;
