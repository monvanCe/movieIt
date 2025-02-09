import {horizontalScale, moderateScale} from './metricEngine';
import {StyleSheet} from 'react-native';

export const spacing = {
  xxsmall: horizontalScale(4),
  xsmall: horizontalScale(8),
  small: horizontalScale(12),
  medium: horizontalScale(16),
  large: horizontalScale(20),
  xlarge: horizontalScale(24),
  xxlarge: horizontalScale(28),
};

export const paddings = {
  xxsmall: spacing.xxsmall,
  xsmall: spacing.xsmall,
  small: spacing.small,
  medium: spacing.medium,
  large: spacing.large,
  xlarge: spacing.xlarge,
  xxlarge: spacing.xxlarge,
};

export const margins = {
  xxsmall: spacing.xxsmall,
  xsmall: spacing.xsmall,
  small: spacing.small,
  medium: spacing.medium,
  large: spacing.large,
  xlarge: spacing.xlarge,
  xxlarge: spacing.xxlarge,
};

export const fontSizes = {
  xxsmall: moderateScale(10),
  xsmall: moderateScale(12),
  small: moderateScale(14),
  medium: moderateScale(16),
  large: moderateScale(20),
  xlarge: moderateScale(24),
  xxlarge: moderateScale(28),
  xxxlarge: moderateScale(32),
};

export const borderRadius = {
  xxsmall: horizontalScale(4),
  xsmall: horizontalScale(8),
  small: horizontalScale(12),
  medium: horizontalScale(16),
  large: horizontalScale(24),
  xlarge: horizontalScale(32),
  circle: 999,
};

export const borderWidths = {
  thin: StyleSheet.hairlineWidth,
  small: 1,
  medium: 1.5,
  large: 2,
  xlarge: 3,
};

export const componentSizes = {
  avatar: {
    small: horizontalScale(40),
    medium: horizontalScale(60),
    large: horizontalScale(90),
    xlarge: horizontalScale(120),
  },
  icon: {
    small: horizontalScale(16),
    medium: horizontalScale(24),
    large: horizontalScale(32),
  },
  image: {
    thumbnail: horizontalScale(60),
    small: horizontalScale(90),
    medium: horizontalScale(120),
    large: horizontalScale(180),
  },
  button: {
    small: horizontalScale(32),
    medium: horizontalScale(44),
    large: horizontalScale(56),
  },
  input: {
    small: horizontalScale(32),
    medium: horizontalScale(44),
    large: horizontalScale(56),
  },
};

export default {
  spacing,
  paddings,
  margins,
  fontSizes,
  borderRadius,
  borderWidths,
  componentSizes,
};
