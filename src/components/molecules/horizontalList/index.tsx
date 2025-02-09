import React from 'react';
import {FlatList, View} from 'react-native';

import PosterItem from '@src/components/atoms/posterItem';
import SkeletonItem from '@src/components/atoms/skeletonItem';
import theme from '@src/styles/theme';

import {styles} from './styles';

interface HorizontalListProps extends IMovies {
  onMoviePress?: (movie: IMovie) => void;
}

export default function HorizontalList({
  movies,
  onMoviePress,
}: HorizontalListProps) {
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);

  return (
    <View style={style.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.id.toString()}
        horizontal
        renderItem={({item}) => (
          <PosterItem movie={item} onPress={() => onMoviePress?.(item)} />
        )}
        ListEmptyComponent={() => (
          <View style={style.emptyContainer}>
            {Array.from({length: 5}).map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </View>
        )}
      />
    </View>
  );
}
