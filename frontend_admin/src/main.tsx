import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme.ts';
import VerifyProvider from './publicComponents/VerifyProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <VerifyProvider />
  </ChakraProvider>
);
