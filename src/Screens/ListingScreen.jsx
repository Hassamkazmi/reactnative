import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const checkLocationPermission = async () => {
  try {
    const permissionStatus = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return permissionStatus;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const requestLocationPermission = async () => {
  const hasPermission = await checkLocationPermission();
  if (hasPermission) {
    console.log('You can use Geolocation');
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    console.log('granted', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use Geolocation');
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Location Permission Denied',
        'You need to allow location permission in settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
        {cancelable: false},
      );
      return false;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const ListingScreen = () => {
  const [location, setLocation] = useState(false);
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };
  const sendLocation = () => {
    try {
      if (location) {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const message = `Latitude: ${latitude}, Longitude: ${longitude}`;
        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(err => {
          console.error('Failed to open WhatsApp', err);
          Alert.alert(
            'WhatsApp not installed',
            'Please install WhatsApp to share your location.',
          );
        });
      } else {
        Alert.alert('No Location Data', 'Please get your location first.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <Text style={styles.text}>
        Latitude: {location ? location.coords.latitude : null}
      </Text>
      <Text style={styles.text}>
        Longitude: {location ? location.coords.longitude : null}
      </Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Send Location" onPress={sendLocation} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
});
export default ListingScreen;
