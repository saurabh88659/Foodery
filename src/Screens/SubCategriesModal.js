import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import {IonIcon, MaterialIconsIcon, bannerIcon} from '../utils/Const';
import {fontPixel, heightPixel} from '../Components/Dimensions';

export default function SubCategriesModal({navigation}) {
  return (
    <SafeAreaView style={Styles.container}>
      <ImageBackground source={bannerIcon} style={Styles.backgroundImage}>
        <View style={Styles.headericon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcon
              title="arrow-back-outline"
              size={30}
              IconColor={COLORS.WHITE}
            />
          </TouchableOpacity>
          <Text style={Styles.headerTitle}>Cold Drink & Juices</Text>
        </View>
      </ImageBackground>
      <View style={Styles.mainCard}>
        <View style={Styles.cardbox}>
          <Text style={Styles.cardboxTitle}>Top Picks</Text>
          <TouchableOpacity>
            <MaterialIconsIcon
              title="keyboard-arrow-right"
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.cardbox}>
          <Text style={Styles.cardboxTitle}>Soft Drinks</Text>
          <TouchableOpacity>
            <MaterialIconsIcon
              title="keyboard-arrow-right"
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.cardbox}>
          <Text style={Styles.cardboxTitle}>Fruit Juices & Drinks</Text>
          <TouchableOpacity>
            <MaterialIconsIcon
              title="keyboard-arrow-right"
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.cardbox}>
          <Text style={Styles.cardboxTitle}>Non-Alcohol & Energy Drinks</Text>
          <TouchableOpacity>
            <MaterialIconsIcon
              title="keyboard-arrow-right"
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.cardbox}>
          <Text style={Styles.cardboxTitle}>Water</Text>
          <TouchableOpacity>
            <MaterialIconsIcon
              title="keyboard-arrow-right"
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.cardbox}>
          <Text style={Styles.cardboxTitle}>Milk Drinks</Text>
          <TouchableOpacity>
            <MaterialIconsIcon
              title="keyboard-arrow-right"
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.cardbox}>
          <Text style={Styles.cardboxTitle}>Home Grown</Text>
          <TouchableOpacity>
            <MaterialIconsIcon
              title="keyboard-arrow-right"
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>

        <View style={Styles.cardbox}>
          <Text style={Styles.cardboxTitle}>Top Deals</Text>
          <TouchableOpacity>
            <MaterialIconsIcon
              title="keyboard-arrow-right"
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>
        <View style={[Styles.cardbox, {borderColor: COLORS.WHITE}]}>
          <Text style={Styles.cardboxTitle}>Newly Added</Text>
          <TouchableOpacity>
            <MaterialIconsIcon
              title="keyboard-arrow-right"
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: 15,
  },
  headericon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerTitle: {
    paddingLeft: '4%',
    fontSize: fontPixel(21),
    fontWeight: '500',
    letterSpacing: 0.5,
    color: COLORS.WHITE,
  },
  mainCard: {
    // height: heightPixel(600),
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
