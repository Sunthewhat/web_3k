import { Axios } from '@/AxiosInstance';

export const logout = async () => {
  try {
    await Axios.get('/api/auth/logout');
  } catch (err) {
    console.log(err);
  }
};
