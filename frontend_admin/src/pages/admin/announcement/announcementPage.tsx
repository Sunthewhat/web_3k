import { FC, useEffect, useState } from 'react';
import AnnouncementContainer from '@/pages/admin/home/announcementComponents/announcementContainer';

const AnnouncementPage: FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowHeight, windowWidth]);
  return <AnnouncementContainer windowHeight={windowHeight} windowWidth={windowWidth} />;
};

export default AnnouncementPage;
