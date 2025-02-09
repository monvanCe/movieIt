import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

import SearchButton from '@src/components/atoms/searchButton';
import SecondaryText from '@src/components/atoms/secondary-text';
import CustomModal from '@src/components/molecules/customModal';
import BannerMovies from '@src/components/organism/bannerMovies';
import {highResImage, lowResImage} from '@src/const/imageSources';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useMovies from '@src/hooks/useMovies';
import useToggle from '@src/hooks/useToggle';
import {searchMovies} from '@src/service/externalServices';
import {FlashList} from '@shopify/flash-list';
import {useAppSelector} from '@src/store/store';
import {
  borderRadius,
  borderWidths,
  fontSizes,
  margins,
  paddings,
} from '@src/styles/sizes';
import theme from '@src/styles/theme';
import i18n from '@src/localization';

export default function SearchScreen() {
  const user = useAppSelector(state => state.auth.currentUser);
  const {addMovieToWatchList, addMovieToWatched, addMovieToFriendList} =
    useMovies();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);
  const {toggle, isToggle, close} = useToggle();
  const colors = theme.useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const width = Dimensions.get('window').width;
  const friends = useAppSelector(state => state.movies.friends);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const addItems = [
    {name: user?.userName, type: 0, avatar: user?.avatarId},
    {name: user?.userName, type: 1, avatar: user?.avatarId},
    ...friends.map(friend => ({
      name: friend.name,
      type: 2,
      id: friend.friendshipId,
      avatar: friend.avatar,
    })),
    ...friends.map(friend => ({
      name: friend.name,
      type: 3,
      id: friend.friendshipId,
      avatar: friend.avatar,
    })),
  ];

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchedMovies([]);
      return;
    }

    const time = setTimeout(async () => {
      const movies = await searchMovies(searchTerm);
      setSearchedMovies(movies);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => clearTimeout(time);
  }, [searchTerm]);

  const renderMovieList = () => (
    <Animated.View style={{opacity: fadeAnim, flex: 1}}>
      <FlashList
        data={searchedMovies}
        renderItem={({item, index}: {item: IMovie; index: number}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedMovie(item);
              flatListRef.current?.scrollToIndex({index: 1});
              setCurrentPage(1);
            }}
            style={styles.movieItem}>
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
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, {backgroundColor: colors.divider}]} />
        )}
      />
    </Animated.View>
  );

  const renderMovieDetail = () => (
    <View style={styles.detailContainer}>
      {selectedMovie && (
        <>
          <TouchableOpacity
            onPress={() => {
              flatListRef.current?.scrollToIndex({index: 0});
              setCurrentPage(0);
            }}
            style={styles.backButton}>
            <Ionicons name="chevron-back" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Image
            source={{uri: highResImage(selectedMovie.posterPath)}}
            style={styles.detailPoster}
          />
          <View style={styles.detailHeader}>
            <Text style={[styles.detailTitle, {color: colors.primaryText}]}>
              {selectedMovie.title}
            </Text>

            <TouchableOpacity
              onPress={() => {
                flatListRef.current?.scrollToIndex({index: 2});
                setCurrentPage(2);
              }}
              style={[styles.addButton, {borderColor: colors.tertiaryText}]}>
              <Ionicons
                name="add-circle"
                size={24}
                color={colors.primaryText}
                style={{marginRight: paddings.small}}
              />
              <SecondaryText>Add</SecondaryText>
            </TouchableOpacity>
          </View>
          <Text style={[styles.detailOverview, {color: colors.secondaryText}]}>
            {selectedMovie.overview}
          </Text>
        </>
      )}
    </View>
  );

  const renderAddList = () => (
    <View style={styles.addListContainer}>
      <TouchableOpacity
        onPress={() => {
          flatListRef.current?.scrollToIndex({index: 1});
          setCurrentPage(1);
        }}
        style={styles.backButton}>
        <Ionicons name="chevron-back" size={30} color={colors.primary} />
      </TouchableOpacity>
      <FlashList
        data={addItems}
        keyboardShouldPersistTaps="handled"
        renderItem={({item, index}: {item: any; index: number}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              handleAddButton();
            }}
            style={[styles.addListItem, {borderColor: colors.divider}]}>
            <Image source={{uri: item.avatar}} style={styles.avatarImage} />
            <Text style={[styles.userName, {color: colors.primaryText}]}>
              {item.name === user?.userName ? item.name + ' (You)' : item.name}
            </Text>
            <Ionicons
              name={
                item.type === 0 || item.type === 2
                  ? 'add-circle'
                  : 'checkmark-circle'
              }
              size={24}
              color={
                item.type === 0 || item.type === 2
                  ? colors.warning
                  : colors.success
              }
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name + item.type.toString()}
        estimatedItemSize={100}
      />
    </View>
  );

  const handleAddButton = () => {
    if (!selectedMovie) return;
    if (!selectedItem) return;
    if (selectedItem?.type === 0) {
      addMovieToWatchList(selectedMovie);
    }

    if (selectedItem?.type === 1) {
      addMovieToWatched(selectedMovie);
    }

    if (selectedItem?.type === 2) {
      addMovieToFriendList(selectedItem.id, selectedMovie.id, 'towatched');
    }

    if (selectedItem?.type === 3) {
      addMovieToFriendList(selectedItem.id, selectedMovie.id, 'watched');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <SearchButton onPress={toggle} />

      <View style={styles.bannerContainer}>
        <BannerMovies />
      </View>

      <CustomModal visible={isToggle} onPress={close} height={'100%'}>
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
            style={[
              {
                flex: 1,
                color: colors.primaryText,
                fontSize: fontSizes.medium,
              },
            ]}
            placeholder={i18n.t('search')}
            placeholderTextColor={colors.tertiaryText}
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoFocus
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
        <View style={styles.modalContent}>
          <FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            keyboardShouldPersistTaps="handled"
            data={[{key: 'list'}, {key: 'details'}, {key: 'add'}]}
            renderItem={({item}) => (
              <View style={[styles.page, {width: width - 2 * paddings.medium}]}>
                {item.key === 'list' && renderMovieList()}
                {item.key === 'details' && renderMovieDetail()}
                {item.key === 'add' && renderAddList()}
              </View>
            )}
          />
        </View>
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    flex: 1,
    marginTop: margins.small,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: borderRadius.medium,
    paddingHorizontal: paddings.medium,
    marginHorizontal: paddings.medium,
    marginTop: margins.medium,
    borderWidth: borderWidths.small,
  },
  searchIcon: {
    marginRight: margins.small,
  },
  modalContent: {
    flex: 1,
    marginTop: margins.medium,
  },
  page: {
    flex: 1,
  },
  movieItem: {
    flexDirection: 'row',
    padding: paddings.medium,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: borderRadius.medium,
  },
  moviePoster: {
    height: 150,
    width: 100,
    borderRadius: borderRadius.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  movieInfo: {
    flex: 1,
    marginLeft: margins.medium,
    justifyContent: 'space-between',
    height: 150,
  },
  movieTitle: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: margins.small,
  },
  movieDate: {
    fontSize: fontSizes.small,
    marginBottom: margins.small,
  },
  movieOverview: {
    fontSize: fontSizes.small,
    lineHeight: 20,
  },
  separator: {
    height: 1,
    marginHorizontal: margins.medium,
    marginVertical: margins.small,
  },
  detailContainer: {
    flex: 1,
  },
  backButton: {
    padding: paddings.medium,
  },
  detailPoster: {
    width: '100%',
    height: 300,
    borderRadius: borderRadius.medium,
    marginBottom: margins.medium,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: margins.medium,
    paddingHorizontal: paddings.medium,
  },
  detailTitle: {
    flex: 1,
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borderWidths.small,
    borderRadius: borderRadius.medium,
    padding: paddings.medium,
    backgroundColor: 'transparent',
  },
  detailOverview: {
    fontSize: fontSizes.medium,
    marginTop: margins.medium,
    paddingHorizontal: paddings.medium,
    lineHeight: 24,
  },
  addListContainer: {
    flex: 1,
    paddingHorizontal: paddings.medium,
  },
  addListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: borderWidths.small,
    padding: paddings.medium,
    borderRadius: borderRadius.medium,
    marginVertical: margins.small,
    backgroundColor: 'transparent',
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: margins.medium,
  },
  userName: {
    flex: 1,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  actionIcon: {
    marginLeft: margins.small,
  },
});
