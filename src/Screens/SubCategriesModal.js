import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
import {BASE_URL, IonIcon, MaterialIconsIcon, bannerIcon} from '../utils/Const';
import {fontPixel, heightPixel} from '../Components/Dimensions';
import Routes from '../Navigation/Routes';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import SubCategoryPlaceHolder from '../Components/ShimmerPlaceHolder/SubCategoryPlaceHolder';
// import {BackHandler} from 'react-native';

export default function SubCategriesModal({navigation, route}) {
  const itemAll = route.params;
  const IsFocused = useIsFocused();
  const [subCategoriesById, setSubCategoriesById] = useState([]);
  const [errorNotFound, setErrorNotFound] = useState('');
  const [state, setState] = useState({
    isLoading: false,
  });

  useEffect(() => {
    if (IsFocused) {
      _SubcategoryById();
    }
  }, [IsFocused]);

  const _SubcategoryById = async () => {
    const token = await _getStorage('token');
    setState({
      ...state,
      isLoading: true,
    });
    axios
      .get(BASE_URL + `/User/getAllSubCategory1/${itemAll._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('SubCategory_By_ID----->>', response?.data?.getAll);
        setSubCategoriesById(response?.data?.getAll);
        setState({
          ...state,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(
          'SubCategory_By_Id Catch error',
          error?.response?.data?.message,
        );
        setState({
          ...state,
          isLoading: false,
        });
        if (error?.response?.data?.message == 'Data Not Founded') {
          setErrorNotFound(error?.response?.data?.message);
        }
      });
  };

  // useEffect(() => {
  //   // Add event listener for the back button
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackPress,
  //   );

  //   // Clean up the event listener on component unmount
  //   return () => backHandler.remove();
  // }, []);

  // const handleBackPress = () => {
  //   navigation.goBack();
  //   // Your custom logic here
  //   // For example, you can show a confirmation dialog before navigating back
  //   // and prevent the default back behavior by returning true.

  //   // If you want to navigate back normally, return false.
  //   return false;
  // };

  return (
    <SafeAreaView style={Styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingVertical: 10}}>
        <ImageBackground
          source={{uri: itemAll.categoryBanner}}
          style={Styles.backgroundImage}>
          <View style={Styles.headericon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcon
                title="arrow-back-outline"
                size={30}
                IconColor={COLORS.WHITE}
              />
            </TouchableOpacity>
            <Text style={Styles.headerTitle}>{itemAll.categoryName}</Text>
          </View>
        </ImageBackground>
        {state.isLoading ? (
          <SubCategoryPlaceHolder />
        ) : errorNotFound ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: heightPixel(300),
            }}>
            <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
              {errorNotFound}
            </Text>
          </View>
        ) : (
          <Animated.View style={Styles.mainCard}>
            {subCategoriesById.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Routes.PRODUCT_ITEM, {
                    item: item,
                    categoryId: itemAll._id,
                  })
                }
                key={index}
                activeOpacity={0.6}
                style={Styles.cardbox}>
                <Text style={Styles.cardboxTitle}>{item?.subCategoryName}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Routes.PRODUCT_ITEM, {
                      item: item,
                      categoryId: itemAll._id,
                    })
                  }
                  activeOpacity={0.6}>
                  <MaterialIconsIcon
                    title="keyboard-arrow-right"
                    size={22}
                    IconColor={COLORS.GRAYDARK}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  backgroundImage: {
    height: heightPixel(200),
    justifyContent: 'center',
  },
  headericon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.grayWithOpacity,
    height: heightPixel(200),
    paddingHorizontal: 15,
  },
  headerTitle: {
    paddingLeft: '4%',
    fontSize: fontPixel(25),
    fontWeight: '900',
    letterSpacing: 0.5,
    color: COLORS.WHITE,
  },
  mainCard: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 15,
    marginTop: '-10%',
    borderRadius: 4,
    elevation: 10,
  },
  cardbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    marginHorizontal: 15,
    borderColor: COLORS.GRAYDARK,
  },
  cardboxTitle: {
    fontSize: fontPixel(18),
    fontWeight: '500',
    letterSpacing: 0.5,
    color: COLORS.BLACK,
  },
});
