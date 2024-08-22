import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CategorySection = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          alignItems: 'center',
          paddingTop: 30,
        }}>
        CategorySection
      </Text>
    </View>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
});
