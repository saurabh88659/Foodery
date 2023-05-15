// import React from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
// import { addToWishlist, removeFromWishlist } from './actions';

// const WishlistButton = ({
//   itemId,
//   wishlistItems,
//   addToWishlist,
//   removeFromWishlist,
// }) => {
//   const isItemInWishlist = wishlistItems.includes(itemId);

//   const handleWishlistToggle = () => {
//     if (isItemInWishlist) {
//       removeFromWishlist(itemId);
//     } else {
//       addToWishlist(itemId);
//     }
//   };

//   return (
//     <TouchableOpacity onPress={handleWishlistToggle}>
//       <View style={styles.heartContainer}>
//         {/* Render the heart icon based on wishlist status */}
//         {isItemInWishlist ? (
//           <HeartFilledIcon style={styles.heartIcon} />
//         ) : (
//           <HeartEmptyIcon style={styles.heartIcon} />
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     wishlistItems: state.wishlist.wishlistItems,
//   };
// };

// const mapDispatchToProps = {
//   addToWishlist,
//   removeFromWishlist,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(WishlistButton);

// const styles = StyleSheet.create({
//   heartContainer: {
//     // Add desired styles for the heart icon container
//   },
//   heartIcon: {
//     // Add

import {View, Text} from 'react-native';
import React from 'react';

export default function CartStack() {
  return (
    <View>
      <Text>CartStack</Text>
    </View>
  );
}
