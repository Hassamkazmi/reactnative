import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../Constant/Colors';

const {height, width} = Dimensions.get('window');
export default function HeroSection() {
  const [data, SetData] = useState([1, 1, 1, 1, 1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: height / 7 + 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex((x / width).toFixed(0));
          }}
          horizontal
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  width: width,
                  height: height / 7 + 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    width: '90%',
                    height: '90%',
                    backgroundColor: '#133630',
                    borderRadius: 10,
                  }}>
                  <View style={styles.slidermain}>
                    <View>
                      <Text style={styles.mainheader}>SELECT TEMPTING</Text>
                      <Text style={styles.secheader}>MEAL OPTIONS</Text>
                      <Text style={styles.sectext}>Schedule to fit your</Text>
                      <Text style={styles.sectext}> lifestyle</Text>
                    </View>
                    <Image
                      style={styles.image}
                      source={require('../Assets/thumb.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: currentIndex == index ? 50 : 8,
                height: currentIndex == index ? 10 : 8,
                borderRadius: currentIndex == index ? 5 : 4,
                backgroundColor: currentIndex == index ? '#133630' : 'gray',
                marginLeft: 5,
              }}></View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  slidermain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: width / 2,
    borderRadius: 5,
  },
  mainheader: {
    fontSize: 16,
    padding: 3,
    fontWeight: '700',
    color: '#ffffff',
  },
  secheader: {
    padding: 3,
    fontWeight: '700',
    color: '#fc2803',
  },
  sectext: {
    padding: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});
