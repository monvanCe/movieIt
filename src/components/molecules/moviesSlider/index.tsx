import React from 'react';
import {Text, View} from 'react-native';

import theme from '@src/styles/theme';

import HorizontalList from '../horizontalList';
import {styles} from './styles';

interface props extends IMovies, IText {
  onMoviePress?: (movie: IMovie) => void;
}

export default function MoviesSlider({movies, text, onMoviePress}: props) {
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);

  return (
    <View>
      <Text style={style.text}>{text}</Text>
      <View style={style.horizontalContainer}>
        <HorizontalList movies={movies} onMoviePress={onMoviePress} />
      </View>
    </View>
  );
}
