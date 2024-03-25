import { Navigate, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layout/rootLayout';
import { NotFoundPage } from '../pages/NotFound';
import LoginPage from '@/pages/admin/login/loginPage';

export const PublicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
