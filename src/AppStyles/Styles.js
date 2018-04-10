import { Dimensions } from 'react-native';

// Precalculate Device Dimensions for better performance
export const x = Dimensions.get('window').width;
export const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1 ;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1 ;

// We set our base font size value
const baseUnit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX;

// const COLOR_NORMAL_GREY = '#C7C7C7';

// We add an em() shortcut function
function em(value) {
  return unit * value;
}

const COLOR_WHITE = '#FFFFFF';
const FONT_SIZE_TITLE = em(1.25);
const FONT_COLOR = '#626262';

// Then we set our styles with the help of the em() function
export const Styles = {
  // GENERAL
  DEVICE_WIDTH: x,
  DEVICE_HEIGHT: y,
  RATIO_X: ratioX,
  RATIO_Y: ratioY,
  UNIT: em(1),
  PADDING: em(1.25),
  // CARD
  CARD_WIDTH: x - em(1.25) * 2,
  CARD_HEIGHT: (x - em(1.25) * 2) * (3 / 5),
  CARD_PADDING_X: em(1.875),
  CARD_PADDING_Y: em(1.25),
  COLOR_LIGHTER_0: 'rgb(240, 240, 240)',
  COLOR_LIGHTER_3: 'rgb(225, 225, 225)',
  COLOR_LIGHTER_5: '#D4D4D4',
  COLOR_DARKER_15: '#a1a1a1',
  COLOR_DARKER_30: '#7b7b7b',
  COLOR_DARKER_45: '#545454',
  COLOR_DARKER_60: '#2E2E2E',
  // COLORS
  COLOR_NORMAL_GREY: '#C7C7C7',
  COLOR_BLUE: 'rgb(94, 142, 202)',
  COLOR_GREEN: '#50D2C2',
  COLOR_PINK: '#FF3366',
  COLOR_WHITE,
  COLOR_ORANGE: '#FF8C00',
  COLOR_YELLOW: 'rgb(248, 231, 27)',
  // FONT
  FONT_SIZE: em(1),
  FONT_SIZE_SMALLER_NEW: em(0.625),
  FONT_SIZE_SMALLER: em(0.75),
  FONT_SIZE_SMALL: em(0.875),
  FONT_SIZE_MEDIUM: em(1.125),
  FONT_SIZE_TITLE,
  FONT_COLOR,
  // UTIL
  NAVBAR: { color: COLOR_WHITE, fontSize: FONT_SIZE_TITLE },
  GUTTER: 5
};
