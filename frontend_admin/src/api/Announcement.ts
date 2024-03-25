import { Axios } from '@/AxiosInstance';

export const getAnnouncement = async () => {
  try {
    const response = await Axios.get('/api/announcement');
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const setVisibility = async (id: number, value: boolean) => {
  try {
    await Axios.post('/api/announcement/setvisibility', { id, value });
  } catch (err) {
    console.log(err);
  }
};

export const editContent = async (id: number, content: string) => {
  try {
    await Axios.post('/api/announcement/setContent', { id, content });
  } catch (err) {
    console.log(err);
  }
};

export const createAnnouncement = async (content: string, isShowing: boolean) => {
  try {
    const res = await Axios.post('/api/announcement/create', { content, isShowing });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnnouncement = async (id: number) => {
  try {
    await Axios.post('/api/announcement/delete', { id });
  } catch (err) {
    console.log(err);
  }
};
