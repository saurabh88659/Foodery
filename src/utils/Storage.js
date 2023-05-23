import AsyncStorage from '@react-native-async-storage/async-storage';

const _setStorage = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

const _getStorage = async key => {
  const data = await AsyncStorage.getItem(key);
  console.log('key---------->>>>>', key);
  console.log('data--->>', data);
  if (data) {
    return JSON.parse(data);
  } else return null;
};

export {_setStorage, _getStorage};
