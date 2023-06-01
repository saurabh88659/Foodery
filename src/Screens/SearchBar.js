import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from '../Redux/Action/actionCart';

export default function SearchBar() {
  const dispatch = useDispatch();

  const dataProductItem = useSelector(state => state.cartReducer.count);

  console.log('dataProductItem', dataProductItem);

  const products = [
    {
      id: 1,
      title: 'Samsung S21',
      description: 'black in color',
      price: '2500₹',
      img: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      quantity: 1,
    },
    {
      id: 2,
      title: 'Samsung M21',
      description: 'white in color',
      price: '2300₹',
      img: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      quantity: 1,
    },
    {
      id: 3,
      title: 'Redmi 9',
      description: 'black in color',
      price: '3500₹',
      img: 'https://images-na.ssl-images-amazon.com/images/I/71A9Vo1BatL._SL1500_.jpg',
      quantity: 1,
    },
    {
      id: 4,
      title: 'Iphone 12',
      description: 'Best mobile ever',
      price: '90500₹',
      img: 'https://images-na.ssl-images-amazon.com/images/I/71hIfcIPyxS._SL1500_.jpg',
      quantity: 1,
    },
    {
      id: 5,
      title: 'Samsung S21',
      description: 'black in color',
      price: '2500₹',
      img: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      quantity: 1,
    },
    {
      id: 6,
      title: 'Redmi 9',
      description: 'black in color',
      price: '3500₹',
      img: 'https://images-na.ssl-images-amazon.com/images/I/71A9Vo1BatL._SL1500_.jpg',
      quantity: 1,
    },
    {
      id: 7,
      title: 'Samsung S21',
      description: 'black in color',
      price: '2500₹',
      img: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      quantity: 1,
    },
    {
      id: 8,
      title: 'Iphone 12',
      description: 'Best mobile ever',
      price: '90500₹',
      img: 'https://images-na.ssl-images-amazon.com/images/I/71hIfcIPyxS._SL1500_.jpg',
      quantity: 1,
    },
    {
      id: 9,
      title: 'Samsung S21',
      description: 'black in color',
      price: '2500₹',
      img: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      quantity: 1,
    },
  ];

  const incrementItem = (item) => {
    dispatch(increment(item));
  };

  const decrementItem = (item) => {
    dispatch(decrement(item));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.DarkGreen2,
        paddingVertical: '15%',
      }}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        data={products}
        renderItem={({item, index}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
            }}>
            <Image source={{uri: item.img}} style={{height: 100, width: 100}} />

            <Text style={{color: COLORS.WHITE}}>{item.title}</Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                // backgroundColor: 'red',
              }}>
              <TouchableOpacity
                onPress={decrementItem}
                style={{
                  width: 30,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  borderRadius: 7,
                  right: 5,
                }}>
                <Text style={{fontSize: 30}}>-</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 30,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  borderRadius: 7,
                }}>
                <Text style={{fontSize: 25, color: COLORS.WHITE}}>
                  {/* {dataProductItem} */} 0
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => incrementItem(item)}
                style={{
                  width: 30,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  borderRadius: 7,
                  left: 5,
                }}>
                <Text style={{fontSize: 30}}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={{color: COLORS.WHITE}}>{item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
