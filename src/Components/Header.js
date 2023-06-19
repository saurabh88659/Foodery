import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {COLORS} from '../utils/Colors';
import {heightPixel, widthPixel, fontPixel} from '../Components/Dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {FontAwesome5Icon} from '../utils/Const';
import {useSelector} from 'react-redux';

const Header = props => {
  const {headerHeight} = props;

  const texts = [
    'Search "rice"',
    'Search "eggs"',
    'Search "atta"',
    'Search "Butter"',
    'Search "Broccoli"',
    'Search "Bananas"',
    'Search "Peanut butter"',
    'Search "Bread"',
    'Search "Spinach"',
    'Search "Onions"',
    'Search "Tomatoes"',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const text = texts[currentIndex];
    let currentIndexCopy = currentIndex;

    const interval = setInterval(() => {
      if (currentIndexCopy === currentIndex) {
        const newText = text.substring(0, currentText.length + 1);
        setCurrentText(newText);
      } else {
        currentIndexCopy = currentIndex;
        setCurrentText('');
      }

      if (currentText === text) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, currentText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const addressCurrent = useSelector(
    state => state.AddressLSlice.currentAddress,
  );

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
              alignItems: 'center',
              width: widthPixel(304),
              // marginTop: 3,
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: COLORS.WHITE,
                fontSize: fontPixel(16),
                fontWeight: '500',
                letterSpacing: 0.6,
              }}>
              {/* Home-Kickr Tech Home-Kickr Tech
               */}
              {addressCurrent}
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

      <Pressable style={Styles.sectionStyle} onPress={props.onPressserch}>
        <EvilIcons name="search" color={COLORS.GRAYDARK} size={25} />
        <Text
          style={{
            color: COLORS.GRAY,
            paddingLeft: 7,
            fontSize: fontPixel(16),
            fontWeight: '500',
          }}>
          {/* Serch for you fovourites */}
          {currentText}
        </Text>
      </Pressable>
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
    justifyContent: 'flex-start',
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
