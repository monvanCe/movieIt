import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {highResImage} from '@src/const/imageSources';
import theme from '@src/styles/theme';
import {
  borderRadius,
  borderWidths,
  fontSizes,
  margins,
  paddings,
} from '@src/styles/sizes';
import useMovies from '@src/hooks/useMovies';
import {useAppSelector} from '@src/store/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomModal from '@src/components/molecules/customModal';
import useToggle from '@src/hooks/useToggle';
import SecondaryText from '@src/components/atoms/secondary-text';

type MovieDetailScreenRouteProp = RouteProp<IRootStackParamList, 'MovieDetail'>;

export default function MovieDetailScreen() {
  const route = useRoute<MovieDetailScreenRouteProp>();
  const navigation = useNavigation();
  const colors = theme.useTheme();
  const {movieId} = route.params;
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const {
    getMovie,
    addMovieToWatchList,
    addMovieToWatched,
    addMovieToFriendList,
  } = useMovies();
  const {toggle, isToggle, close} = useToggle();
  const user = useAppSelector(state => state.auth.currentUser);
  const friends = useAppSelector(state => state.movies.friends);

  const addItems = [
    {name: user?.userName, type: 0, avatar: user?.avatarId?.toString()},
    {name: user?.userName, type: 1, avatar: user?.avatarId?.toString()},
    ...friends.map(friend => ({
      name: friend.name,
      type: 2,
      id: friend.friendshipId,
      avatar: friend.avatar?.toString(),
    })),
    ...friends.map(friend => ({
      name: friend.name,
      type: 3,
      id: friend.friendshipId,
      avatar: friend.avatar?.toString(),
    })),
  ];

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await getMovie(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Error loading movie:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [movieId]);

  const handleAddButton = async (selectedItem: any) => {
    if (!movie) return;

    if (selectedItem?.type === 0) {
      await addMovieToWatchList(movie);
    }

    if (selectedItem?.type === 1) {
      await addMovieToWatched(movie);
    }

    if (selectedItem?.type === 2) {
      await addMovieToFriendList(selectedItem.id, movie.id, 'towatched');
    }

    if (selectedItem?.type === 3) {
      await addMovieToFriendList(selectedItem.id, movie.id, 'watched');
    }

    close();
  };

  if (loading) {
    return (
      <View
        style={[styles.loadingContainer, {backgroundColor: colors.background}]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!movie) {
    return (
      <View
        style={[styles.errorContainer, {backgroundColor: colors.background}]}>
        <Text style={[styles.errorText, {color: colors.error}]}>
          Failed to load movie details
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <TouchableOpacity
        style={[styles.backButton, {backgroundColor: colors.surface}]}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={colors.primaryText} />
      </TouchableOpacity>

      <ScrollView>
        <Image
          source={{uri: highResImage(movie.posterPath)}}
          style={styles.posterImage}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, {color: colors.primaryText}]}>
                {movie.title}
              </Text>
              <Text style={[styles.releaseDate, {color: colors.secondaryText}]}>
                {movie.releaseDate}
              </Text>
            </View>
            <TouchableOpacity
              onPress={toggle}
              style={[styles.addButton, {backgroundColor: colors.primary}]}>
              <Ionicons name="add" size={24} color={colors.surface} />
            </TouchableOpacity>
          </View>

          <View style={[styles.ratingContainer, {borderColor: colors.divider}]}>
            <View style={styles.ratingItem}>
              <Ionicons name="star" size={24} color={colors.warning} />
              <Text style={[styles.ratingText, {color: colors.primaryText}]}>
                {movie.voteAverage.toFixed(1)}
              </Text>
            </View>
            <View style={styles.ratingItem}>
              <Ionicons name="people" size={24} color={colors.info} />
              <Text style={[styles.ratingText, {color: colors.primaryText}]}>
                {movie.voteCount}
              </Text>
            </View>
          </View>

          <Text style={[styles.overview, {color: colors.secondaryText}]}>
            {movie.overview}
          </Text>
        </View>
      </ScrollView>

      <CustomModal visible={isToggle} onPress={close} height={'60%'}>
        <View style={styles.modalHeader}>
          <Text style={[styles.modalTitle, {color: colors.primaryText}]}>
            Add to List
          </Text>
        </View>

        <View style={styles.modalContent}>
          <View style={styles.listSection}>
            <Text style={[styles.sectionTitle, {color: colors.secondaryText}]}>
              Your Lists
            </Text>
            <TouchableOpacity
              style={[styles.listItem, {backgroundColor: colors.surface}]}
              onPress={() => handleAddButton({type: 0})}>
              <View style={styles.listItemContent}>
                <Ionicons
                  name="bookmark-outline"
                  size={24}
                  color={colors.primary}
                />
                <Text
                  style={[styles.listItemText, {color: colors.primaryText}]}>
                  Add to Watchlist
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.listItem, {backgroundColor: colors.surface}]}
              onPress={() => handleAddButton({type: 1})}>
              <View style={styles.listItemContent}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={24}
                  color={colors.success}
                />
                <Text
                  style={[styles.listItemText, {color: colors.primaryText}]}>
                  Mark as Watched
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {friends.length > 0 && (
            <View style={styles.listSection}>
              <Text
                style={[styles.sectionTitle, {color: colors.secondaryText}]}>
                Friend Lists
              </Text>
              {friends.map((friend, index) => (
                <View key={friend.id + index} style={styles.friendSection}>
                  <Text
                    style={[styles.friendName, {color: colors.primaryText}]}>
                    {friend.name}
                  </Text>
                  <TouchableOpacity
                    style={[styles.listItem, {backgroundColor: colors.surface}]}
                    onPress={() =>
                      handleAddButton({type: 2, id: friend.friendshipId})
                    }>
                    <View style={styles.listItemContent}>
                      <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color={colors.primary}
                      />
                      <Text
                        style={[
                          styles.listItemText,
                          {color: colors.primaryText},
                        ]}>
                        Add to Watchlist
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.listItem, {backgroundColor: colors.surface}]}
                    onPress={() =>
                      handleAddButton({type: 3, id: friend.friendshipId})
                    }>
                    <View style={styles.listItemContent}>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={24}
                        color={colors.success}
                      />
                      <Text
                        style={[
                          styles.listItemText,
                          {color: colors.primaryText},
                        ]}>
                        Mark as Watched
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: paddings.medium,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: fontSizes.medium,
  },
  posterImage: {
    width: '100%',
    height: 400,
  },
  contentContainer: {
    padding: paddings.medium,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: margins.medium,
  },
  titleContainer: {
    flex: 1,
    marginRight: margins.medium,
  },
  title: {
    fontSize: fontSizes.xlarge,
    fontWeight: 'bold',
    marginBottom: margins.small,
  },
  releaseDate: {
    fontSize: fontSizes.medium,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: borderWidths.small,
    borderRadius: borderRadius.medium,
    padding: paddings.medium,
    marginBottom: margins.medium,
  },
  ratingItem: {
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fontSizes.medium,
    marginTop: margins.small,
  },
  overview: {
    fontSize: fontSizes.medium,
    lineHeight: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: paddings.medium,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  modalTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: paddings.medium,
  },
  listSection: {
    marginBottom: margins.large,
  },
  sectionTitle: {
    fontSize: fontSizes.medium,
    marginBottom: margins.medium,
    fontWeight: '600',
  },
  listItem: {
    borderRadius: borderRadius.medium,
    marginBottom: margins.small,
    padding: paddings.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    marginLeft: margins.medium,
    fontSize: fontSizes.medium,
  },
  friendSection: {
    marginBottom: margins.medium,
  },
  friendName: {
    fontSize: fontSizes.medium,
    fontWeight: '600',
    marginBottom: margins.small,
  },
});
