import {Text, TextProps} from 'react-native';

import {fontSizes} from '@src/styles/sizes';
import theme from '@src/styles/theme';

export default function SecondaryText(props: TextProps) {
  const colors = theme.useTheme();

  return (
    <Text
      {...props}
      style={[
        {fontSize: fontSizes.medium, color: colors.tertiaryText},
        props.style,
      ]}>
      {props.children}
    </Text>
  );
}
