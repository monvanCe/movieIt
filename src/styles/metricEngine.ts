import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

const defaultFactor = width > guidelineBaseWidth ? 0.5 : 1.25;

export const moderateScale = (size: number, factor = defaultFactor) =>
  size + (horizontalScale(size) - size) * factor;

export const horizontalScale = (size: number) =>
  (width / guidelineBaseWidth) * size;

export default {
  moderateScale,
  horizontalScale,
};
