import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Toast from 'react-native-simple-toast';
// import Toast from 'react-native-toast-message';
import {MMKV} from 'react-native-mmkv';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

// DESCRIBING SOME STATIC IMAGE

const userIconHome = require('../Assets/Logo/user.png');
const createaccountTOPImage = require('../Assets/Logo/Organetopshape.png');
const BottonBackGroundimage = require('../Assets/Logo/Bottonimage.png');
const googlelog = require('../Assets/Logo/googlepluslogo.png');
const facebooklogo = require('../Assets/Logo/facebooklogo.png');
const bannerIcon = require('../Assets/Logo/bannerIcon.jpg');
const shoppingbagIcon = require('../Assets/Logo/shoppingbagIcon.png');
const shoppingcartIcon = require('../Assets/Logo/shoppingcartIcon.png');
const Floatingicon = require('../Assets/Logo/Floatingicon.png');
const Footerbanner1 = require('../Assets/Logo/Footerbanner1.jpg');
const generousvegetablicon = require('../Assets/Logo/generousvegetablicon.png');
const OrderHistoryicon = require('../Assets/Logo/OrderHistoryicon.jpg');
const Wishlisticon = require('../Assets/Logo/Wishlisticon.jpg');
const carticon = require('../Assets/Logo/carticon.jpg');
const notificationIcon = require('../Assets/Logo/notificationIcon.jpg');
const UpcomminIcon = require('../Assets/Logo/UpcomminIcon.jpg');
const RateIconreview = require('../Assets/Logo/RateIconreview.jpg');
const LogoutIcon = require('../Assets/Logo/LogoutIcon.jpg');
const TermsCondition = require('../Assets/Logo/TermsCondition.jpg');
const PrivacyPolicyIcon = require('../Assets/Logo/PrivacyPolicy.jpg');
const cartemptyIcon = require('../Assets/Lottiejson/112087-empty.json');
const Yourordericonebox = require('../Assets/Logo/donation.png');
const yourirdercallsicon = require('../Assets/Logo/callsicon.png');
const Down_Arrow = require('../Assets/Logo/3d02.png');
const Up_Arrow = require('../Assets/Logo/UpDown.png');
const deliveryBoyjson = require('../Assets/Lottiejson/90553-delivery-boy.json');

const BASE_URL = 'http:/192.168.68.185:8000/api'; //  Server URL  Localhost

// AIzaSyChkQstsYAs6SgA0d4UIIBnhXfK_wf0iV4?
const MAP_API_KEY = 'AIzaSyChkQstsYAs6SgA0d4UIIBnhXfK_wf0iV4'; // Map key here
const storage = new MMKV();

// 👇👇👇 DATA for mapView 👇👇👇

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// DESCRIBING REACT NATIVE VECTOR ICONS FOR FUTURE USE

const IonIcon = ({title, size, IconColor, IconStyle}) => (
  <Ionicons
    name={title}
    size={size}
    color={IconColor}
    style={IconStyle || {}}
  />
);
const FoundationIcon = ({title, size, IconColor, IconStyle}) => (
  <Foundation
    name={title}
    size={size}
    color={IconColor}
    style={IconStyle || {}}
  />
);

const FontAwesomeIcon = ({title, size, IconColor, IconStyle}) => (
  <FontAwesome
    name={title}
    size={size}
    color={IconColor}
    style={IconStyle || {}}
  />
);
const EvilIconsIcon = ({title, size, IconColor, IconStyle}) => (
  <EvilIcons
    name={title}
    size={size}
    color={IconColor}
    style={IconStyle || {}}
  />
);
const FontAwesome5Icon = ({title, size, IconColor, IconStyle}) => (
  <FontAwesome5
    name={title}
    size={size}
    color={IconColor}
    style={IconStyle || {}}
  />
);

const EntypoIcon = ({title, size, IconColor, IconStyle}) => (
  <Entypo name={title} size={size} color={IconColor} style={IconStyle || {}} />
);
const MaterialIconsIcon = ({title, size, IconColor, IconStyle}) => (
  <MaterialIcons
    name={title}
    size={size}
    color={IconColor}
    style={IconStyle || {}}
  />
);

const MaterialCommunityIconsTwo = ({title, size, IconColor, IconStyle}) => (
  <MaterialCommunityIcons
    name={title}
    size={size}
    color={IconColor}
    style={IconStyle || {}}
  />
);

const SimpleLineIconsIcon = ({title, size, IconColor, IconStyle}) => (
  <SimpleLineIcons
    name={title}
    size={size}
    color={IconColor}
    style={IconStyle || {}}
  />
);
const OcticonsIcon = ({title, size, IconColor, IconStyle}) => (
  <Octicons
    name={title}
    size={size}
    color={IconColor}
    style={IconStyle || {}}
  />
);

//👇👇👇 DESCRIBING TOAST COMPONENT 👇👇👇

const SimpleToast = ({title, isLong}) => {
  isLong ? Toast.show(title, Toast.LONG) : Toast.show(title, Toast.SHORT);
};

// const ShowToastMeassge =({title, isLong})=>{

// }

export {
  userIconHome,
  createaccountTOPImage,
  BottonBackGroundimage,
  googlelog,
  facebooklogo,
  IonIcon,
  FoundationIcon,
  bannerIcon,
  FontAwesomeIcon,
  shoppingbagIcon,
  shoppingcartIcon,
  EvilIconsIcon,
  FontAwesome5Icon,
  MaterialIconsIcon,
  SimpleLineIconsIcon,
  Floatingicon,
  EntypoIcon,
  Footerbanner1,
  generousvegetablicon,
  SimpleToast,
  OrderHistoryicon,
  Wishlisticon,
  carticon,
  notificationIcon,
  UpcomminIcon,
  RateIconreview,
  LogoutIcon,
  TermsCondition,
  PrivacyPolicyIcon,
  MaterialCommunityIconsTwo,
  OcticonsIcon,
  BASE_URL,
  storage,
  LONGITUDE_DELTA,
  LATITUDE_DELTA,
  MAP_API_KEY,
  cartemptyIcon,
  Yourordericonebox,
  yourirdercallsicon,
  Down_Arrow,
  Up_Arrow,
  deliveryBoyjson,
};
