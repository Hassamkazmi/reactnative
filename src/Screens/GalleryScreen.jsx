import React, {useState, useCallback} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import COLORS from '../Constant/Colors';

const GalleryScreen = () => {
  const [filePath, setFilePath] = useState({data: '', uri: ''});
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');

  const handleResponse = useCallback(response => {
    if (response.didCancel) {
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ');
    } else {
      const asset = response.assets && response.assets[0];
      if (asset) {
        setFilePath(asset);
        setFileData(asset.base64 || '');
        setFileUri(asset.uri || '');
      }
    }
  }, []);

  // Using useCallback to prevent re-render loops
  const handleLaunchCamera = useCallback(() => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchCamera(options, handleResponse);
  }, [handleResponse]);

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, handleResponse);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Text style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
            Pick Images from Camera & Gallery
          </Text>
          <View style={styles.ImageSections}>
            <View>
              {fileData ? (
                <Image
                  source={{uri: 'data:image/jpeg;base64,' + fileData}}
                  style={styles.images}
                />
              ) : (
                <Image
                  source={require('../Assets/Logo.png')}
                  style={styles.images}
                />
              )}
              <Text style={{textAlign: 'center'}}>Base 64 String</Text>
            </View>
            <View>
              {fileUri ? (
                <Image source={{uri: fileUri}} style={styles.images} />
              ) : (
                <Image
                  source={require('../Assets/Logo.png')}
                  style={styles.images}
                />
              )}
              <Text style={{textAlign: 'center'}}>File Uri</Text>
            </View>
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity
              onPress={handleLaunchCamera} // Notice this uses the useCallback hook
              style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={chooseImage} style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={chooseImage} style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.primary,
  },

  body: {
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default GalleryScreen;
