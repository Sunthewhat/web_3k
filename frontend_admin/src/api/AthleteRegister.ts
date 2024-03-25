import { Axios } from '@/AxiosInstance';

export const getAthleteSport = async (id: string) => {
  try {
    const response = await Axios.get('/api/athleteRegister/getSport/' + id);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getMatch = async () => {
  try {
    const response = await Axios.get('/api/athleteRegister/getMatch');
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const sendAthLogin = async (mID: number, aID: string) => {
  try {
    const response = await Axios.get(`/api/athleteRegister/regis/${mID}/${aID}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getLogs = async () => {
  try {
    const response = await Axios.get('/api/athleteRegister/checkin');
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getAthleteName = async (aid: string) => {
  try {
    const response = await Axios.get(`/api/athleteRegister/athname/${aid}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getLogsByAid = async (aid: string) => {
  try {
    const response = await Axios.get(`/api/athleteRegister/getlogsbyaid/${aid}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getStaffName = async (sid: string) => {
  try {
    const response = await Axios.get(`/api/athleteRegister/staffname/${sid}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return '';
  }
};

export const registerStaff = async (sid: string) => {
  try {
    const response = await Axios.get(`/api/athleteRegister/regisstaff/${sid}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return '';
  }
};
