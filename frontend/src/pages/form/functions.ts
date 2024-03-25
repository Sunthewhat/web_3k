import { TFormData, TFormType, TSportSex, TSportTeamType, TSportType } from './types';

export const football: TFormType[] = [
  'manager',
  'coach',
  'coach assistance',
  'staff',
  'staff',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
];

export const futsal: TFormType[] = [
  'manager',
  'coach',
  'coach assistance',
  'coach assistance',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
];

export const basketball: TFormType[] = [
  'manager',
  'coach',
  'coach assistance',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
];

export const volleyball: TFormType[] = [
  'manager',
  'coach',
  'coach assistance',
  'coach assistance',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
  'athlete type1',
];

export const badmintonSolo: TFormType[] = ['manager', 'coach', 'coach assistance', 'athlete type2'];

export const badmintonDuo: TFormType[] = [
  'manager',
  'coach',
  'coach assistance',
  'athlete type2',
  'athlete type2',
];

export const tabletennisSolo: TFormType[] = [
  'manager',
  'coach',
  'coach assistance',
  'athlete type2',
];

export const tabletennisDuo: TFormType[] = [
  'manager',
  'coach',
  'coach assistance',
  'athlete type2',
  'athlete type2',
];

export const bridge: TFormType[] = [
  'manager',
  'coach',
  'athlete type2',
  'athlete type2',
  'athlete type2',
  'athlete type2',
  'athlete type2',
  'athlete type2',
];

export const patangueDuo: TFormType[] = [
  'manager',
  'coach',
  'coach assistance',
  'athlete type2',
  'athlete type2',
];
export const patangueTeam: TFormType[] = [
  'manager',
  'coach',
  'coach assistance',
  'athlete type2',
  'athlete type2',
  'athlete type2',
  'athlete type2',
];

export const esport: TFormType[] = [
  'manager',
  'coach',
  'athlete type2',
  'athlete type2',
  'athlete type2',
  'athlete type2',
  'athlete type2',
  'athlete type2',
];

export const getFormTypeArrays = (sport: TSportType, team: TSportTeamType) => {
  switch (sport) {
    case 'football':
      return football;
    case 'futsal':
      return futsal;
    case 'basketball':
      return basketball;
    case 'volleyball':
      return volleyball;
    case 'badminton':
      return team === 'solo' ? badmintonSolo : badmintonDuo;
    case 'bridge':
      return bridge;
    case 'esport':
      return esport;
    case 'petangue':
      return team === 'duo' ? patangueDuo : patangueTeam;
    case 'table tennis':
      return team === 'solo' ? tabletennisSolo : tabletennisDuo;
  }
};

export const header = (
  index: number,
  formPattern: TFormType[],
  formType: TFormType,
  sport: TSportType | undefined,
  team: TSportTeamType | undefined,
  sex: TSportSex | undefined,
  playerNumber: number | undefined,
) => {
  switch (formType) {
    case 'manager':
      return 'ผู้จัดการทีม';
    case 'staff':
      if (formPattern[index - 1] !== 'staff' && formPattern[index + 1] !== 'staff') {
        return 'เจ้าหน้าที่ทั่วไป';
      } else {
        return 'เจ้าหน้าที่ทั่วไป คนที่ ' + (formPattern[index - 1] === 'staff' ? '2' : '1');
      }
    case 'coach':
      return 'ผู้ฝึกสอน';
    case 'coach assistance':
      return 'ผู้ช่วยผู้ฝึกสอน';
    case 'datafiller':
      return 'ผู้กรอกข้อมูล';
  }
  let title = '';
  switch (sport) {
    case 'basketball':
      title += 'นักกีฬาบาสเกตบอล';
      break;
    case 'futsal':
      title += 'นักกีฬาฟุตซอล';
      break;
    case 'football':
      title += 'นักกีฬาฟุตบอล';
      break;
    case 'volleyball':
      title += 'นักกีฬาวอลเลย์บอล';
      break;
    case 'badminton':
      title += 'นักกีฬาแบดมินตัน';
      break;
    case 'bridge':
      title += 'นักกีฬาบริดจ์';
      break;
    case 'esport':
      title += 'นักกีฬาอีสปอร์ต';
      break;
    case 'petangue':
      title += 'นักกีฬาเปตอง';
      break;
    case 'table tennis':
      title += 'นักกีฬาเทเบิลเทนนิส';
      break;
  }
  title += sex === 'male' ? 'ชาย ' : sex === 'female' ? 'หญิง ' : ' ';
  title +=
    formType === 'athlete type2'
      ? team === 'solo'
        ? 'เดี่ยว'
        : team === 'team'
          ? 'ทีม'
          : team === 'duo'
            ? 'คู่'
            : ''
      : '';
  title += team === 'ROV' ? 'ROV' : team === 'Valorant' ? 'Valorant' : '';
  title += sex === 'mix' ? 'ผสม' : '';
  title += team === 'solo' ? '' : ` คนที่ ${playerNumber}`;
  return title;
};

export const getTitleName = (data: TFormData) => {
  if (data.role !== 'นักกีฬา') return data.role;
  return 'นักกีฬาคนที่ ' + data.number;
};

export const initData = (
  type: TFormType,
  university: string,
  sportType: TSportType,
  team: TSportTeamType,
  sex: TSportSex,
) => {
  const data: TFormData = {
    university: university,
    sport: sportType,
    sportType: sex,
    team: team,
    role:
      type === 'datafiller'
        ? 'ผู้กรอกข้อมูล'
        : type === 'manager'
          ? 'ผู้จัดการทีม'
          : type === 'staff'
            ? 'เจ้าหน้าที่ทั่วไป'
            : type === 'coach'
              ? 'ผู้ฝึกสอน'
              : type === 'coach assistance'
                ? 'ผู้ช่วยผู้ฝึกสอน'
                : 'นักกีฬา',
    number: type === 'athlete type2' || type === 'athlete type1' ? '-' : '',
    prefix: '',
    name: '',
    shirt: type === 'datafiller' ? '-' : '',
    pants: type === 'athlete type1' ? '' : '-',
    phone: type === 'athlete type1' || type === 'athlete type2' ? '-' : '',
    allergies: type === 'datafiller' ? '-' : '',
    studentId:
      type === 'athlete type1' || type === 'athlete type2' || type === 'datafiller' ? '' : '-',
    email: '',
  };
  return data;
};
