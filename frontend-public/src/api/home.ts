import { Axios } from '@/AxiosInstance';

export type AnnouncementType = ({
  User: {
    name: string;
  };
} & {
  announcementId: number;
  content: string;
  createdTime: Date;
  isShowing: boolean;
  userId: number;
})[];

export const getAnnouncement = async (): Promise<AnnouncementType> => {
  return await Axios.get('/api/announcement/').then((res) => res.data)
};
