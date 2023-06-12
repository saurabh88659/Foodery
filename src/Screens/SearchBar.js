import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL, IonIcon} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {heightPixel} from '../Components/Dimensions';
import axios from 'axios';
import {_getStorage} from '../utils/Storage';
import Productinfo from '../Components/Productinfo';

export default function SearchBar({navigation}) {
  const [searchBarList, setSearchBarList] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    _SearchBarList();
  }, []);

  const _SearchBarList = async () => {
    const token = await _getStorage('token');

    axios
      .get(BASE_URL + `/getAllProductlist`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('Search bar Response', response.data.getAll);
        setSearchBarList(response.data.getAll);
      })
      .catch(error => {
        console.log('Search bar error====>>>', error);
      });
  };

  const filteredData = searchBarList.filter(item => {
    return item.productName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <SafeAreaView style={{flex: 1, marginTop: heightPixel(80)}}>
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
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}>
          {filteredData.map((item, index) => (
            <Productinfo
              Styles={{paddingVertical: '6%'}}
              key={index}
              Productimage={{uri: item.productImage}}
              ProductName={item.productName}
              ProductSubName={item.productUnit}
              discountPrice={`Rs.${item.discountPrice}`}
              StylesPrices={{top: heightPixel(5)}}
              ProductPrice={`Rs.${item.productPrice}`}
            />
          ))}
        </View>
      </ScrollView>
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
