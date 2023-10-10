import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {SimpleToast} from '../Const';
import axios from 'axios';

export const checkInternetConnection = () => {
  return new Promise(resolve => {
    if (Platform.OS === 'android') {
      // For Android devices
      NetInfo.fetch().then(state => {
        // console.log(state);
        resolve(state.isInternetReachable);
      });
    } else {
      // For iOS devices
      const unsubscribe = NetInfo.addEventListener(state => {
        unsubscribe();
        resolve(state.isInternetReachable);
      });
    }
  });
};

export const Instance = async (method, url, header, data) => {
  const isInternet = await checkInternetConnection();
  console.log('isInternet', isInternet);
  if (isInternet) {
    try {
      const result = await axios({
        method: method,
        url: url,
        headers: header,
        data: data,
      });
      return result;
    } catch (e) {
      return e;
    }
  } else {
    SimpleToast({title: 'No Internet Connection!', isLong: true});
  }
};
