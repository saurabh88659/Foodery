import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import MyHeader from '../Components/MyHeader';
import {MaterialIconsIcon, bannerIcon} from '../utils/Const';
import {COLORS} from '../utils/Colors';

const {width, height} = Dimensions.get('window');

export default function OffersStack({navigation}) {
  const [ViewHeight, setViewHeight] = React.useState(165);
  const [openModal, setOpenModal] = useState(false);

  const Categories = [{}, {}, {}, {}, {}, {}];
  async function openView() {
    console.log('yesssopen');
    const sizeRowHeight = 165;
    const rows = Math.ceil(Categories.length / 4);
    const totalSize = rows * sizeRowHeight;
    const maxSize = height * 0.95;
    if (totalSize >= maxSize) {
      setViewHeight(maxSize);
    } else {
      setViewHeight(totalSize);
    }
  }
  async function closeView() {
    setViewHeight(165);
  }

  const renderItem = ({item}) => {
    return (
      <View style={{width: '25%'}}>
        <View style={{backgroundColor: 'white', marginVertical: 20}}>
          <Image
            source={bannerIcon}
            style={{width: 70, height: 70, borderRadius: 100}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 13,
              textAlign: 'center',
              color: 'red',
              width: '100%',
              paddingTop: '6%',
            }}>
            name
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <MyHeader title={'Offres'} onPress={() => navigation.goBack()} />

      <View style={[styles.modalize, {height: ViewHeight}]}>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              marginHorizontal: 10,
              marginVertical: 5,
              top: 10,
            }}>
            ALL Categoriess
          </Text>
          <FlatList
            numColumns={4}
            data={openModal ? Categories : Categories.slice(0, 4)}
            renderItem={renderItem}
            keyExtractor={item => {
              item.name;
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          openModal ? closeView() : openView();
        }}>
        <MaterialIconsIcon
          title={'keyboard-arrow-up'}
          size={40}
          IconColor={COLORS.GRAYDARK}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: 'red',
          }}
          onPress={() => closeView()}>
          <MaterialIconsIcon
            title={'keyboard-arrow-down'}
            size={40}
            IconColor={COLORS.GRAYDARK}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalize: {
    top: 0,
    backgroundColor: 'white',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: '97%',
    alignSelf: 'center',
    zIndex: 9998,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 45,
  },
});
