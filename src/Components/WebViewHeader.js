import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../utils/Colors';

const WebViewHeader = ({goBack, title}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GREEN,
    padding: 10,
  },
  backButton: {
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WebViewHeader;
