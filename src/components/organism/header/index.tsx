import React from 'react';
import {View, StyleSheet} from 'react-native';
import Avatar from '@src/components/atoms/avatar';
import PrimaryText from '@src/components/atoms/primary-text';
import SecondaryText from '@src/components/atoms/secondary-text';
import {paddings, margins, fontSizes} from '@src/styles/sizes';

interface HeaderProps {
  userName: string;
  bio?: string;
  avatarId: number;
  watchlistCount: number;
  watchedCount: number;
  friendsCount: number;
}

export default function Header({
  userName,
  bio,
  avatarId,
  watchlistCount,
  watchedCount,
  friendsCount,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Avatar size={100} avatarId={avatarId} />
        <View style={styles.userTextContainer}>
          <PrimaryText style={styles.userName}>{userName}</PrimaryText>
          {bio && <SecondaryText style={styles.userBio}>{bio}</SecondaryText>}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <PrimaryText style={styles.statNumber}>
                {watchlistCount}
              </PrimaryText>
              <SecondaryText style={styles.statLabel}>İzlenecek</SecondaryText>
            </View>
            <View style={styles.statItem}>
              <PrimaryText style={styles.statNumber}>
                {watchedCount}
              </PrimaryText>
              <SecondaryText style={styles.statLabel}>İzlendi</SecondaryText>
            </View>
            <View style={styles.statItem}>
              <PrimaryText style={styles.statNumber}>
                {friendsCount}
              </PrimaryText>
              <SecondaryText style={styles.statLabel}>Arkadaş</SecondaryText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddings.medium,
    paddingVertical: paddings.large,
    marginBottom: margins.medium,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userTextContainer: {
    marginLeft: margins.large,
    flex: 1,
  },
  userName: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginBottom: margins.small,
  },
  userBio: {
    fontSize: fontSizes.medium,
    opacity: 0.8,
    marginBottom: margins.medium,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: margins.small,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: fontSizes.small,
    marginTop: margins.small / 2,
  },
});
