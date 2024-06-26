import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PublicRoutes } from './routes/public.routes.tsx';
import theme from './theme/theme.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={PublicRoutes} />
    </QueryClientProvider>
  </ChakraProvider>
);
