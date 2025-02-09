import React from 'react';

import {TouchableOpacity, Image} from 'react-native';
import imageSources from '@src/const/imageSources';
import theme from '@src/styles/theme';

import {styles} from './styles';

interface PosterItemProps {
  movie: IMovie;
  onPress?: () => void;
}

export default function PosterItem({movie, onPress}: PosterItemProps) {
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={style.container}
      onPress={onPress}>
      <Image
        source={{uri: imageSources.lowResImage(movie.posterPath)}}
        style={style.image}
      />
    </TouchableOpacity>
  );
}
