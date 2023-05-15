import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Toast from 'react-native-simple-toast';

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

const SimpleLineIconsIcon = ({title, size, IconColor, IconStyle}) => (
  <SimpleLineIcons
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
};
