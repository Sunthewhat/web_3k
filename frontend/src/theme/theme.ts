import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';
import foundations from './foundations';
import fonts from './typography/fonts';
// import breakpoints from './breakpoints';
// import components from './components';
// import typography from './typography';

const theme = extendTheme({
  ...defaultTheme,
  ...fonts,
  ...foundations,
  styles: {
    global: {
      body: {
        color: 'black', // Use your custom text color here
        fontFamily: '"Noto Sans Thai", sans-serif;',
      },
    },
  },
});
export default theme;
