import {horizontalScale, moderateScale} from './metricEngine';

export const paddings = {
  small: horizontalScale(6),
  medium: horizontalScale(12),
  large: horizontalScale(18),
};

export const margins = {
  small: horizontalScale(12),
  medium: horizontalScale(16),
  large: horizontalScale(20),
};

export const fontSizes = {
  small: moderateScale(12),
  medium: moderateScale(18),
  large: moderateScale(24),
};

export const borderRadius = {
  small: horizontalScale(8),
  medium: horizontalScale(16),
  large: horizontalScale(32),
};

export const borderWidths = {
  small: 1,
  medium: 2,
  large: 3,
};

export default {
  paddings,
  margins,
  fontSizes,
  borderRadius,
  borderWidths,
};
