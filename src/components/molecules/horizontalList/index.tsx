import React from 'react';
import {FlatList, View} from 'react-native';

import PosterItem from '@src/components/atoms/posterItem';
import SkeletonItem from '@src/components/atoms/skeletonItem';
import theme from '@src/styles/theme';

import {styles} from './styles';

export default function HorizontalList({movies}: IMovies) {
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.id.toString()}
        horizontal
        renderItem={({item}) => <PosterItem movie={item} />}
        ListEmptyComponent={() => (
          <View style={{flexDirection: 'row'}}>
            {Array.from({length: 5}).map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </View>
        )}
      />
    </View>
  );
}
