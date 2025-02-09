import {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/navigation/types';

import ImageStack from '@src/components/atoms/imageStack';
import PrimaryText from '@src/components/atoms/primary-text';
import SecondaryText from '@src/components/atoms/secondary-text';
import AddFriend from '@src/components/molecules/addFriend';
import {lowResImage} from '@src/const/imageSources';
import useUser from '@src/hooks/useUser';
import {FlashList} from '@shopify/flash-list';
import {useAppSelector} from '@src/store/store';
import {borderRadius, margins, paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';
import {useDispatch} from 'react-redux';
import {
  setSelectedFriend,
  setSelectedList,
} from '@src/store/slices/movieListSlice';
import i18n from '@src/localization';

export default function Friendlist() {
  const friends = useAppSelector(state => state.movies.friends);
  const {loadFriends} = useUser();
  const colors = theme.useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  useEffect(() => {
    loadFriends();
  }, []);

  const handleListPress = (friendId: string, type: 'watchlist' | 'watched') => {
    dispatch(setSelectedFriend(friendId));
    dispatch(setSelectedList(type));
    navigation.navigate('MovieList');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <PrimaryText style={styles.title}>Arkadaşlar</PrimaryText>
        <AddFriend />
      </View>
      <FlashList
        data={friends}
        renderItem={({item}) => (
          <View style={[styles.friendCard, {backgroundColor: colors.surface}]}>
            <PrimaryText style={styles.friendName}>{item.name}</PrimaryText>
            <View style={styles.divider} />
            <View style={styles.listsContainer}>
              <TouchableOpacity
                style={styles.listButton}
                onPress={() => handleListPress(item.id, 'watchlist')}>
                <View style={styles.imageContainer}>
                  <ImageStack
                    images={item.watchlist
                      .slice(0, 3)
                      .map(el => lowResImage(el.posterPath))}
                  />
                </View>
                <SecondaryText style={styles.listLabel}>
                  {i18n.t('friendWatchlist')} ({item.watchlist.length})
                </SecondaryText>
              </TouchableOpacity>

              <View style={styles.verticalDivider} />

              <TouchableOpacity
                style={styles.listButton}
                onPress={() => handleListPress(item.id, 'watched')}>
                <View style={styles.imageContainer}>
                  <ImageStack
                    images={item.watched
                      .slice(0, 3)
                      .map(el => lowResImage(el.posterPath))}
                  />
                </View>
                <SecondaryText style={styles.listLabel}>
                  {i18n.t('friendWatched')} ({item.watched.length})
                </SecondaryText>
              </TouchableOpacity>
            </View>
          </View>
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: margins.medium,
  },
  title: {
    fontWeight: 'bold',
  },
  friendCard: {
    borderRadius: borderRadius.medium,
    padding: paddings.medium,
    marginBottom: margins.medium,
  },
  friendName: {
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
    marginVertical: margins.medium,
  },
  verticalDivider: {
    width: 1,
    height: '85%',
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
  },
  listsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  listButton: {
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    width: '60%',
    aspectRatio: 1.5,
    marginBottom: margins.small,
  },
  listLabel: {
    textAlign: 'center',
    opacity: 0.8,
  },
});
