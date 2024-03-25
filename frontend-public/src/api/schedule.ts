import { Axios } from '@/AxiosInstance';

export type IMatch = {
  Id: number;
  startTime: string;
  CompetitionRoom: string;
  CompetitionInstitute: string;
  Description: string;
  Team_Match_TID1ToTeam: {
    Institute: string;
    Sport: {
      Id: number;
      name: string;
      gender: string;
      type: string;
      group: string;
    };
  };
  Team_Match_TID2ToTeam: {
    Institute: string;
    Sport: {
      Id: number;
      name: string;
      gender: string;
      type: string;
      group: string;
    };
  };
  Result: string | null;
  isVerify: boolean;
  Score: {
    T1_Score: number;
    T2_Score: number;
  }[];
}[];

export const getMatch = async (): Promise<IMatch> => {
  const response = await Axios.get('/api/schedule/getMatch');
  return response.data;
};
