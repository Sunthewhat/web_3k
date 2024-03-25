import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home';
import Schedules from '@/pages/schedules';
import Sports from '@/pages/sports';
import Travel from '@/pages/travel';
import Ranking from '@/pages/home/components/ranking/Ranking';
import Sponsers from '@/pages/home/components/sponsers/Sponsers';

import { RootLayout } from '../layout/rootLayout';
import { NotFoundPage } from '../pages/NotFound';

export const PublicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sports', element: <Sports /> },
      { path: '/schedules', element: <Schedules /> },
      { path: 'travel', element: <Travel /> },
      { path: '/ranking', element: <Ranking /> },
      { path: '/sponsers', element: <Sponsers /> },
    ],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
