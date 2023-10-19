// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import React from 'react';
// import {COLORS} from '../utils/Colors';
// import MyHeaderNo2 from '../Components/MyHeaderNo2';
// import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
// import {EntypoIcon} from '../utils/Const';

// export default function AboutUs({navigation}) {
//   return (
//     <SafeAreaView style={Styles.CONTAINERMAIN}>
//       <MyHeaderNo2 title={'About Us'} onPress={() => navigation.goBack()} />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={Styles.MAINBOX}>
//           <View style={{top: heightPixel(-8)}}>
//             <EntypoIcon
//               title="dot-single"
//               size={35}
//               IconColor={COLORS.PURPLE}
//             />
//           </View>
//           <Text style={Styles.TITLE}>
//             Your orders has been picked up Your orders has been picked up Your
//             orders has been pickedYour orders has been picked up Your orders has
//             been picked up Your orders has been picked Your orders has been
//             picked up Your orders has been picked up Your orders has been
//             pickedYour orders has been picked up Your orders has been picked up
//             Your orders has been picked Your orders has been picked up Your
//             orders has been picked up Your orders has been pickedYour orders has
//             been picked up Your orders has been picked up Your orders has been
//             picked
//           </Text>
//         </View>
//         <View style={Styles.MAINBOX}>
//           <View style={{top: heightPixel(-8)}}>
//             <EntypoIcon
//               title="dot-single"
//               size={35}
//               IconColor={COLORS.PURPLE}
//             />
//           </View>
//           <Text style={Styles.TITLE}>
//             Your orders has been picked up Your orders has been picked up Your
//             orders has been pickedYour orders has been picked up Your orders has
//             been picked up Your orders has been picked Your orders has been
//             picked up Your orders has been picked up Your orders has been
//             pickedYour orders has been picked up Your orders has been picked up
//             Your orders has been picked Your orders has been picked up Your
//             orders has been picked up Your orders has been pickedYour orders has
//             been picked up Your orders has been picked up Your orders has been
//             picked
//           </Text>
//         </View>
//         <View style={Styles.MAINBOX}>
//           <View style={{top: heightPixel(-8)}}>
//             <EntypoIcon
//               title="dot-single"
//               size={35}
//               IconColor={COLORS.PURPLE}
//             />
//           </View>
//           <Text style={Styles.TITLE}>
//             Your orders has been picked up Your orders has been picked up Your
//             orders has been pickedYour orders has been picked up Your orders has
//             been picked up Your orders has been picked Your orders has been
//             picked up Your orders has been picked up Your orders has been
//             pickedYour orders has been picked up Your orders has been picked up
//             Your orders has been picked Your orders has been picked up Your
//             orders has been picked up Your orders has been pickedYour orders has
//             been picked up Your orders has been picked up Your orders has been
//             picked
//           </Text>
//         </View>
//         <View style={Styles.MAINBOX}>
//           <View style={{top: heightPixel(-5)}}>
//             <EntypoIcon
//               title="dot-single"
//               size={35}
//               IconColor={COLORS.PURPLE}
//             />
//           </View>
//           <Text style={Styles.TITLE}>
//             Your orders has been picked up Your orders has been picked up Your
//             orders has been pickedYour orders has been picked up Your orders has
//             been picked up Your orders has been picked Your orders has been
//             picked up Your orders has been picked up Your orders has been
//             pickedYour orders has been picked up Your orders has been picked up
//             Your orders has been picked Your orders has been picked up Your
//             orders has been picked up Your orders has been pickedYour orders has
//             been picked up Your orders has been picked up Your orders has been
//             picked
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const Styles = StyleSheet.create({
//   CONTAINERMAIN: {
//     flex: 1,
//     backgroundColor: COLORS.LIGHT_WHITE,
//   },
//   MAINBOX: {
//     backgroundColor: COLORS.LIGHT_WHITE,
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     paddingVertical: 15,
//     top: 10,
//   },
//   TITLE: {
//     fontSize: fontPixel(16),
//     fontWeight: '400',
//     color: COLORS.BLACK,
//     letterSpacing: 0.4,
//     width: widthPixel(360),
//   },
//   SUBTITLE: {
//     fontSize: fontPixel(16),
//     fontWeight: '500',
//     color: COLORS.GRAYDARK,
//     letterSpacing: 0.5,
//   },
// });

import * as React from 'react';
import {View} from 'react-native';
import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default MyComponent;
