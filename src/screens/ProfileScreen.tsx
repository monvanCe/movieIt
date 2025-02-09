import {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Clipboard,
} from 'react-native';

import Button from '@src/components/atoms/button';
import PrimaryText from '@src/components/atoms/primary-text';
import SecondaryText from '@src/components/atoms/secondary-text';
import CustomInput from '@src/components/atoms/text-input';
import CustomModal from '@src/components/molecules/customModal';
import useToggle from '@src/hooks/useToggle';
import useUser from '@src/hooks/useUser';
import useMovies from '@src/hooks/useMovies';
import {useAppSelector} from '@src/store/store';
import {borderRadius, borderWidths, margins, paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';
import {toastMessage} from '@src/utils/toastMessage';

export default function ProfileScreen() {
  const user = useAppSelector(state => state.auth.currentUser);
  const avatars = useAppSelector(state => state.appConfig.avatars);
  const movies = useAppSelector(state => state.movies);
  const [newUser, setNewUser] = useState<Record<string, any> | null>(user);
  const {updateUser} = useUser();
  const {loadUserWatchList, loadUserWatched} = useMovies();

  useEffect(() => {
    loadUserWatchList();
    loadUserWatched();
  }, []);

  const handleCopyRecoveryKey = () => {
    if (user?.rollbackId) {
      Clipboard.setString(user.rollbackId);
      toastMessage('Recovery key copied to clipboard');
    }
  };

  const allWatchlistMovieCount =
    (movies?.user?.watchlist?.length || 0) +
    (movies?.friends?.reduce((acc, f) => acc + (f.watchlist?.length || 0), 0) ||
      0);
  const allWatchedMovieCount =
    (movies?.user?.watched?.length || 0) +
    (movies?.friends?.reduce((acc, f) => acc + (f.watched?.length || 0), 0) ||
      0);

  const colors = theme.useTheme();
  const {toggle, isToggle} = useToggle();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerGradient: {
      height: 250,
      position: 'absolute',
      left: 0,
      right: 0,
      backgroundColor: colors.surface,
      opacity: 0.5,
    },
    content: {
      alignItems: 'center',
      paddingTop: margins.large,
    },
    avatarContainer: {
      borderRadius: 999,
      overflow: 'hidden',
      padding: paddings.small,
      borderWidth: 1.5,
      borderColor: colors.primary,
      width: '25%',
      aspectRatio: 1,
      backgroundColor: colors.background,
      elevation: 8,
      shadowColor: colors.border,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 5.84,
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: 999,
    },
    nameContainer: {
      marginTop: margins.medium,
      alignItems: 'center',
    },
    username: {
      fontSize: 26,
      fontWeight: 'bold',
      color: colors.primaryText,
      marginBottom: margins.small,
    },
    recoveryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: paddings.medium,
      paddingVertical: paddings.small,
      borderRadius: 20,
    },
    recoveryContainerPressed: {
      opacity: 0.8,
      transform: [{scale: 0.98}],
    },
    recoveryKey: {
      opacity: 0.7,
      fontSize: 13,
      color: colors.secondaryText,
    },
    recoveryText: {
      color: colors.secondaryText,
      marginLeft: margins.small,
      fontSize: 12,
    },
    statsContainer: {
      width: '90%',
      marginTop: margins.large,
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: borderRadius.large,
      padding: paddings.medium,
      elevation: 4,
      shadowColor: colors.border,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: `${colors.border}30`,
    },
    statBox: {
      flex: 1,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primaryText,
      marginBottom: margins.small / 2,
    },
    statLabel: {
      fontSize: 14,
      color: `${colors.secondaryText}CC`,
    },
    divider: {
      width: StyleSheet.hairlineWidth,
      height: '80%',
      backgroundColor: `${colors.border}30`,
      alignSelf: 'center',
    },
    bioContainer: {
      width: '90%',
      marginTop: margins.large,
      padding: paddings.large,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.large,
      elevation: 4,
      shadowColor: colors.border,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: `${colors.border}30`,
    },
    bioLabel: {
      marginBottom: margins.small,
      opacity: 0.7,
      fontSize: 14,
    },
    bioText: {
      fontSize: 15,
      color: colors.primaryText,
    },
    editButton: {
      flexDirection: 'row',
      marginVertical: margins.large,
      width: '90%',
      justifyContent: 'center',
      paddingVertical: paddings.medium,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.large,
      elevation: 5,
      shadowColor: colors.border,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.2,
      shadowRadius: 4.65,
    },
    modalContainer: {
      flex: 1,
      paddingHorizontal: paddings.medium,
    },
    modalSection: {
      marginBottom: margins.large,
    },
    modalSectionTitle: {
      fontSize: 16,
      marginBottom: margins.small,
      color: colors.primaryText,
      fontWeight: '600',
    },
    modalInput: {
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderRadius: borderRadius.medium,
      paddingHorizontal: paddings.medium,
      paddingVertical: paddings.medium,
      color: colors.primaryText,
      fontSize: 15,
    },
    avatarList: {
      gap: paddings.medium,
      paddingVertical: paddings.small,
    },
    avatarItem: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: borderRadius.medium,
      overflow: 'hidden',
      padding: 2,
    },
    selectedAvatarItem: {
      borderColor: colors.secondaryText,
      backgroundColor: `${colors.surface}90`,
    },
    avatarImage: {
      height: 80,
      width: 80,
      borderRadius: borderRadius.small,
    },
    bioInput: {
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: `${colors.border}50`,
      borderRadius: borderRadius.medium,
      paddingHorizontal: paddings.medium,
      paddingVertical: paddings.medium,
      color: colors.primaryText,
      fontSize: 15,
      minHeight: 120,
      textAlignVertical: 'top',
    },
    saveButton: {
      width: '100%',
      paddingVertical: paddings.medium,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.large,
      marginTop: 'auto',
      marginBottom: margins.medium,
      elevation: 4,
      shadowColor: colors.border,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3.84,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerGradient} />

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: user?.avatarId?.toString()}}
            style={styles.avatar}
          />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.username}>{user?.userName}</Text>
          <TouchableOpacity
            onPress={handleCopyRecoveryKey}
            activeOpacity={0.7}
            style={styles.recoveryContainer}>
            <SecondaryText style={styles.recoveryKey}>
              {'#' + user?.rollbackId}
            </SecondaryText>
            <Text style={styles.recoveryText}>Recovery Key</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{allWatchlistMovieCount}</Text>
            <Text style={styles.statLabel}>Watchlist</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{allWatchedMovieCount}</Text>
            <Text style={styles.statLabel}>Watched</Text>
          </View>
        </View>

        <View style={styles.bioContainer}>
          <SecondaryText style={styles.bioLabel}>Bio</SecondaryText>
          <Text style={styles.bioText}>{user?.bio || 'No bio yet'}</Text>
        </View>

        <Button
          overrideStyle={styles.editButton}
          text="Edit Profile"
          onPress={toggle}
        />
      </View>

      <CustomModal visible={isToggle} onPress={toggle} height={'100%'}>
        <View style={styles.modalContainer}>
          <View style={styles.modalSection}>
            <PrimaryText style={styles.modalSectionTitle}>Username</PrimaryText>
            <CustomInput
              placeholder="Username"
              value={newUser?.userName}
              onChangeText={text => setNewUser({...newUser, userName: text})}
              style={styles.modalInput}
            />
          </View>

          <View style={styles.modalSection}>
            <PrimaryText style={styles.modalSectionTitle}>Avatar</PrimaryText>
            <FlatList
              contentContainerStyle={styles.avatarList}
              showsHorizontalScrollIndicator={false}
              data={avatars}
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => setNewUser({...newUser, avatarId: item})}
                  style={[
                    styles.avatarItem,
                    newUser?.avatarId === item && styles.selectedAvatarItem,
                  ]}>
                  <Image style={styles.avatarImage} source={{uri: item}} />
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.modalSection}>
            <PrimaryText style={styles.modalSectionTitle}>Bio</PrimaryText>
            <CustomInput
              placeholder="Tell us about yourself..."
              value={newUser?.bio}
              onChangeText={text => setNewUser({...newUser, bio: text})}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.bioInput}
            />
          </View>

          <Button
            overrideStyle={styles.saveButton}
            text="Save Changes"
            onPress={() => {
              updateUser(newUser);
              toggle();
            }}
          />
        </View>
      </CustomModal>
    </ScrollView>
  );
}
