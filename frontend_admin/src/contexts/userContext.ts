import { IUser } from '@/publicComponents/VerifyProvider';
import { createContext } from 'react';

export const UserContext = createContext<IUser>({
  name: '',
  privilege: 'none',
});
