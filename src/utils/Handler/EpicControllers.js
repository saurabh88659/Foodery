import {BASE_URL, headerConfig} from '../Const';
import {Instance} from './InternetInfo';

export const _getProfile = async () => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  try {
    const result = await Instance('GET', BASE_URL + '/User/getProfile', header);
    return result;
  } catch (e) {
    return e;
  }
};

export const _first_banner = async () => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/getAllBanner',
      header,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getcategorylist = async () => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/getAllcategorylist',
      header,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getcategorylistone = async () => {
  const header = await headerConfig();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/getAllcategorylist1',
      header,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _freshProductlist = async () => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/freshProductlist',
      header,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _nutdryProduct = async () => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/nutdryProductlist',
      header,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getTranding = async () => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/getTrandingProduct',
      header,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getmightmissed = async () => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  try {
    const result = await Instance('GET', BASE_URL + '/getAllshowCarts', header);
    return result;
  } catch (e) {
    return e;
  }
};

export const _getcreatpayment = async data => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  console.log('epic data----->>>', data);

  try {
    const result = await Instance(
      'POST',
      BASE_URL + '/payG/createOrder',
      header,
      data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getorderDetailorderkey = async id => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  console.log('epic data----->>>', id);

  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/payG/orderDetail/' + id,
      header,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getaddorder = async data => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  console.log('epic data----->>>', data);

  try {
    const result = await Instance('POST', BASE_URL + '/addOrder', header, data);
    return result;
  } catch (e) {
    return e;
  }
};

export const _postcoordinates = async data => {
  const header = await headerConfig();
  console.log('header--DG->>', header);
  console.log('epic data----->>>', data);

  try {
    const result = await Instance(
      'PUT',
      BASE_URL + '/User/updateCoordinates',
      header,
      data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getorderhistory = async data => {
  const header = await headerConfig();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/getOrderData',
      header,
      // data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getorderDetails = async id => {
  const header = await headerConfig();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/getOneOrderData/' + id,
      header,
      // data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getSimmilarProduct = async id => {
  const header = await headerConfig();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/getSimmilarProductByCatId/' + id,
      header,
      // data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getfreshProduct = async id => {
  const header = await headerConfig();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/freshProductlist',
      header,
      // data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getnutdryProductlist = async id => {
  const header = await headerConfig();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/nutdryProductlist',
      header,
      // data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

export const _getgetSimmilarProducnuts = async id => {
  const header = await headerConfig();
  try {
    const result = await Instance(
      'GET',
      BASE_URL + '/User/getSimmilarProductByCatId/' + id,
      header,
      // data,
    );
    return result;
  } catch (e) {
    return e;
  }
};

// export const _getorderdetails = async id => {
//   const header = await headerConfig();
//   console.log('header--DG->>', header, id);
//   try {
//     const result = await Instance(
//       'GET',
//       BASE_URL + '/User/getOneOrderData/' + id,
//       header,
//     );
//     return result;
//   } catch (e) {
//     return e;
//   }
// };
