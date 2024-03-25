import Futsal from '../../assets/image/futsal.png';
import Football from '../../assets/image/football.png';
import Basketball from '../../assets/image/basketball.png';
import Volleyball from '../../assets/image/volleyball.png';
import Badminton from '../../assets/image/badminton.png';
import TableTennis from '../../assets/image/tabletennis.png';
import Esport from '../../assets/image/esport.png';
import Petangue from '../../assets/image/petangue.png';
import Bridge from '../../assets/image/bridge.png';

export interface ButtonListProps {
  buttonNames: string[][];
  gender: string[][];
  teamType: string[][];
  handleButtonClick: (
    buttonIndex: number,
    innerIndex: number,
    gender: string[][],
    teamType: string[][],
  ) => void;
  available: {
    id: number;
    sport: string;
    sex: string;
    type: string;
    institute: string;
    status: boolean;
  }[];
}

export interface sportType {
  title: string;
  image: {
    src: string;
    alt: string;
  };
  sptype: string[][];
  TSportSex: string[][];
  TSportTeamType: string[][];
}

export const sportType: { [key: string]: sportType } = {
  Futsal: {
    title: 'Futsal',
    image: {
      src: Futsal,
      alt: 'Futsal Logo',
    },
    sptype: [['ทีมชาย']],
    TSportSex: [['male']],
    TSportTeamType: [['team']],
  },
  Football: {
    title: 'Football',
    image: {
      src: Football,
      alt: 'Football Logo',
    },
    sptype: [['ทีมชาย']],
    TSportSex: [['male']],
    TSportTeamType: [['team']],
  },
  Basketball: {
    title: 'Basketball',
    image: {
      src: Basketball,
      alt: 'Basketball Logo',
    },
    sptype: [['ทีมชาย', 'ทีมหญิง']],
    TSportSex: [['male', 'female']],
    TSportTeamType: [['team', 'team']],
  },
  Volleyball: {
    title: 'Volleyball',
    image: {
      src: Volleyball,
      alt: 'Volleyball Logo',
    },
    sptype: [['ทีมชาย', 'ทีมหญิง']],
    TSportSex: [['male', 'female']],
    TSportTeamType: [['team', 'team']],
  },
  Badminton: {
    title: 'Badminton',
    image: {
      src: Badminton,
      alt: 'Badminton Logo',
    },
    sptype: [['ชายเดี่ยว', 'หญิงเดี่ยว'], ['ชายคู่', 'หญิงคู่'], ['คู่ผสม']],
    TSportSex: [['male', 'female'], ['male', 'female'], ['mix']],
    TSportTeamType: [['solo', 'solo'], ['duo', 'duo'], ['duo']],
  },
  Bridge: {
    title: 'Bridge',
    image: {
      src: Bridge,
      alt: 'Bridge Logo',
    },
    sptype: [['บริดจ์ทีม']],
    TSportSex: [['none']],
    TSportTeamType: [['team']],
  },
  Esport: {
    title: 'E-Sport',
    image: {
      src: Esport,
      alt: 'E-Sport Logo',
    },
    sptype: [
      ['ROV (ทีมชาย)', 'ROV (ทีมหญิง)'],
      ['ROV (ทีมผสม)', 'Valorant'],
    ],
    TSportSex: [
      ['male', 'female'],
      ['mix', 'none'],
    ],
    TSportTeamType: [
      ['ROV', 'ROV'],
      ['ROV', 'Valorant'],
    ],
  },
  Petangue: {
    title: 'Petangue',
    image: {
      src: Petangue,
      alt: 'Petangue Logo',
    },
    sptype: [
      ['ชายคู่', 'หญิงคู่'],
      ['ทีมชาย', 'ทีมหญิง'],
    ],
    TSportSex: [
      ['male', 'female'],
      ['male', 'female'],
    ],
    TSportTeamType: [
      ['duo', 'duo'],
      ['team', 'team'],
    ],
  },
  Tabletennis: {
    title: 'Table tennis',
    image: {
      src: TableTennis,
      alt: 'TableTennis Logo',
    },
    sptype: [['ชายเดี่ยว', 'หญิงเดี่ยว'], ['ชายคู่', 'หญิงคู่'], ['คู่ผสม']],
    TSportSex: [['male', 'female'], ['male', 'female'], ['mix']],
    TSportTeamType: [['solo', 'solo'], ['duo', 'duo'], ['duo']],
  },
};
