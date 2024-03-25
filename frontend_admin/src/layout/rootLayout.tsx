import { Box } from '@chakra-ui/react';
import Navbar from '../publicComponents/navbar';
import Footer from '../publicComponents/footer';

import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <Box display={'flex'} flexDir={'column'}>
      <Navbar />
      <Box minH={'100dvh'}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
