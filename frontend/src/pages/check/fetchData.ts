import { Axios } from '@/AxiosInstance';

export const fetchData = async (params: string) => {
  const res = await Axios.get(`/api/form/available/${params}`);
  return res;
};
