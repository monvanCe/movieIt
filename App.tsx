import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MovieListScreen from '@src/screens/MovieListScreen';
import MovieDetailScreen from '@src/screens/MovieDetailScreen';
import ChatScreen from '@src/screens/ChatScreen';
import TabNavigator from '@src/screens/TabNavigator';
import {Provider} from 'react-redux';
import {store, useAppSelector} from '@src/store/store';
import {useAuth} from '@src/hooks/useAuth';
import {
  loadAppConfig,
  loadLanguage,
  loadTheme,
  loadInternalUrl,
} from '@src/store/actions/appConfigActions';
import {appTheme, notificationTypes} from '@src/const/enums';
import theme, {themes} from '@src/styles/theme';
import {
  initializeNotifications,
  setNotificationCallback,
} from './src/utils/notification';
import useNotification from '@src/hooks/useNotification';
import {loadMessages} from '@src/store/actions/chatActions';
import {useMessages} from '@src/hooks/useMessages';
import {initializeAds} from '@src/service/adServices';

const Stack = createNativeStackNavigator();

function AppLayout() {
  const {updateByNotification: updateByNotificationNotification} =
    useNotification();
  const {updateByNotification: updateByNotificationMessage} = useMessages();
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

  const handleNotificationByType = (notification: any) => {
    const notificationData = JSON.parse(notification.data.notificationData);
    const notificationType = notificationData.type;

    if (notificationType === notificationTypes.message) {
      updateByNotificationMessage(notificationData);
    } else {
      updateByNotificationNotification(notification);
    }
  };

  useEffect(() => {
    const loadApp = async () => {
      await Promise.all([loadTheme(), loadLanguage(), loadInternalUrl()]);

      await Promise.all([login(), loadAppConfig()]);

      await Promise.all([
        setIsAppLoaded(true),
        loadMessages(),
        initializeAds(),
        initializeNotifications(),
      ]);
    };

    loadApp();
  }, []);

  useEffect(() => {
    setNotificationCallback(handleNotificationByType);

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
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="MovieList" component={MovieListScreen} />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
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
