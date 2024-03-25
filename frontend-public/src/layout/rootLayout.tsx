import { Box } from '@chakra-ui/react';
import Navbar from '../publicComponents/navbar';

import { Outlet } from 'react-router-dom';
import React from 'react';

export const RootLayout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Box mt="64px">
        <Outlet />
      </Box>
    </React.Fragment>
  );
};
