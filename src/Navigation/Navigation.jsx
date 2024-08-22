import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import SettingScreen from '../Screens/SettingScreen';
import ListingScreen from '../Screens/ListingScreen';
import GalleryScreen from '../Screens/GalleryScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LogoTitle from '../Component/HeaderLogo';

const Tab = createBottomTabNavigator();

const NavigationComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#730e24',
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'grey',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#730e24',
            padding: 5,
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            borderRadius: 10,
            height: 70,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Fontisto name="player-settings" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Listing"
          component={ListingScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="th-list" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="photo" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationComponent;
