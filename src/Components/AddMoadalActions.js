import React from 'react';
import {View, StyleSheet} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {heightPixel, widthPixel} from './Dimensions';
import {COLORS} from '../utils/Colors';

const AddMoadalActions = props => {
  return (
    <ActionSheet
      ref={props.actionSheetRef}
      containerStyle={{
        height: heightPixel(600),
        width: widthPixel(390),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE,
      }}
      indicatorColor={'#7484'}
      headerAlwaysVisible
      closeOnPressBack
      gestureEnabled
      indicatorStyle={{
        height: 5,
        backgroundColor: COLORS.GRAYDARK,
      }}>
      <View>{props.children}</View>
    </ActionSheet>
  );
};

export default AddMoadalActions;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 100,
  },
});
