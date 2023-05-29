import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import MyHeader from '../Components/MyHeader';
import {COLORS} from '../utils/Colors';
import Lottie from 'lottie-react-native';
import {heightPixel} from '../Components/Dimensions';

export default function Offersscreen({navigation}) {
  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeader title={'Offers'} onPress={() => navigation.goBack()} />
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Lottie
          source={require('../Assets/Lottiejson/113096-coming-soon.json')}
          autoPlay
          loop={true}
          style={{height: heightPixel(200)}}
        />
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_WHITE,
  },
});

// import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
// import React, {useState} from 'react';

// const TAB_ID_FIRST = 0;
// const TAB_ID_SECOND = 1;

// export const NotificationTabConstants = [
//   {
//     id: 0,
//     title: 'First Tab',
//   },
//   {
//     id: 1,
//     title: 'Second Tab',
//   },
// ];

// const data = [
//   {
//     name: 'First Tab Data',
//     type: 0,
//   },
//   {
//     name: 'dablu',
//     type: 1,
//   },
//   {
//     name: 'First Tab Data something',
//     type: 0,
//   },
//   {
//     name: 'Ravi',
//     type: 1,
//   },
// ];

// const Offersscreen = () => {
//   const [selectedTabId, setSelectedId] = useState(0);

//   return (
//     <View style={{backgroundColor: 'grey', flex: 1}}>
//       <View>
//         <ScrollView
//           // style={{backgroundColor: "red",  }}
//           horizontal
//           contentContainerStyle={{
//             backgroundColor: 'green',
//             alignContent: 'center',
//           }}
//           showsHorizontalScrollIndicator={false}>
//           {NotificationTabConstants.map((item, index) => (
//             <MTab
//               setSelectedId={setSelectedId}
//               index={index}
//               data={item}
//               key={`tab_${item.id}`}
//             />
//           ))}
//         </ScrollView>
//         <FirstTab selectedTabId={selectedTabId} itemData={data} />
//         <SecondTab selectedTabId={selectedTabId} itemData={data} />
//       </View>
//     </View>
//   );
// };

// const MTab = ({data, setSelectedId}) => {
//   const {id, title} = data;

//   const onPressTab = () => {
//     setSelectedId(id);
//   };
//   return (
//     <View style={{marginVertical: 100}}>
//       <TouchableOpacity
//         onPress={onPressTab}
//         style={{
//           paddingHorizontal: 20,
//           paddingVertical: 10,
//           backgroundColor: 'red',
//           marginHorizontal: 10,
//           borderRadius: 10,
//         }}>
//         <Text style={{color: 'black', fontSize: 20}}>{title}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const FirstTab = ({selectedTabId, itemData}) => {
//   if (selectedTabId === 0) return null;
//   return (
//     <View>
//       <FlatList
//         data={itemData}
//         renderItem={({item}) => (
//           <>
//             {item.type !== selectedTabId ? null : (
//               <View>
//                 <Text style={{color: 'black', fontSize: 20}}>{item.name}</Text>
//               </View>
//             )}
//           </>
//         )}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// const SecondTab = ({selectedTabId, itemData}) => {
//   if (selectedTabId === 1) return null;
//   return (
//     <View>
//       <FlatList
//         data={itemData}
//         renderItem={({item}) => (
//           <>
//             {item.type !== selectedTabId ? null : (
//               <View>
//                 <Text style={{color: 'black', fontSize: 20}}>{item.name}</Text>
//               </View>
//             )}
//           </>
//         )}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// export default Offersscreen;
