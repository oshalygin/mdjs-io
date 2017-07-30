// Used to configure the default colors and styling of Material UI
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import {
  cyan500,
  cyan700,
  grey400,
  pinkA200,
  grey100,
  grey500,
  darkBlack,
  white,
  grey300,
  fullBlack,
  primaryBlue,
} from './colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: primaryBlue,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});

export default muiTheme;
