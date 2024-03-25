import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home';
import SelectType from './select-type/select-type';
import SelectInstitute from '@/pages/select-institute';
import CompleteRegist from './complete/complete-regist';
import Form from './form';
import SelectSport from './select-sport/selectSport';
import Rule from './rule/rule';
import Check from './check/check';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/select-type/:institute/:sport',
    element: <SelectType />,
  },
  {
    path: '/select-institute',
    element: <SelectInstitute />,
  },
  {
    path: '/form/:institute/:sportType/:teamType/:sex',
    element: <Form />,
  },
  {
    path: '/rule/:sport',
    element: <Rule />,
  },
  {
    path: '/select_sport',
    element: <SelectSport />,
  },
  {
    path: '/check/:university',
    element: <Check />,
  },
  {
    path: '/complete-regist',
    element: <CompleteRegist />,
  },
]);

export default router;
