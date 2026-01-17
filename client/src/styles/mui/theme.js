const { createTheme } = require("@mui/material/styles");

// Colour Variables
const backgroundColour = "#F3F8F2";
const primaryColour = "#FCB07E";
const textColour = "#242423";
const secondaryColour = "#8B95C9";
const highlightColour = "#EC058E";

// Dark Theme Colour Variables
const backgroundColourDark = "#242423";
const primaryColourDark = "#83502eff";
const textColourDark = "#F3F8F2";
const secondaryColourDark = "#3c4469ff";
const highlightColourDark = "#EC058E";

let lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: backgroundColour,
      paper: backgroundColour
    },
    primary: {
      main: primaryColour,
    },
    secondary: {
      main: secondaryColour,
    },
    tertiary: {
      main: highlightColour,
    },
    icon: {
      main: textColour,
    },
    error: {
      main: "#D80027",
    },
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat',
    },
    fontFamily: 'Montserrat',
    body1: {
      fontFamily: 'Raleway',
    },
    body2: {
      fontFamily: 'Raleway',
    },
    subtitle1: {
      fontFamily: 'Raleway',
    },
    subtitle2: {
      fontFamily: 'Raleway',
    },
    button: {
      fontWeight: 500,
    },
  },
});

// Dark Theme
let darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: backgroundColourDark,
    },
    primary: {
      main: primaryColourDark,
      
    },
    secondary: {
      main: secondaryColourDark,
    },
    tertiary: {
      main: highlightColourDark,
    },
    icon: {
      main: textColourDark,
    },
    error: {
      main: "#D80027",
    },
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat',
    },
    fontFamily: 'Montserrat',
    body1: {
      fontFamily: 'Raleway',
    },
    body2: {
      fontFamily: 'Raleway',
    },
    subtitle1: {
      fontFamily: 'Raleway',
    },
    subtitle2: {
      fontFamily: 'Raleway',
    },
    button: {
      fontWeight: 500,
    },
  },
});

export { lightTheme, darkTheme };