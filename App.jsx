import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import NavigationComponent from './src/Navigation/Navigation';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } catch (error) {
      console.error('Failed to request user permission:', error);
    }
  }

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  };

  useEffect(() => {
    requestUserPermission();
    getToken();

    // Foreground message handler
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Handle the foreground notification here (e.g., show a local notification)
    });

    // Background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'A new FCM message arrived in the background!',
        JSON.stringify(remoteMessage),
      );
      // Handle the background notification here (e.g., show a local notification)
    });

    // Check if the app was opened by tapping on a notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });

    return () => {
      // Clean up the foreground message handler
      unsubscribeOnMessage();
    };
  }, []);

  return <NavigationComponent />;
};

export default App;

const styles = StyleSheet.create({});
