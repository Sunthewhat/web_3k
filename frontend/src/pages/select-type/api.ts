import { Axios } from '@/AxiosInstance';

export const getAvailability = async (sport: string, institute: string) => {
  const sportParam = sport === 'Tabletennis' ? 'Table tennis' : sport;
  const res = await Axios.get(`/api/form/sport/${sportParam}/${institute}`);
  return res.data;
};
