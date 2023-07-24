import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {EntypoIcon} from '../utils/Const';

export default function TermsCondition({navigation}) {
  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeaderNo2
        title={'Terms & Condition'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.MAINBOX}>
          <View style={{top: heightPixel(-8)}}>
            <EntypoIcon
              title="dot-single"
              size={35}
              IconColor={COLORS.PURPLE}
            />
          </View>
          <Text style={Styles.TITLE}>
            Your orders has been picked up Your orders has been picked up Your
            orders has been pickedYour orders has been picked up Your orders has
            been picked up Your orders has been picked Your orders has been
            picked up Your orders has been picked up Your orders has been
            pickedYour orders has been picked up Your orders has been picked up
            Your orders has been picked Your orders has been picked up Your
            orders has been picked up Your orders has been pickedYour orders has
            been picked up Your orders has been picked up Your orders has been
            picked
          </Text>
        </View>
        <View style={Styles.MAINBOX}>
          <View style={{top: heightPixel(-8)}}>
            <EntypoIcon
              title="dot-single"
              size={35}
              IconColor={COLORS.PURPLE}
            />
          </View>
          <Text style={Styles.TITLE}>
            Your orders has been picked up Your orders has been picked up Your
            orders has been pickedYour orders has been picked up Your orders has
            been picked up Your orders has been picked Your orders has been
            picked up Your orders has been picked up Your orders has been
            pickedYour orders has been picked up Your orders has been picked up
            Your orders has been picked Your orders has been picked up Your
            orders has been picked up Your orders has been pickedYour orders has
            been picked up Your orders has been picked up Your orders has been
            picked
          </Text>
        </View>
        <View style={Styles.MAINBOX}>
          <View style={{top: heightPixel(-8)}}>
            <EntypoIcon
              title="dot-single"
              size={35}
              IconColor={COLORS.PURPLE}
            />
          </View>
          <Text style={Styles.TITLE}>
            Your orders has been picked up Your orders has been picked up Your
            orders has been pickedYour orders has been picked up Your orders has
            been picked up Your orders has been picked Your orders has been
            picked up Your orders has been picked up Your orders has been
            pickedYour orders has been picked up Your orders has been picked up
            Your orders has been picked Your orders has been picked up Your
            orders has been picked up Your orders has been pickedYour orders has
            been picked up Your orders has been picked up Your orders has been
            picked
          </Text>
        </View>
        <View style={Styles.MAINBOX}>
          <View style={{top: heightPixel(-5)}}>
            <EntypoIcon
              title="dot-single"
              size={35}
              IconColor={COLORS.PURPLE}
            />
          </View>
          <Text style={Styles.TITLE}>
            Your orders has been picked up Your orders has been picked up Your
            orders has been pickedYour orders has been picked up Your orders has
            been picked up Your orders has been picked Your orders has been
            picked up Your orders has been picked up Your orders has been
            pickedYour orders has been picked up Your orders has been picked up
            Your orders has been picked Your orders has been picked up Your
            orders has been picked up Your orders has been pickedYour orders has
            been picked up Your orders has been picked up Your orders has been
            picked
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_WHITE,
  },
  MAINBOX: {
    backgroundColor: COLORS.LIGHT_WHITE,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    top: 10,
  },
  TITLE: {
    fontSize: fontPixel(16),
    fontWeight: '400',
    color: COLORS.BLACK,
    letterSpacing: 0.4,
    width: widthPixel(360),
  },
  SUBTITLE: {
    fontSize: fontPixel(16),
    fontWeight: '500',
    color: COLORS.GRAYDARK,
    letterSpacing: 0.5,
  },
});

// import React, {useState} from 'react';
// import {View, Text, Button} from 'react-native';
// import {COLORS} from '../utils/Colors';

// const YourComponent = () => {
//   // Sample dynamic data with different types and data (replace with your actual data)

//   const dynamicData = [
//     {id: 1, type: 'Type 1', data: 'Type 1 Data'},
//     {id: 2, type: 'Type 2', data: 'Type 2 Data'},
//     {id: 3, type: 'Type 3', data: 'Type 3 Data'},
//     // Add more data objects as needed
//   ];

//   const [selectedType, setSelectedType] = useState(dynamicData[0].id); // Set the initial selected type to the first type

//   // Function to handle the click on each type
//   const handleTypeClick = typeId => {
//     setSelectedType(typeId);
//   };

//   // Get the selected data object based on the selected type
//   const selectedData = dynamicData.find(item => item.id === selectedType);

//   return (
//     <View style={{marginVertical: 50}}>
//       {/* Buttons to select the type */}

//       {dynamicData.map(item => (
//         <Button
//           key={item.id}
//           title={item.type}
//           onPress={() => handleTypeClick(item.id)}
//           disabled={selectedType === item.id} // Disable the button if it's already selected
//         />
//       ))}

//       {/* Display the data based on the selected type */}
//       {selectedData && (
//         <View>
//           <Text
//             style={{
//               color: COLORS.BLACK,
//             }}>{`Selected Type: ${selectedData.type}`}</Text>
//           <Text
//             style={{
//               color: COLORS.BLACK,
//             }}>{`Data: ${selectedData.data}`}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default YourComponent;
