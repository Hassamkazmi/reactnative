import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../Constant/Colors';
const MainBtn = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.font}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.main,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  font: {
    color: COLORS.white,
  },
});

export default MainBtn;
