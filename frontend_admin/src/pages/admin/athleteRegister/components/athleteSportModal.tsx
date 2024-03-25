import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Grid, Button } from '@chakra-ui/react';
import { getLogsByAid, sendAthLogin } from '@/api/AthleteRegister';

export type AthleteData = {
  Id: number;
  startTime: string;
  CompetitionRoom: string;
  CompetitionInstitute: string;
  Description: string;
  TID1: number;
  TID2: number;
  Result: null | any;
  isVerify: null | boolean;
  Scoreinput: null | any;
  Team_Match_TID1ToTeam: {
    Sport: {
      Id: number;
      name: string;
      gender: string;
      type: string;
      group: string;
    };
  };
};

type logsType = {
  AID: string;
  Id: number;
  MID: number;
  stamp: string;
}[];

export const SportList: React.FC<{
  athleteSports: AthleteData[];
  athId: string;
  onClose: () => void;
  fetchCheckedIn: () => Promise<void>;
}> = ({ athleteSports, athId, onClose, fetchCheckedIn }) => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const handleRegis = async (mID: number) => {
    await sendAthLogin(mID, athId);
    await fetchCheckedIn();
    onClose();
  };

  const [logs, setLogs] = useState<logsType>([]);

  const fetchLogs = async () => {
    const response = await getLogsByAid(athId);
    setLogs(response);
    console.log(response);
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <VStack align="center" spacing={3}>
      {athleteSports.map((athleteSport, index) => {
        const date = athleteSport.startTime.split('T')[0];
        const timex = athleteSport.startTime.split('T')[1];
        const time = timex.substring(0, timex.length - 5);
        if (
          logs.filter((dat) => {
            return dat.MID == athleteSport.Id;
          }).length > 0
        )
          return null;
        return (
          <Box
            key={index}
            w={'60dvw'}
            color={'black'}
            bg={'white'}
            px={'2dvw'}
            py={['2dvw', '1dvw']}
            borderRadius={['10', '20']}
            fontSize={['5dvh', '3dvh']}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              pos={'relative'}
              fontSize={[windowWidth * 0.04, windowWidth * 0.02]}
            >
              <Grid templateColumns={['repeat(1, 60dvw)']} gap={1}>
                <Grid templateColumns={['repeat(1, 60dvw)', 'repeat(2, 30dvw)']} gap={1}>
                  <Text textAlign={'center'}>
                    กีฬา : {athleteSport.Team_Match_TID1ToTeam.Sport.name}
                  </Text>
                  <Text textAlign={'center'}>
                    ประเภท : {athleteSport.Team_Match_TID1ToTeam.Sport.gender}{' '}
                    {athleteSport.Team_Match_TID1ToTeam.Sport.type}
                  </Text>
                  <Text textAlign={'center'}>เวลา : {time + ' ' + date}</Text>
                  <Text textAlign={'center'}>รอบ : {athleteSport.Description}</Text>
                </Grid>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  pos={'relative'}
                  fontSize={[windowWidth * 0.04, windowWidth * 0.02]}
                >
                  <Button
                    w="30dvw"
                    maxW="200px"
                    h="5dvh"
                    borderRadius="50"
                    shadow="lg"
                    bg={'#00BC66 !important'}
                    textColor="white"
                    m={[1, 3]}
                    fontSize={[windowWidth * 0.04, windowWidth * 0.012]}
                    onClick={() => {
                      handleRegis(athleteSport.Id);
                    }}
                  >
                    ลงทะเบียน
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Box>
        );
      })}
    </VStack>
  );
};
