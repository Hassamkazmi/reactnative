import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import HeroSection from '../Component/HeroSection';
import CategorySection from '../Component/CategorySection';
import ProductItem from '../Component/ProductItem';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeroSection />
        <CategorySection />
        <ProductItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021b17',
  },
});
