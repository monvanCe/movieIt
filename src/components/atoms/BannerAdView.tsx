import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import useAds from '@src/hooks/useAds';
import theme from '@src/styles/theme';

export default function BannerAdView() {
  const {createBannerAd} = useAds();
  const bannerAd = createBannerAd();
  const colors = theme.useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={bannerAd.unitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: colors.background,
    },
  });
3;
