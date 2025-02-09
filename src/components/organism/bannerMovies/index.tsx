import React from 'react';
import {ScrollView} from 'react-native';

import MoviesSlider from '@src/components/molecules/moviesSlider';
import i18n from '@src/localization/index';
import actions from '@src/store/actions';
import {useAppSelector} from '@src/store/store';
import {margins} from '@src/styles/sizes';

interface BannerMoviesProps {
  onMoviePress?: (movie: IMovie) => void;
}

export default function BannerMovies({onMoviePress}: BannerMoviesProps) {
  const {topRated, upComing, nowPlaying, popular} = useAppSelector(
    state => state.movies,
  );
  const {moviesActions} = actions;

  React.useEffect(() => {
    moviesActions.loadBannerMovies();
  }, []);

  return (
    <ScrollView style={{flex: 1, marginBottom: margins.small}}>
      <MoviesSlider
        movies={topRated ?? []}
        text={i18n.t('topRated')}
        onMoviePress={onMoviePress}
      />
      <MoviesSlider
        movies={popular ?? []}
        text={i18n.t('popular')}
        onMoviePress={onMoviePress}
      />
      <MoviesSlider
        movies={upComing ?? []}
        text={i18n.t('upComing')}
        onMoviePress={onMoviePress}
      />
      <MoviesSlider
        movies={nowPlaying ?? []}
        text={i18n.t('nowPlaying')}
        onMoviePress={onMoviePress}
      />
    </ScrollView>
  );
}
