export interface Athlete {
  Id: string;
  Prefix: string;
  Name: string;
  SID: string;
  Concern: string | null;
}

export interface TeamMember {
  id: number;
  TId: number;
  AId: string;
  Athlete: Athlete;
}

export interface Sport {
  Id: number;
  name: string;
  gender: string;
  type: string;
  group: string;
}

export interface Team {
  Id: number;
  Institute: string;
  SID: number;
  Sport: Sport;
  Member: TeamMember[];
}

export interface Match {
  Id: number;
  startTime: string;
  CompetitionRoom: string;
  CompetitionInstitute: string;
  Description: string;
  TID1: number;
  TID2: number;
  Result: any;
  isVerify: boolean;
  Scoreinput: any;
  Team_Match_TID1ToTeam: Team;
  Team_Match_TID2ToTeam: Team;
}

export type CheckedInType = {
  AID: string;
  Id: number;
  MID: number;
  stamp: string;
}[];

export type Staff = {
  Id: string;
  Name: string;
  Position: string;
  Prefix: string;
  Telephone: string | null;
};
