import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '@src/screens/HomeScreen';
import NotificationScreen from '@src/screens/NotificationScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import SearchScreen from '@src/screens/SearchScreen';
import theme from '@src/styles/theme';
import BannerAdView from '@src/components/atoms/BannerAdView';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const colors = theme.useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      const {NativeModules} = require('react-native');
      NativeModules.AndroidKeyboardAdjust?.setAdjustPan();
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            height: 60,
          },
          tabBarActiveTintColor: colors.primaryText,
          tabBarInactiveTintColor: colors.primaryText,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={colors.primaryText}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'notifications' : 'notifications-outline'}
                size={24}
                color={colors.primaryText}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'search' : 'search-outline'}
                size={24}
                color={colors.primaryText}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                size={24}
                color={colors.primaryText}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <BannerAdView />
      </View>
    </View>
  );
};

export default TabNavigator;
