import React, {useRef} from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../Components/Header';
import {getCloser} from '../Components/utils';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';

const {diffClamp} = Animated;
const headerHeight = 58 * 2;

export default function HomeScreen() {
  const ref = useRef(null);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  const translateYNumber = useRef();

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const handleSnap = ({nativeEvent}) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight / 2
      )
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
            -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };

  const firstNames = [
    {
      name: 'Ravi gupta',
    },
    {
      name: 'Ravi gupta',
    },

    {
      name: 'Ravi gupta',
    },
    {
      name: 'Ravi gupta',
    },

    {
      name: 'Ravi gupta',
    },

    {
      name: 'Ravi gupta',
    },

    {
      name: 'Ravi gupta',
    },
    {
      name: 'Ravi gupta',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <Header {...{headerHeight}} />
      </Animated.View>

      {/* <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <View
          style={[
            styles.headercontainerstyles,
            {backgroundColor: COLORS.WHITE, top: '40%'},
          ]}>
          <Text
            style={[
              styles.headertext,
              {color: COLORS.BLACK, fontSize: fontPixel(18)},
            ]}>
            Bestsellers
          </Text>
          <Text
            style={[
              styles.headertext,
              {color: COLORS.GRAY, fontSize: fontPixel(15)},
            ]}>
            See ALL
          </Text>
        </View>
      </Animated.View> */}

      <Animated.FlatList
        scrollEventThrottle={16}
        // showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: headerHeight,
          backgroundColor: 'red',
          height: heightPixel(500),
          marginTop: 100,
        }}
        onScroll={handleScroll}
        horizontal
        ref={ref}
        onMomentumScrollEnd={handleSnap}
        data={firstNames}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <View style={styles.headercontainerstyles}>
              <View
                style={{
                  backgroundColor: COLORS.WHITE,
                  height: 130,
                  width: 135,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 10,
                  borderRadius: 8,
                  alignSelf: 'center',
                }}>
                <Image
                  source={require('../Assets/Logo/laysicone.png')}
                  style={{height: 80, width: 80}}
                />
              </View>
              <Text style={{color: COLORS.BLACK, marginTop: 5}}>
                Lay's Logo Potato chip Frito-Lay Brand
              </Text>
              <Text style={{color: COLORS.BLACK}}>2Kg</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: COLORS.BLACK}}>₹ 46</Text>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    width: widthPixel(75),
                    borderWidth: 1,
                    borderColor: COLORS.GREEN,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 7,
                  }}>
                  <Text style={{color: COLORS.GREEN}}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <Text style={{color: COLORS.BLACK, marginTop: 5}}>
        Lay's Logo Potato chip Frito-Lay Brand
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  subHeader: {
    height: headerHeight / 2,
    width: '100%',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 30,
  },
  headercontainerstyles: {
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    width: widthPixel(150),
  },
  headertext: {
    color: COLORS.BLACK,
    fontWeight: '500',
  },
});
