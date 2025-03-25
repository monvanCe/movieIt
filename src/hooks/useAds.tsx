import {useCallback, useEffect, useState} from 'react';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import {createBannerAd, createRewardedAd} from '@src/service/adServices';

export default function useAds() {
  const [rewardedAd, setRewardedAd] = useState<RewardedAd | null>(null);
  const [isRewardedLoaded, setIsRewardedLoaded] = useState(false);

  const loadRewardedAd = useCallback(() => {
    const rewarded = createRewardedAd();

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setIsRewardedLoaded(true);
      },
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setIsRewardedLoaded(false);
        loadRewardedAd();
      },
    );

    rewarded.load();
    setRewardedAd(rewarded);

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, []);

  const showRewardedAd = useCallback(() => {
    if (rewardedAd && isRewardedLoaded) {
      rewardedAd.show();
    }
  }, [rewardedAd, isRewardedLoaded]);

  useEffect(() => {
    const cleanup = loadRewardedAd();
    return () => {
      cleanup();
    };
  }, [loadRewardedAd]);

  return {
    createBannerAd,
    showRewardedAd,
    isRewardedLoaded,
  };
}
