import {TouchableOpacity, Image} from 'react-native';

import {lowResImage} from '@src/const/imageSources';
import {FlashList} from '@shopify/flash-list';
import {borderRadius, borderWidths} from '@src/styles/sizes';
import theme from '@src/styles/theme';

interface MovieListProps extends IMovies, IOnPressWithParam {}

const MovieList: React.FC<MovieListProps> = ({movies, onPress}) => {
  const colors = theme.useTheme();

  return (
    <FlashList
      numColumns={3}
      data={movies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}: {item: IMovie}) => (
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={{
            borderWidth: borderWidths.small,
            borderRadius: borderRadius.small,
            borderColor: colors.divider,
            margin: '1%',
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: lowResImage(item.posterPath)}}
            style={{
              width: '100%',
              aspectRatio: 9 / 13.5,
            }}
          />
        </TouchableOpacity>
      )}
      estimatedItemSize={100}
    />
  );
};

export default MovieList;
