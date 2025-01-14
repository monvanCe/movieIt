import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '@src/screens/HomeScreen';
import NotificationScreen from '@src/screens/NotificationScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import SearchScreen from '@src/screens/SearchScreen';
import {Provider} from 'react-redux';
import {store, useAppSelector} from '@src/store/store';
import {useAuth} from '@src/hooks/useAuth';
import {
  loadAppConfig,
  loadLanguage,
  loadTheme,
} from '@src/store/actions/appConfigActions';
import {appTheme} from '@src/const/enums';
import theme, {themes} from '@src/styles/theme';
import {
  initializeNotifications,
  setNotificationCallback,
} from './src/utils/notification';
import useNotification from '@src/hooks/useNotification';

const Tab = createBottomTabNavigator();

function AppLayout() {
  const {updateByNotification} = useNotification();
  const {login} = useAuth();
  const currentTheme = useAppSelector(state => state.appConfig.appTheme);
  const colors = themes[currentTheme];
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      StatusBar.setBarStyle(
        currentTheme === appTheme.Light ? 'dark-content' : 'light-content',
      );
      StatusBar.setBackgroundColor(colors.background);
    });
  }, [currentTheme]);

  useEffect(() => {
    const loadApp = async () => {
      await login();
      await loadTheme();
      await loadLanguage();
      await loadAppConfig();
    };

    loadApp().then(() => {
      setIsAppLoaded(true);
    });
  }, []);

  useEffect(() => {
    initializeNotifications();
  }, []);

  useEffect(() => {
    setNotificationCallback(updateByNotification);

    return () => {
      setNotificationCallback(() => () => {});
    };
  }, []);

  if (!isAppLoaded) {
    return null;
  }

  return (
    <theme.ThemeProvider theme={colors}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.background,
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
      </NavigationContainer>
    </theme.ThemeProvider>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppLayout />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
