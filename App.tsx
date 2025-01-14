import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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

const Tab = createBottomTabNavigator();

function AppLayout() {
  const {login} = useAuth();
  const currentTheme = useAppSelector(state => state.appConfig.appTheme);
  const colors = themes[currentTheme];
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      StatusBar.setBarStyle(
        currentTheme === appTheme.Light ? 'dark-content' : 'light-content',
      );
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

  if (!isAppLoaded) {
    return null;
  }

  return (
    <theme.ThemeProvider theme={colors}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Notification" component={NotificationScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
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
