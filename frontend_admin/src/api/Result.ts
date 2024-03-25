import { Axios } from '@/AxiosInstance';

export const getResultList = async (date: string, institute: string, sport: string) => {
  try {
    date = date === '' ? 'all' : date;
    institute = institute === '' ? 'all' : institute;
    sport = sport === '' ? 'all' : sport;
    const response = await Axios.get(`/api/result/matchFiltered/${date}/${institute}/${sport}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getRoundList = async (matchId: number) => {
  try {
    const response = await Axios.get(`/api/result/round/${matchId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addRound = async (matchId: number) => {
  try {
    const response = await Axios.post('/api/result/round', {
      matchId,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const editRound = async (id: number, t1Score: number, t2Score: number) => {
  try {
    const response = await Axios.put('/api/result/round', {
      id,
      t1Score,
      t2Score,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteRound = async (id: number) => {
  try {
    const response = await Axios.delete(`/api/result/round/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const verifyResult = async (
  id: number,
  sport: string,
  winner: string,
  isHaveMedal: boolean,
  team1: string,
  team1Medal: string,
  team2: string,
  team2Medal: string
) => {
  try {
    const response = await Axios.post(
      `/api/result/verify/${id}/${sport}/${winner}/${isHaveMedal}/${team1}/${
        team1Medal === '' ? 'none' : team1Medal
      }/${team2}/${team2Medal === '' ? 'none' : team2Medal}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const findTeam = async (
  sport: string,
  gender: string,
  type: string,
  Agroup: string,
  Bgroup: string
) => {
  try {
    const response = await Axios.get(
      `/api/result/addteam/${sport}/${gender}/${type}/${Agroup}/${Bgroup}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const addMatch = async (
  TID1: string,
  TID2: string,
  date: string,
  time: string,
  location: string,
  institute: string,
  Description: string
) => {
  //2024-02-08T01:16:14.561Z
  const dateTime = date + 'T' + time + ':00.000Z';
  try {
    const response = await Axios.post(
      `/api/result/newmatch/${TID1}/${TID2}/${dateTime}/${location}/${institute}/${Description}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
