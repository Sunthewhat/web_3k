import { Axios } from '@/AxiosInstance';

export type IVerifyResponse = {
  name: string;
  privilege: 'admin' | 'moderator';
  status: string;
};

export const Verify = async (): Promise<any> => {
  const response = await Axios.get('/api/auth/verify').catch(() => {
    return { data: { name: '', privilege: 'none', status: 'error' } };
  });
  return response.data;
};
