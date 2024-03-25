export type TFormType =
  | 'manager'
  | 'coach'
  | 'coach assistance'
  | 'staff'
  | 'athlete type1'
  | 'athlete type2'
  | 'confirm'
  | 'datafiller';

export type TFormData = {
  university: string;
  sport: string;
  sportType?: string; //SexType
  team: string; //teamType
  role: string;
  number?: string;
  prefix: string;
  name: string;
  shirt: string;
  pants?: string;
  phone?: string;
  allergies: string;
  studentId: string;
  email: string;
};

export const InitialStateFormData = {
  university: '',
  sport: '',
  sportType: '',
  team: '',
  role: '',
  number: '',
  prefix: '',
  name: '',
  shirt: '',
  pants: '',
  phone: '',
} as TFormData;

export type TSportType =
  | 'football'
  | 'futsal'
  | 'basketball'
  | 'volleyball'
  | 'badminton'
  | 'bridge'
  | 'esport'
  | 'petangue'
  | 'table tennis';

export type TSportSex = 'male' | 'female' | 'mix' | 'none';
export type TSportTeamType = 'solo' | 'duo' | 'team' | 'ROV' | 'Valorant';
