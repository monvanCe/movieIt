import React from 'react';

import {TouchableOpacity, Image} from 'react-native';
import imageSources from '@src/const/imageSources';
import theme from '@src/styles/theme';

import {styles} from './styles';

export default function PosterItem({movie}: {movie: IMovie}) {
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);

  return (
    <TouchableOpacity activeOpacity={1} style={style.container}>
      <Image
        source={{uri: imageSources.lowResImage(movie.posterPath)}}
        style={style.image}
      />
    </TouchableOpacity>
  );
}
