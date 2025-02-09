import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/navigation/types';

import ImageStack from '@src/components/atoms/imageStack';
import PrimaryText from '@src/components/atoms/primary-text';
import SecondaryText from '@src/components/atoms/secondary-text';
import {lowResImage} from '@src/const/imageSources';
import useMovies from '@src/hooks/useMovies';
import {useAppSelector} from '@src/store/store';
import {borderRadius, margins, paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';
import {setSelectedList} from '@src/store/slices/movieListSlice';

export default function UserLists() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const {loadUserWatchList, loadUserWatched} = useMovies();
  const userWatchlist = useAppSelector(state => state.movies.user.watchlist);
  const userWatched = useAppSelector(state => state.movies.user.watched);
  const watchListImages = userWatchlist.map(movie =>
    lowResImage(movie.posterPath),
  );
  const watchedImages = userWatched.map(movie => lowResImage(movie.posterPath));
  const colors = theme.useTheme();

  useEffect(() => {
    loadUserWatchList();
    loadUserWatched();
  }, []);

  const handleListPress = (type: 'watchlist' | 'watched') => {
    dispatch(setSelectedList(type));
    navigation.navigate('MovieList');
  };

  return (
    <View style={styles.listsContainer}>
      <TouchableOpacity
        style={[styles.listItem, {backgroundColor: colors.surface}]}
        onPress={() => handleListPress('watchlist')}>
        <View>
          <PrimaryText style={styles.listTitle}>İzlenecekler</PrimaryText>
          <SecondaryText style={styles.listCount}>
            {userWatchlist.length} film
          </SecondaryText>
        </View>
        <View style={styles.imageContainer}>
          <ImageStack images={watchListImages.slice(0, 3)} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.listItem, {backgroundColor: colors.surface}]}
        onPress={() => handleListPress('watched')}>
        <View>
          <PrimaryText style={styles.listTitle}>İzlenenler</PrimaryText>
          <SecondaryText style={styles.listCount}>
            {userWatched.length} film
          </SecondaryText>
        </View>
        <View style={styles.imageContainer}>
          <ImageStack images={watchedImages.slice(0, 3)} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listsContainer: {
    gap: paddings.medium,
    marginBottom: margins.large,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: paddings.medium,
    borderRadius: borderRadius.medium,
  },
  listTitle: {
    fontWeight: '600',
    marginBottom: margins.small,
  },
  listCount: {
    opacity: 0.8,
  },
  imageContainer: {
    width: 90,
    height: 60,
  },
});
