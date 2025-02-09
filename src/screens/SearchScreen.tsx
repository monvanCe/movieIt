import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Text,
  ActivityIndicator,
} from 'react-native';

import BannerMovies from '@src/components/organism/bannerMovies';
import {lowResImage} from '@src/const/imageSources';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {searchMovies} from '@src/service/externalServices';
import {FlashList} from '@shopify/flash-list';
import theme from '@src/styles/theme';
import {
  borderRadius,
  borderWidths,
  fontSizes,
  margins,
  paddings,
} from '@src/styles/sizes';
import i18n from '@src/localization';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  MovieDetail: {movieId: number};
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MovieDetail'
>;

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const colors = theme.useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (searchTerm.length < 3) {
      setSearchedMovies([]);
      return;
    }

    const time = setTimeout(async () => {
      setIsLoading(true);
      try {
        const movies = await searchMovies(searchTerm);
        setSearchedMovies(movies);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(time);
  }, [searchTerm]);

  const handleMoviePress = (movie: IMovie) => {
    navigation.navigate('MovieDetail', {movieId: movie.id});
  };

  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (searchTerm.length > 0 && searchTerm.length < 3) {
      return (
        <View style={styles.centerContainer}>
          <Text style={[styles.messageText, {color: colors.secondaryText}]}>
            Please enter at least 3 characters
          </Text>
        </View>
      );
    }

    if (searchTerm.length >= 3 && searchedMovies.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={[styles.messageText, {color: colors.secondaryText}]}>
            No movies found
          </Text>
        </View>
      );
    }

    return (
      <Animated.View style={{opacity: fadeAnim, flex: 1}}>
        <FlashList
          data={searchedMovies}
          renderItem={({item}: {item: IMovie}) => (
            <TouchableOpacity
              onPress={() => handleMoviePress(item)}
              style={[styles.movieItem, {backgroundColor: colors.surface}]}>
              <Image
                source={{uri: lowResImage(item.posterPath)}}
                style={styles.moviePoster}
              />
              <View style={styles.movieInfo}>
                <Text style={[styles.movieTitle, {color: colors.primaryText}]}>
                  {item.title}
                </Text>
                <Text style={[styles.movieDate, {color: colors.secondaryText}]}>
                  {item.releaseDate}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[styles.movieOverview, {color: colors.tertiaryText}]}>
                  {item.overview}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => (
            <View
              style={[styles.separator, {backgroundColor: colors.divider}]}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View
        style={[
          styles.searchInputContainer,
          {
            borderColor: colors.divider,
            backgroundColor: colors.surface,
          },
        ]}>
        <Ionicons
          name="search"
          size={20}
          color={colors.tertiaryText}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.input, {color: colors.primaryText}]}
          placeholder={i18n.t('search')}
          placeholderTextColor={colors.tertiaryText}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={() => setSearchTerm('')}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.tertiaryText}
            />
          </TouchableOpacity>
        )}
      </View>

      {searchTerm.length === 0 ? (
        <View style={styles.bannerContainer}>
          <BannerMovies onMoviePress={handleMoviePress} />
        </View>
      ) : (
        renderSearchResults()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borderWidths.small,
    borderRadius: borderRadius.medium,
    paddingHorizontal: paddings.medium,
    margin: margins.medium,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.medium,
    marginHorizontal: margins.small,
  },
  searchIcon: {
    marginRight: margins.small,
  },
  bannerContainer: {
    flex: 1,
  },
  movieItem: {
    flexDirection: 'row',
    padding: paddings.medium,
    borderRadius: borderRadius.medium,
    marginHorizontal: margins.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  moviePoster: {
    height: 120,
    width: 80,
    borderRadius: borderRadius.small,
  },
  movieInfo: {
    flex: 1,
    marginLeft: margins.medium,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  movieDate: {
    fontSize: fontSizes.small,
  },
  movieOverview: {
    fontSize: fontSizes.small,
    lineHeight: 18,
  },
  separator: {
    height: 1,
    marginVertical: margins.small,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: fontSizes.medium,
  },
  listContent: {
    paddingVertical: paddings.medium,
  },
});
