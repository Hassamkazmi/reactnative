import React from 'react';
import {Image} from 'react-native';

const LogoTitle = () => {
  return (
    <Image
      style={{width: 100, height: 50}}
      source={require('../Assets/Logo.png')}
      resizeMode="contain"
    />
  );
};

export default LogoTitle;
