export type ResultListType = {
  Id: number;
  startTime: Date;
  CompetitionRoom: string;
  CompetitionInstitute: string;
  Description: string | null;
  Team_Match_TID1ToTeam: {
    Institute: string;
    Sport: {
      Id: number;
      name: string;
      gender: string;
      type: string;
      group: string | null;
    } | null;
  };
  Team_Match_TID2ToTeam: {
    Institute: string;
    Sport: {
      Id: number;
      name: string;
      gender: string;
      type: string;
      group: string | null;
    } | null;
  };
  Result: 'waiting' | 'Team1' | 'Team2' | null;
  isVerify: boolean;
};

export type AvailableTeamType = {
  A: {
    Id: number;
    Institute: string;
    SID: number;
  }[];
  B: {
    Id: number;
    Institute: string;
    SID: number;
  }[];
};
