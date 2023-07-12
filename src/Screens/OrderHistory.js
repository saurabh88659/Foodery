import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyHeader from '../Components/MyHeader';
import Routes from '../Navigation/Routes';
import {COLORS} from '../utils/Colors';
import {
  BASE_URL,
  FontAwesome5Icon,
  IonIcon,
  MaterialIconsIcon,
} from '../utils/Const';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import moment from 'moment';

import OrderhistoryShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/OrderhistoryShimmerPlaceHolder';

export default function OrderHistory({navigation}) {
  const [orderData, setOrderData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [notfound, setNotfound] = useState('');

  console.log('notfound----------', notfound);

  useEffect(() => {
    _Order_History();
  }, []);

  const _Order_History = async () => {
    const token = await _getStorage('token');
    setIsloading(true);
    console.log(token);

    axios
      .get(BASE_URL + `/User/getOrderData`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('order data----------->>', response?.data);

        setOrderData(response?.data?.result);
        setIsloading(false);
      })
      .catch(error => {
        setIsloading(false);
        if (error?.response?.data.message == 'Data Not Founded') {
          setNotfound(error?.response?.data.message);
        }
        console.log(
          'catch error order data ------',
          error.response.data.message,
        );
      });
  };

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

      {notfound ? (
        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.GRAYDARK,
            }}>
            {notfound}
          </Text>
        </View>
      ) : isloading ? (
        <OrderhistoryShimmerPlaceHolder />
      ) : (
        <View>
          <View style={Styles.CONTEXTONEQ}>
            <Text style={Styles.TEXTONEQ}>Delivery preference</Text>
          </View>

          {/* <View style={Styles.BELLBOX}>
            <FontAwesome5Icon title="bell" size={30} IconColor={COLORS.BLACK} />
            <View>
              <Text style={{color: COLORS.BLACK, fontWeight: '500'}}>
                Ring the doorbell
              </Text>
              <Text style={{fontSize: fontPixel(13), color: COLORS.GRAYDARK}}>
                Delivery person will ring the doorbell and{'\n'} leave the order
                at your doorstep
              </Text>
            </View>
            <TouchableOpacity style={Styles.EditBox}>
              <Text style={{color: COLORS.GREEN}}>Edit</Text>
            </TouchableOpacity>
          </View> */}

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '60%'}}
            data={orderData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate(Routes.ORDER_DETAILS, item)}
                style={Styles.MAINBOXORDERIDQ}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontWeight: '500',
                      fontSize: fontPixel(17),
                    }}>
                    {`Order Id ${item?.orderId}`}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color:
                          item?.orderStatus === 'Order Placed'
                            ? 'red'
                            : item?.orderStatus === 'Delivered'
                            ? '#0EC01d'
                            : item?.orderStatus === 'Order Packed'
                            ? '#938'
                            : '#F1C114',
                        fontWeight: '500',
                        backgroundColor: COLORS.LIGHTGREEN,
                        alignSelf: 'center',
                      }}>
                      {item?.orderStatus}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => navigation.navigate(Routes.ORDER_DETAILS)}>
                      <MaterialIconsIcon
                        title={'keyboard-arrow-right'}
                        size={22}
                        IconColor={COLORS.GRAYDARK}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginHorizontal: 10}}>
                  <Text
                    style={{
                      fontSize: fontPixel(14),
                      color: COLORS.GRAYDARK,
                      fontWeight: '500',
                    }}>
                    {`₹ ${item?.totalAmount} | ${moment(
                      item?.delieveredAt,
                    ).format('MMMM Do YYYY')}`}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginVertical: 15,
                    alignItems: 'center',
                  }}>
                  {item?.orderedProducts?.slice(0, 6).map((value, index) => (
                    <View key={index} style={{paddingLeft: 8}}>
                      <Image
                        source={{uri: value?.productId?.productImage}}
                        style={{
                          height: 35,
                          width: 35,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  ))}
                  {item?.orderedProducts?.length > 6 ? (
                    <View
                      style={{
                        paddingVertical: 4,
                        paddingHorizontal: 7,
                        borderRadius: 4,
                        marginLeft: widthPixel(20),
                        borderColor: COLORS.GRAYDARK,
                        alignItems: 'center',
                        borderWidth: 0.5,
                      }}>
                      <Text
                        style={{
                          color: COLORS.GRAYDARK,
                          fontSize: fontPixel(15),
                        }}>
                        {`+ ${item?.orderedProducts?.length - 6}`}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  CONTEXTONEQ: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  TEXTONEQ: {
    fontSize: fontPixel(19),
    fontWeight: '500',
    color: COLORS.BLACK,
    letterSpacing: 0.3,
  },
  BELLBOX: {
    height: heightPixel(80),
    // borderWidth: 1,
    marginHorizontal: 15,
    backgroundColor: COLORS.WHITE,
    elevation: 4,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  EditBox: {
    paddingVertical: 4,
    borderWidth: 1,
    width: widthPixel(60),
    alignItems: 'center',
    borderRadius: 25,
    borderColor: COLORS.GREEN,
  },
  MAINBOXORDERIDQ: {
    height: heightPixel(150),
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 5,
    // elevation: 5,
  },
});
