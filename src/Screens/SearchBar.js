import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

export default function SearchBar() {
  const listTab = [
    {
      Type: 'All',
      name: 'Epic data',
    },
    {
      Type: 'Purple',
      name: 'Epic number',
    },
    {
      Type: 'Green',
      name: 'Epic of To',
    },
  ];

  const data = [
    {
      name: 'ravi',
      Type: 'All',
    },
    {
      name: 'alok',
      Type: 'Purple',
    },
    {
      name: 'dablu',
      Type: 'Green',
    },
    {
      name: 'sona',
      Type: 'All',
    },
    {
      name: 'sali',
      Type: 'Purple',
    },
    {
      name: 'dablu',
      Type: 'Green',
    },
  ];

  const [status, setStatus] = useState('All');
  const [datalist, setDatalist] = useState(data);

  const setStatusFilter = Type => {
    if (Type !== 'All') {
      setDatalist([...data.filter(item => item.Type === Type)]);
    } else {
      setDatalist(data);
    }
    setStatus(Type);
  };

  return (
    <SafeAreaView style={{marginTop: 30, flex: 1, backgroundColor: '#aaa'}}>
      <View
        style={{
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {listTab.map((item, index) => (
          <TouchableOpacity
            onPress={() => setStatusFilter(item.Type)}
            style={{
              backgroundColor: 'red',
              width: 100,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={datalist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              marginTop: 40,
            }}>
            <Text style={{color: 'green'}}>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
