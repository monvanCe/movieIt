import {Text, TextProps} from 'react-native';

import {fontSizes} from '@src/styles/sizes';
import theme from '@src/styles/theme';

export default function PrimaryText(props: TextProps) {
  const colors = theme.useTheme();

  return (
    <Text
      {...props}
      style={[
        {fontSize: fontSizes.large, color: colors.primaryText},
        props.style,
      ]}>
      {props.children}
    </Text>
  );
}
