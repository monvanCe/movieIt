import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import CustomModal from '@src/components/molecules/customModal';
import MovieList from '@src/components/molecules/movieList';
import UserList from '@src/components/molecules/userList';
import {highResImage, lowResImage} from '@src/const/imageSources';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useMovies from '@src/hooks/useMovies';
import useToggle from '@src/hooks/useToggle';

import {useAppSelector} from '@src/store/store';
import {borderRadius, fontSizes, margins, paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';

const {width} = Dimensions.get('window');

export default function UserLists() {
  const [modalContent, setModalContent] = useState<number>(0);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  const {toggle, isToggle} = useToggle();
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

  const renderMovieDetail = () => (
    <View style={{flex: 1}}>
      {selectedMovie && (
        <>
          <TouchableOpacity
            onPress={() => {
              flatListRef.current?.scrollToIndex({index: 0});
            }}>
            <Ionicons
              name="chevron-back"
              size={30}
              color={colors.primary}
              style={{margin: paddings.medium}}
            />
          </TouchableOpacity>
          <Image
            source={{uri: highResImage(selectedMovie.posterPath)}}
            style={{
              width: '100%',
              aspectRatio: 2,
              borderRadius: borderRadius.medium,
            }}
          />
          <Text
            style={{
              fontSize: fontSizes.large,
              color: colors.primaryText,
              marginTop: margins.medium,
            }}>
            {selectedMovie.title}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.medium,
              color: colors.secondaryText,
              marginTop: margins.small,
            }}>
            {selectedMovie.overview}
          </Text>
        </>
      )}
    </View>
  );

  const flatListRef = useRef<FlatList>(null);

  return (
    <View style={{flexDirection: 'row', gap: paddings.small}}>
      <View style={{width: '33%'}}>
        <UserList
          images={watchListImages}
          text="İzlenecekler"
          onPress={() => {
            setModalContent(0);
            toggle();
          }}
        />
      </View>
      <View style={{width: '33%'}}>
        <UserList
          images={watchedImages}
          text="İzlenenler"
          onPress={() => {
            setModalContent(1);
            toggle();
          }}
        />
      </View>
      <CustomModal height="100%" visible={isToggle} onPress={toggle}>
        <View style={{flex: 1}}>
          <FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            data={[{key: 'list'}, {key: 'details'}]}
            renderItem={({item}) => (
              <View style={{width: width - 2 * paddings.medium}}>
                {item.key === 'list' ? (
                  <MovieList
                    movies={modalContent === 0 ? userWatchlist : userWatched}
                    onPress={movie => {
                      setSelectedMovie(movie);
                      flatListRef.current?.scrollToIndex({index: 1});
                    }}
                  />
                ) : (
                  renderMovieDetail()
                )}
              </View>
            )}
          />
        </View>
      </CustomModal>
    </View>
  );
}
