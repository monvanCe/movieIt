import React, {useEffect, memo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  Platform,
} from 'react-native';
import {useAppSelector} from '@src/store/store';
import MovieList from '@src/components/molecules/movieList';
import theme from '@src/styles/theme';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import sizes from '@src/styles/sizes';
import {moderateScale, horizontalScale} from '@src/styles/metricEngine';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from '@src/localization';

import useMovieList from '@src/hooks/useMovieList';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<IRootStackParamList>;

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.paddings.medium,
    paddingTop: sizes.paddings.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.paddings.medium,
    paddingTop: Platform.OS === 'ios' ? moderateScale(52) : moderateScale(16),
    paddingBottom: moderateScale(8),
    backgroundColor: 'transparent',
  },
  backButton: {
    width: horizontalScale(32),
    height: horizontalScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizes.margins.small,
    borderRadius: sizes.borderRadius.small,
  },
  title: {
    flex: 1,
    fontSize: sizes.fontSizes.medium,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  tabBar: {
    flexDirection: 'row',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: moderateScale(40),
    marginHorizontal: sizes.margins.medium,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: sizes.fontSizes.small,
    fontWeight: '500',
    opacity: 0.7,
  },
  tabTextActive: {
    fontSize: sizes.fontSizes.small,
    fontWeight: '600',
    opacity: 1,
  },
  indicator: {
    position: 'absolute',
    bottom: -StyleSheet.hairlineWidth,
    height: sizes.borderWidths.small,
    width: '50%',
    borderRadius: sizes.borderRadius.small,
  },
});

const Header = memo(function Header() {
  const navigation = useNavigation();
  const colors = theme.useTheme();
  const ownerName = useAppSelector(state => state.movieList.ownerName);
  const selectedList = useAppSelector(state => state.movieList.selectedList);
  const title =
    ownerName === 'me'
      ? selectedList === 'watchlist'
        ? i18n.t('watchlist')
        : i18n.t('watched')
      : selectedList === 'watchlist'
      ? i18n.t('friendWatchlist')
      : i18n.t('friendWatched');

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={[styles.backButton, {backgroundColor: colors.surface}]}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={colors.primaryText} />
      </TouchableOpacity>
      <Text style={[styles.title, {color: colors.primaryText}]}>{title}</Text>
    </View>
  );
});

const TabBar = memo(function TabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  const colors = theme.useTheme();

  return (
    <View
      style={[
        styles.tabBar,
        {backgroundColor: colors.background, borderBottomColor: colors.border},
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : typeof options.title === 'string'
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} style={styles.tab} onPress={onPress}>
            <Text
              style={[
                isFocused ? styles.tabTextActive : styles.tabText,
                {color: isFocused ? colors.primary : colors.secondaryText},
              ]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
      <View
        style={[
          styles.indicator,
          {
            backgroundColor: colors.primary,
            transform: [{translateX: `${state.index * 100}%`}],
          },
        ]}
      />
    </View>
  );
});

const WatchlistTab = memo(function WatchlistTab() {
  const colors = theme.useTheme();
  const watchlist = useAppSelector(state => state.movieList.watchlist);
  const navigation = useNavigation<NavigationProp>();

  const handleMoviePress = (movie: IMovie) => {
    navigation.navigate('MovieDetail', {movieId: movie.id});
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <MovieList movies={watchlist} onPress={handleMoviePress} />
    </View>
  );
});

const WatchedTab = memo(function WatchedTab() {
  const colors = theme.useTheme();
  const watched = useAppSelector(state => state.movieList.watched);
  const navigation = useNavigation<NavigationProp>();

  const handleMoviePress = (movie: IMovie) => {
    navigation.navigate('MovieDetail', {movieId: movie.id});
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <MovieList movies={watched} onPress={handleMoviePress} />
    </View>
  );
});

export default function MovieListScreen() {
  const colors = theme.useTheme();
  const selectedList = useAppSelector(state => state.movieList.selectedList);
  const {loadMovieList} = useMovieList();

  useEffect(() => {
    loadMovieList();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header />
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        initialRouteName={
          selectedList === 'watchlist' ? 'Watchlist' : 'Watched'
        }
        screenOptions={{
          tabBarStyle: [styles.tabBar, {backgroundColor: colors.background}],
          tabBarIndicatorStyle: [
            styles.indicator,
            {backgroundColor: colors.primary},
          ],
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondaryText,
        }}>
        <Tab.Screen name="Watchlist" component={WatchlistTab} />
        <Tab.Screen name="Watched" component={WatchedTab} />
      </Tab.Navigator>
    </View>
  );
}
