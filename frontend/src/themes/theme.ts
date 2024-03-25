import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

import { neutralGrayColor } from './colors/neutral-gray-color';
import { oragneYellowColor } from './colors/orage-yellow-color';

const themeOverride = createTheme({
  primaryColor: 'oragneYellowColor',
  colors: {
    oragneYellowColor,
    neutralGrayColor,
  },
  fontFamily: '"Noto Sans Thai", sans-serif;',
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
