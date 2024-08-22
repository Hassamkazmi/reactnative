import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {SendDirectSms} from 'react-native-send-direct-sms';

export default function SettingScreen() {
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [bodySMS, setBodySMS] = React.useState('Hello World');

  async function requestSmsPermissions() {
    try {
      const sendSmsGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'SMS Permission',
          message: 'This app needs access to send SMS messages.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (sendSmsGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        return false;
      }

      const receiveSmsGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      );

      if (receiveSmsGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        return false;
      }

      const readSmsGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );

      if (readSmsGranted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  async function sendSmsData(mobileNumber, bodySMS) {
    const hasPermission = await requestSmsPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'You need to grant SMS permissions in Settings to send messages.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
      return;
    }

    SendDirectSms(mobileNumber, bodySMS)
      .then(res => console.log('SMS sent successfully:', res))
      .catch(err => console.log('Error sending SMS:', err));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextsmall}>Enter Recipient's Number</Text>
      <TextInput
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder={'Enter Mobile Number'}
        keyboardType="numeric"
        style={styles.textInput}
      />
      <Text style={styles.titleTextsmall}>Enter SMS Body</Text>
      <TextInput
        value={bodySMS}
        onChangeText={setBodySMS}
        placeholder={'Enter SMS body'}
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => sendSmsData(mobileNumber, bodySMS)}>
        <Text style={styles.sendButtonLabel}>Send SMS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  sendButtonLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  sendButton: {
    width: '100%',
    backgroundColor: '#22C674',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 30,
  },
  titleTextsmall: {
    marginBottom: 8,
    marginTop: 16,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  textInput: {
    paddingLeft: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#3F44511F',
    borderRadius: 4,
    height: 44,
    color: '#000000',
    width: '100%',
  },
});
