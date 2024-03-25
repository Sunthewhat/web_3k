import { FC, useEffect, useState } from 'react';
import { Verify } from '@/api/Verify';
import { RouterProvider } from 'react-router-dom';
import { PublicRoutes } from '@/routes/public.routes';
import { AdminRoutes } from '@/routes/admin.routes';
import { UserContext } from '@/contexts/userContext';

export type IUser = {
  name: string;
  privilege: 'admin' | 'moderator' | 'none';
};

const publicRoutes = PublicRoutes;
const adminRoutes = AdminRoutes;
let deliveredRoutes = PublicRoutes;

const VerifyProvider: FC = () => {
  const mockUser: IUser = {
    name: '',
    privilege: 'none',
  };
  const [user, setUser] = useState<IUser>(mockUser);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const fetchVerifyStatus = async () => {
    setIsLoaded(false);
    const response = await Verify();
    switch (response.status) {
      case 'verified':
        deliveredRoutes = adminRoutes;
        setUser({
          name: response.name,
          privilege: response.privilege,
        });
        break;
      default:
        deliveredRoutes = publicRoutes;
        setUser(mockUser);
        break;
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchVerifyStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wait until the verify api is done
  return isLoaded ? (
    <UserContext.Provider value={user}>
      <RouterProvider router={deliveredRoutes} />
    </UserContext.Provider>
  ) : (
    <></>
  );
};

export default VerifyProvider;
