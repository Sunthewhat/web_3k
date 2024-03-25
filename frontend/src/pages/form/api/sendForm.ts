import { Axios } from '@/AxiosInstance';
import { TFormData } from '../types';

export const sendForm = async (data: TFormData[]) => {
  const response = await Axios.post('/api/form/send', data);
  return response;
};
