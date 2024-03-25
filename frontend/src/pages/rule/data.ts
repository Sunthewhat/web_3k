import Futsal from '../../assets/image/futsal.png';
import Football from '../../assets/image/football.png';
import Basketball from '../../assets/image/basketball.png';
import Volleyball from '../../assets/image/volleyball.png';
import Badminton from '../../assets/image/badminton.png';
import TableTennis from '../../assets/image/tabletennis.png';
import Esport from '../../assets/image/esport.png';
import Petangue from '../../assets/image/petangue.png';
import Bridge from '../../assets/image/bridge.png';

export interface ISportRule {
  title: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  component: {
    text: string;
    fw: number;
  };
  team: {
    text: string;
    color: string;
    fw: number;
  };
  detail: {
    text: string;
  }[];
  caution: {
    text: string;
  }[];
  informationTitle: {
    text: string;
    fw: number;
  };
  information: {
    text: string;
  };
}

export const sportRule: { [key: string]: ISportRule } = {
  Futsal: {
    title: 'Futsal',
    image: {
      src: Futsal,
      alt: 'Futsal Logo',
      width: 280,
      height: 333.333,
    },
    component: { text: 'องค์ประกอบของกีฬาฟุตซอล', fw: 700 },
    team: { text: 'ทีมชาย 1 ทีม', color: 'red', fw: 700 },
    detail: [
      { text: '· นักกีฬาฟุตซอล จำนวน 17 คน' },
      { text: '· ผู้จัดการทีม จํานวน 1 คน' },
      { text: '· ผู้ฝึกสอน จํานวน 1 คน' },
      { text: '· ผู้ช่วยผู้ฝึกสอน จํานวน 2 คน' },
    ],
    caution: [],
    informationTitle: { text: 'ข้อมูลที่ต้องใช้ในการลงทะเบียน', fw: 700 },
    information: {
      text: 'ชื่อ - นามสกุล ช่องทางการติดต่อผู้จัดการทีม หมายเลขผู้เล่น (1-17) ไซส์เสื้อ ไซส์กางเกง และอาหารที่แพ้',
    },
  },

  Football: {
    title: 'Football',
    image: {
      src: Football,
      alt: 'Football Logo',
      width: 280,
      height: 333.333,
    },
    component: { text: 'องค์ประกอบของกีฬาฟุตบอล', fw: 700 },
    team: { text: 'ทีมชาย 1 ทีม', color: 'red', fw: 700 },
    detail: [
      { text: '· นักกีฬาฟุตบอล จำนวน 25 คน' },
      { text: '· ผู้จัดการทีม จํานวน 1 คน' },
      { text: '· ผู้ฝึกสอน จํานวน 1 คน' },
      { text: '· ผู้ช่วยผู้ฝึกสอน จํานวน 1 คน' },
      { text: '· เจ้าหน้าที่ทั่วไป จํานวน 2 คน' },
    ],
    caution: [],
    informationTitle: { text: 'ข้อมูลที่ต้องใช้ในการลงทะเบียน', fw: 700 },
    information: {
      text: 'ชื่อ - นามสกุล ช่องทางการติดต่อผู้จัดการทีม หมายเลขผู้เล่น (1-25) ไซส์เสื้อ ไซส์กางเกง และอาหารที่แพ้',
    },
  },

  Basketball: {
    title: 'Basketball',
    image: {
      src: Basketball,
      alt: 'Basketball Logo',
      width: 280,
      height: 333.333,
    },
    component: { text: 'องค์ประกอบของกีฬาบาสเกตบอล', fw: 700 },
    team: { text: 'ทีมชาย 1 ทีม / ทีมหญิง 1 ทีม', color: 'red', fw: 700 },
    detail: [
      { text: '· นักกีฬาบาสเกตบอล จำนวน 12 คน' },
      { text: '· ผู้จัดการทีม จํานวน 1 คน' },
      { text: '· ผู้ฝึกสอน จํานวน 1 คน' },
      { text: '· ผู้ช่วยผู้ฝึกสอน จํานวน 1 คน' },
    ],
    caution: [],
    informationTitle: { text: 'ข้อมูลที่ต้องใช้ในการลงทะเบียน', fw: 700 },
    information: {
      text: 'ชื่อ - นามสกุล ช่องทางการติดต่อผู้จัดการทีม หมายเลขผู้เล่น (1-12) ไซส์เสื้อ ไซส์กางเกง และอาหารที่แพ้',
    },
  },

  Volleyball: {
    title: 'Volleyball',
    image: {
      src: Volleyball,
      alt: 'Volleyball Logo',
      width: 280,
      height: 333.333,
    },
    component: { text: 'องค์ประกอบของกีฬาวอลเลย์บอล', fw: 700 },
    team: { text: 'ทีมชาย 1 ทีม / ทีมหญิง 1 ทีม', color: 'red', fw: 700 },
    detail: [
      { text: '· นักกีฬาวอลเลย์บอล จำนวน 12 คน' },
      { text: '· ผู้จัดการทีม จํานวน 1 คน' },
      { text: '· ผู้ฝึกสอน จํานวน 1 คน' },
      { text: '· ผู้ช่วยผู้ฝึกสอน จํานวน 2 คน' },
    ],
    caution: [],
    informationTitle: { text: 'ข้อมูลที่ต้องใช้ในการลงทะเบียน', fw: 700 },
    information: {
      text: 'ชื่อ - นามสกุล ช่องทางการติดต่อผู้จัดการทีม หมายเลขผู้เล่น (1-12) ไซส์เสื้อ ไซส์กางเกง และอาหารที่แพ้',
    },
  },

  Badminton: {
    title: 'Badminton',
    image: {
      src: Badminton,
      alt: 'Badminton Logo',
      width: 280,
      height: 333.333,
    },
    component: { text: 'องค์ประกอบของกีฬาแบดมินตัน', fw: 700 },
    team: {
      text: 'ชายเดี่ยว 2 คน / หญิงเดี่ยว 2 คน / ชายคู่ 2 ทีม / หญิงคู่ 2 ทีม / ผสม 2 ทีม',
      color: 'red',
      fw: 700,
    },
    detail: [
      { text: '· นักกีฬาแบดมินตัน จำนวนตามประเภท' },
      { text: '· ผู้จัดการทีม จํานวน 1 คน' },
      { text: '· ผู้ฝึกสอน จํานวน 1 คน' },
      { text: '· ผู้ช่วยผู้ฝึกสอน จํานวน 1 คน' },
    ],
    caution: [{ text: '*นักกีฬาสามารถลงแข่งซ้ำซ้อนได้' }, { text: '*ผู้จัดการทีมสามารถซ้ำกันได้' }],
    informationTitle: { text: 'ข้อมูลที่ต้องใช้ในการลงทะเบียน', fw: 700 },
    information: {
      text: 'ชื่อ - นามสกุล ช่องทางการติดต่อผู้จัดการทีม หมายเลขผู้เล่น (1-12) ไซส์เสื้อ ไซส์กางเกง และอาหารที่แพ้',
    },
  },

  Bridge: {
    title: 'Bridge',
    image: {
      src: Bridge,
      alt: 'Bridge Logo',
      width: 280,
      height: 333.333,
    },
    component: { text: 'องค์ประกอบของกีฬาบริดจ์', fw: 700 },
    team: { text: '1 ทีม ไม่จำกัดเพศ', color: 'red', fw: 700 },
    detail: [
      { text: '· นักกีฬาบริดจ์ 1 ทีม จำนวน 6 คน' },
      { text: '· ผู้จัดการทีม จํานวน 1 คน' },
      { text: '· ผู้ฝึกสอน จํานวน 1 คน' },
    ],
    caution: [{ text: '*นักกีฬาสามารถลงแข่งซ้ำซ้อนได้' }, { text: '*ผู้จัดการทีมสามารถซ้ำกันได้' }],
    informationTitle: { text: 'ข้อมูลที่ต้องใช้ในการลงทะเบียน', fw: 700 },
    information: { text: 'ชื่อ - นามสกุล ช่องทางการติดต่อผู้จัดการ ไซส์เสื้อ และอาหารที่แพ้' },
  },

  Esport: {
    title: 'E-Sport',
    image: {
      src: Esport,
      alt: 'E-Sport Logo',
      width: 280,
      height: 333.333,
    },
    component: { text: 'องค์ประกอบของกีฬา E - Sport 1 ทีม', fw: 700 },
    team: {
      text: 'ROV (ทีมชาย,ทีมหญิง,ทีมผสม อย่างละ 1 ทีม) VALORANT (บุคคลทั่วไป 1 ทีม) ',
      color: 'red',
      fw: 700,
    },
    detail: [
      { text: '· นักกีฬา E- Sport จำนวน 5 + สำรอง 1 คน ' },
      { text: '· ผู้จัดการทีม จํานวน 1 คน' },
      { text: '· ผู้ฝึกสอน จํานวน 1 คน' },
    ],
    caution: [
      {
        text: '*ROV หากเป็นทีมผสม ต้องมีผู้หญิงในทีมอย่างน้อย 3 คน และห้ามส่งนักกีฬาเกิน 15 คน โดยแบ่งเป็น ชายไม่เกิน 7 คน หญิง ไม่เกิน 8 คน',
      },
    ],
    informationTitle: { text: 'ข้อมูลที่ต้องใช้ในการลงทะเบียน', fw: 700 },
    information: { text: 'ชื่อ - นามสกุล ช่องทางการติดต่อผู้จัดการ ไซส์เสื้อ และอาหารที่แพ้' },
  },

  Petangue: {
    title: 'Petangue',
    image: {
      src: Petangue,
      alt: 'Petangue Logo',
      width: 280,
      height: 333.333,
    },
    component: { text: 'องค์ประกอบของกีฬาเปตอง', fw: 700 },
    team: { text: 'ชาย 1 คู่ /หญิง1 คู่ /ทีมชาย 1 / ทีมหญิง 1 ', color: 'red', fw: 700 },
    detail: [
      { text: '· นักกีฬาเปตอง จำนวนตามประเภท (ทีม 4 คน)' },
      { text: '· ผู้จัดการทีม จํานวน 1 คน' },
      { text: '· ผู้ฝึกสอน จํานวน 1 คน' },
      { text: '· ผู้ช่วยผู้ฝึกสอน จํานวน 1 คน ' },
    ],
    caution: [{ text: '*ประเภททีมสามารถส่งได้เพียง 1 ทีม และต้องเป็นเพศเดียวกันทั้งหมด ' }],
    informationTitle: { text: 'ข้อมูลที่ต้องใช้ในการลงทะเบียน', fw: 700 },
    information: { text: 'ชื่อ - นามสกุล ช่องทางการติดต่อผู้จัดการ ไซส์เสื้อ และอาหารที่แพ้' },
  },

  Tabletennis: {
    title: 'Table Tennis',
    image: {
      src: TableTennis,
      alt: 'Table Tennis Logo',
      width: 280,
      height: 333.333,
    },
    component: { text: 'องค์ประกอบของกีฬาเทเบิลเทนนิส 1 ทีม', fw: 700 },
    team: {
      text: 'ชายเดี่ยว 2 คน / หญิงเดี่ยว 2 คน / ชายคู่ 2 ทีม / หญิงคู่ 2 ทีม / คู่ผสม 2 ทีม',
      color: 'red',
      fw: 700,
    },
    detail: [
      { text: '· นักกีฬาเทเบิลเทนนิส จำนวนตามประเภท' },
      { text: '· ผู้จัดการทีม จํานวน 1 คน' },
      { text: '· ผู้ฝึกสอน จํานวน 1 คน' },
      { text: '· ผู้ช่วยผู้ฝึกสอน จํานวน 1 คน ' },
    ],
    caution: [
      { text: '*นักกีฬา 1 คนลงได้ไม่เกิน 2 ประเภท' },
      { text: '*สถาบันห้ามส่งนักกีฬารวมเกิน 10 คน(ชาย5/หญิง5)' },
    ],
    informationTitle: { text: 'ข้อมูลที่ต้องใช้ในการลงทะเบียน', fw: 700 },
    information: { text: 'ชื่อ - นามสกุล ช่องทางการติดต่อผู้จัดการ ไซส์เสื้อ และอาหารที่แพ้' },
  },
};
