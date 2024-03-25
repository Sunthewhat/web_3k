// Plese refer the color according to the figma design, the comment of each color will match with the color style used in figma.
// If you found any color in figma you need but doesn't exist here, please contact Mink

const colors = {
  white: '#F6F6F6', // white or nearly white -> ex. color={"white"}
  brand: {
    100: '#F7941F', // primary orange -> ex. color={"brand.100"}
    200: '#F05A29', // secondary orange -> ex. color={"brand.200"}
    300: '#D23F0F', // tertiary orange -> ex. color={"brand.300"}
  },
  black: '#191919', // black -> ex. color={"black"}
  grey: {
    100: '#898989', // very light grey -> ex. color={"grey.100"}
    200: '#373737', // light grey -> ex. color={"grey.200"}
    300: '#231F20', // dark grey -> ex. color={"grey.300"}
  },
  red: {
    300: '#C83333',
  }, // red -> ex. color={"red"}
} as const;

export type Colors = typeof colors;
export default colors;
