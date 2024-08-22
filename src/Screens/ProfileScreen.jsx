import React from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  Image,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MainBtn from '../Common/MainBtn';

const ProfileScreen = () => {
  const [imageUri, setImageUri] = React.useState(null);

  const checkAndRequestGalleryPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    if (hasPermission) {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Gallery Permission',
        message: 'App needs access to your gallery',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const openCamera = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (!hasPermission) {
        Alert.alert('Camera permission denied');
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      cameraType: 'back',
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  const openGallery = async () => {
    const hasPermission = await checkAndRequestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        'Gallery Permission Denied',
        'You need to enable gallery permissions in settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
        {cancelable: false},
      );
      return;
    }

    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Gallery Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <MainBtn title={'Open Camera'} onPress={openCamera} />
      <MainBtn title={'Open Gallery'} onPress={openGallery} />

      {imageUri && (
        <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
