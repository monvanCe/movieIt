import React from 'react';
import {ScrollView} from 'react-native';

import MoviesSlider from '@src/components/molecules/moviesSlider';
import i18n from '@src/localization/index';
import actions from '@src/store/actions';
import {useAppSelector} from '@src/store/store';
import {margins} from '@src/styles/sizes';

export default function BannerMovies() {
  const {topRated, upComing, nowPlaying, popular} = useAppSelector(
    state => state.movies,
  );
  const {moviesActions} = actions;

  React.useEffect(() => {
    moviesActions.loadBannerMovies();
  }, []);

  return (
    <ScrollView style={{flex: 1, marginBottom: margins.small}}>
      <MoviesSlider movies={topRated ?? []} text={i18n.t('topRated')} />
      <MoviesSlider movies={popular ?? []} text={i18n.t('popular')} />
      <MoviesSlider movies={upComing ?? []} text={i18n.t('upComing')} />
      <MoviesSlider movies={nowPlaying ?? []} text={i18n.t('nowPlaying')} />
    </ScrollView>
  );
}
