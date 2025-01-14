import {TextInput, TextInputProps} from 'react-native';

import {borderWidths, paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';

export default function CustomInput(props: TextInputProps) {
  const colors = theme.useTheme();

  return (
    <TextInput
      placeholderTextColor={colors.tertiaryText}
      style={{
        color: colors.primaryText,
        padding: paddings.medium,
        paddingLeft: paddings.large,
        borderWidth: borderWidths.small,
        borderColor: colors.border,
        borderRadius: 999,
      }}
      {...props}
    />
  );
}
