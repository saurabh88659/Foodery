import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {createRef} from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';
import {useSelector} from 'react-redux';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Button from '../Components/Button';
import {IonIcon, LATITUDE_DELTA, LONGITUDE_DELTA} from '../utils/Const';
import ActionSheet from 'react-native-actions-sheet';
import {TextInput} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';

export default function AddressScreenWithMap({navigation}) {
  const Locations = useSelector(state => state.locationReducer);
  const [text, setText] = React.useState('');
  console.log(Locations, 'Locations');

  const actionSheetRef = createRef(false);

  const toggleBottomNavigationView = () => {
    actionSheetRef?.current?.setModalVisible(true);
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeaderNo2
        title={'Choose Your Address'}
        onPress={() => navigation.goBack()}
      />
      <View style={Styles.MAPBOX}>
        {Locations && (
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: Locations.latitude,
              longitude: Locations.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
              // latitudeDelta: 0.0922,
              // longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            provider="google">
            <Marker
              coordinate={{
                latitude: Locations.latitude,
                longitude: Locations.longitude,
              }}
              // title={address}
            />
          </MapView>
        )}
      </View>
      <View style={Styles.BOXNUMBEROF2}>
        <Text style={Styles.TITLEPR}>Your Locations</Text>
        <View style={Styles.BOXLOACTIONS}>
          <View style={Styles.ICONEBOXLOACTIONS}>
            <IonIcon
              title="ios-location-sharp"
              size={40}
              IconColor={COLORS.GREEN}
            />
          </View>
          <Text style={Styles.SUBTITLELOCATIONS}>
            Ravi rai noida kickr tech Ravi rai noida kickr tech Ravi rai noida
          </Text>
        </View>
        <View style={{marginVertical: '2%'}}>
          <Button
            title={'Enter complete address'}
            onPress={toggleBottomNavigationView}
          />
        </View>
      </View>

      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          height: heightPixel(400),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.WHITE,
        }}
        indicatorColor={'#7484'}
        headerAlwaysVisible
        closeOnPressBack
        gestureEnabled
        indicatorStyle={{
          height: 5,
          backgroundColor: COLORS.GRAYDARK,
        }}>
        <View style={{flex: 1}}>
          <View style={Styles.BOXLOACTIONS}>
            <View style={Styles.ICONEBOXLOACTIONS}>
              <IonIcon
                title="ios-location-sharp"
                size={40}
                IconColor={COLORS.GREEN}
              />
            </View>
            <Text style={Styles.SUBTITLELOCATIONS}>
              Ravi rai noida kickr tech Ravi rai noida kickr tech Ravi rai noida
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              label="Flat /Building /Street"
              value={text}
              textColor={COLORS.BLACK}
              activeOutlineColor={COLORS.BLACK}
              mode="outlined"
              onChangeText={text => setText(text)}
              style={{marginHorizontal: 10}}
              outlineStyle={{
                borderWidth: 1,
                borderColor: COLORS.GREEN,
                borderRadius: 10,
              }}
            />
            <TextInput
              label="Name"
              value={text}
              textColor={COLORS.BLACK}
              activeOutlineColor={COLORS.BLACK}
              mode="outlined"
              onChangeText={text => setText(text)}
              style={{marginHorizontal: 10, marginVertical: '5%'}}
              outlineStyle={{
                borderWidth: 1,
                borderColor: COLORS.GREEN,
                borderRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginHorizontal: 10,
            }}>
            <View
              style={{
                // borderWidth: 1,
                paddingVertical: 4,
                width: widthPixel(60),
                backgroundColor: 'red',
                alignItems: 'center',
                borderColor: COLORS.GREEN,
                borderRadius: 7,
              }}>
              <Text style={{color: COLORS.WHITE, fontWeight: '500'}}>
                Office
              </Text>
            </View>
            <View
              style={{
                // borderWidth: 1,
                paddingVertical: 4,
                width: widthPixel(60),
                backgroundColor: 'red',
                alignItems: 'center',
                borderColor: COLORS.GREEN,
                borderRadius: 7,
                marginLeft: '3%',
              }}>
              <Text style={{color: COLORS.WHITE, fontWeight: '500'}}>
                Office
              </Text>
            </View>
            <View
              style={{
                // borderWidth: 1,
                paddingVertical: 4,
                width: widthPixel(60),
                backgroundColor: 'red',
                alignItems: 'center',
                borderColor: COLORS.GREEN,
                borderRadius: 7,
                marginLeft: '3%',
              }}>
              <Text style={{color: COLORS.WHITE, fontWeight: '500'}}>
                Office
              </Text>
            </View>
          </View>

          {/* <View style={{}}>
            <Button
              title={'Enter complete address'}
              onPress={toggleBottomNavigationView}
            />
          </View> */}
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  MAPBOX: {
    marginTop: 10,
    height: heightPixel(600),
    backgroundColor: COLORS.GREEN,
    elevation: 9,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  BOXNUMBEROF2: {
    marginHorizontal: 10,
    height: heightPixel(200),
    // borderWidth: 1,
    flex: 1,
    elevation: 3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // marginTop: '1%',
  },
  TITLEPR: {
    color: COLORS.BLACK,
    marginTop: 15,
    fontWeight: '500',
    fontSize: fontPixel(18),
    paddingLeft: 10,
  },
  BOXLOACTIONS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    marginHorizontal: 10,
  },
  ICONEBOXLOACTIONS: {
    height: heightPixel(70),
    width: widthPixel(70),
    borderRadius: 10,
    backgroundColor: COLORS.LIGHT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SUBTITLELOCATIONS: {
    paddingLeft: 10,
    color: COLORS.BLACK,
    fontWeight: '400',
    width: widthPixel(300),
    textAlign: 'left',
  },
});
