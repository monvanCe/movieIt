import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
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
    }, 1000);

    return () => clearTimeout(time);
  }, [searchTerm]);

  const renderMovieList = () => (
    <FlashList
      data={searchedMovies}
      renderItem={({item, index}: {item: IMovie; index: number}) => (
        <>
          <TouchableOpacity
            onPress={() => {
              setSelectedMovie(item);
              flatListRef.current?.scrollToIndex({index: 1});
              setCurrentPage(1);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: index === 0 ? margins.small : 0,
            }}>
            <Image
              source={{uri: lowResImage(item.posterPath)}}
              style={{
                height: 75,
                aspectRatio: 9 / 13.5,
                marginRight: paddings.small,
              }}
            />
            <View>
              <Text style={{color: colors.primaryText, fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text style={{color: colors.secondaryText}}>
                {item.releaseDate}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: colors.divider,
              marginVertical: margins.small,
            }}
          />
        </>
      )}
      keyExtractor={item => item.id.toString()}
      estimatedItemSize={100}
    />
  );

  const renderMovieDetail = () => (
    <View style={{flex: 1}}>
      {selectedMovie && (
        <>
          <TouchableOpacity
            onPress={() => {
              flatListRef.current?.scrollToIndex({index: 0});
              setCurrentPage(0);
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
          <View
            style={{
              flexDirection: 'row',
              zIndex: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: fontSizes.large,
                color: colors.primaryText,
                marginTop: margins.medium,
                flex: 1,
              }}>
              {selectedMovie.title}
            </Text>

            <TouchableOpacity
              onPress={() => {
                flatListRef.current?.scrollToIndex({index: 2});
                setCurrentPage(2);
              }}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: margins.medium,
                  borderWidth: borderWidths.small,
                  borderColor: colors.tertiaryText,
                  borderRadius: borderRadius.medium,
                  paddingHorizontal: paddings.medium,
                  flexDirection: 'row',
                }}>
                <Ionicons
                  name="add-circle"
                  size={24}
                  color={colors.primaryText}
                  style={{marginLeft: 'auto', margin: paddings.medium}}
                />
                <SecondaryText>Add</SecondaryText>
              </View>
            </TouchableOpacity>
          </View>
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

  const renderAddList = () => (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          flatListRef.current?.scrollToIndex({index: 1});
          setCurrentPage(1);
        }}>
        <Ionicons
          name="chevron-back"
          size={30}
          color={colors.primary}
          style={{margin: paddings.medium}}
        />
      </TouchableOpacity>
      <FlashList
        data={addItems}
        renderItem={({item, index}: {item: any; index: number}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              handleAddButton();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: index === 0 ? margins.small : 0,
              borderWidth: borderWidths.small,
              borderColor: colors.divider,
              padding: paddings.medium,
              borderRadius: borderRadius.medium,
              marginVertical: margins.small,
            }}>
            <Image
              source={{uri: item.avatar}}
              style={{
                height: 50,
                aspectRatio: 1,
                marginRight: paddings.medium,
              }}
            />
            <Text style={{color: colors.primaryText, fontWeight: 'bold'}}>
              {item.name === user?.userName ? item.name + '(You)' : item.name}
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
              style={{marginLeft: 'auto'}}
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
    <View style={{flex: 1}}>
      <SearchButton onPress={toggle} />

      <View
        style={{
          flex: 1,
          marginTop: margins.small,
        }}>
        <BannerMovies />
      </View>

      <CustomModal visible={isToggle} onPress={close} height={'100%'}>
        <TextInput
          style={{
            marginTop: 16,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: '100%',
            borderRadius: 8,
            paddingHorizontal: 16,
            color: colors.primaryText,
          }}
          placeholder="Search"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <View style={{flex: 1}}>
          <FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            data={[{key: 'list'}, {key: 'details'}, {key: 'add'}]}
            renderItem={({item}) => (
              <View style={{width: width - 2 * paddings.medium}}>
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
