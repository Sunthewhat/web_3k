import { Axios } from '@/AxiosInstance';

export const getMedal = async () => {
  const response = await Axios.get('/api/medal/getScore');
  return response.data;
};
export const getScoreInput = async () => {
  const response = await Axios.get('/api/medal/getScoreInput');
  return response.data;
}
