import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  MobileAds,
  RewardedAd,
  TestIds,
  RequestOptions,
} from 'react-native-google-mobile-ads';
import adConfig from '@src/const/adConfig';

export const initializeAds = async () => {
  try {
    await MobileAds().initialize();
    return true;
  } catch (error) {
    console.error('Failed to initialize ads:', error);
    return false;
  }
};

export const createBannerAd = () => {
  const adUnitId = __DEV__ ? TestIds.BANNER : adConfig.bannerId;
  return {
    unitId: adUnitId,
    size: BannerAdSize.BANNER,
    requestOptions: {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['movie', 'entertainment', 'cinema'],
    } as RequestOptions,
  };
};

export const createRewardedAd = () => {
  const adUnitId = __DEV__ ? TestIds.REWARDED : adConfig.rewardedId;
  return RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['movie', 'entertainment', 'cinema'],
  });
};

export default {
  initializeAds,
  createBannerAd,
  createRewardedAd,
};
