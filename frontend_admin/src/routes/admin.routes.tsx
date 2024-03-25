import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layout/rootLayout';
import { NotFoundPage } from '../pages/NotFound';
import LoginPage from '@/pages/admin/login/loginPage';
import HomePage from '@/pages/admin/home/homePage';
import AthleteRegister from '@/pages/admin/athleteRegister/athleteRegisterPage';
import ResultPage from '@/pages/admin/result/resultPage';
import AnnouncementPage from '@/pages/admin/announcement/announcementPage';

export const AdminRoutes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/athleteRegister', element: <AthleteRegister /> },
      { path: '/score', element: <ResultPage /> },
      { path: '/announcement', element: <AnnouncementPage /> },
    ],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
