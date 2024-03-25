import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Grid, Button } from '@chakra-ui/react';
import { CheckedInType, Match } from '../model/match';
import { TeamList } from './teamList';

export const MatchList: React.FC<{
  matchAll: Match[];
  checkedIn: CheckedInType;
  date: string;
  institute: string;
  sport: string;
  name: string;
  athId: string;
}> = ({ matchAll, checkedIn, date, institute, sport, name }) => {
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

  const [showRegis, setShowRegis] = useState<number>(-1);
  return (
    <VStack align="center" spacing={3} mt={'3dvh'}>
      {matchAll.map((matcheach, index) => {
        const isDateSort = date === '' || date === matcheach.startTime.slice(0, 10);
        const isInstituteSort =
          institute === '' ||
          institute === matcheach.Team_Match_TID1ToTeam.Institute ||
          institute === matcheach.Team_Match_TID2ToTeam.Institute;
        const isSportSort = sport === '' || sport === matcheach.Team_Match_TID1ToTeam.Sport.name;
        const isNameSort =
          name === '' ||
          matcheach.Team_Match_TID1ToTeam.Member.filter((dat) => dat.Athlete.Name.includes(name))
            .length > 0 ||
          matcheach.Team_Match_TID2ToTeam.Member.filter((dat) => dat.Athlete.Name.includes(name))
            .length > 0;
        // const isAthSearch =
        //   athId === '' ||
        //   matcheach.Team_Match_TID1ToTeam.Member.filter((dat) => dat.AId.includes(athId)).length >
        //     0 ||
        //   matcheach.Team_Match_TID2ToTeam.Member.filter((dat) => dat.AId.includes(athId)).length >
        //     0;
        if (!isDateSort) return null;
        if (!isInstituteSort) return null;
        if (!isSportSort) return null;
        if (!isNameSort) return null;
        // if (!isAthSearch) return null;

        const teamARegistered = matcheach.Team_Match_TID1ToTeam.Member.filter((dat) => {
          return (
            checkedIn.filter((ch) => {
              return ch.AID == dat.AId && ch.MID == matcheach.Id;
            }).length > 0
          );
        }).length;

        const teamBRegistered = matcheach.Team_Match_TID2ToTeam.Member.filter((dat) => {
          return (
            checkedIn.filter((ch) => {
              return ch.AID == dat.AId && ch.MID == matcheach.Id;
            }).length > 0
          );
        }).length;

        const teamACount = matcheach.Team_Match_TID1ToTeam.Member.length;
        const teamBCount = matcheach.Team_Match_TID2ToTeam.Member.length;

        const dateDis = matcheach.startTime.split('T')[0];
        const timex = matcheach.startTime.split('T')[1];
        const timeDis = timex.substring(0, timex.length - 5);



        return (
          <Box w={['80dvw', '85dvw']} key={index}>
            <Box display={'flex'} justifyContent={'center'} pt={'6'}>
              <Grid
                templateColumns={['repeat(1, 60dvw)', 'repeat(4, 20dvw)']}
                gap={5}
                mt={'-0.75dvh'}
              >
                <Box bg={'white'}>
                  <Grid templateColumns={'repeat(2, 1fr)'} gap={6}>
                    <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.012]}>
                      {matcheach.Id}
                    </Text>
                    <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.012]}>
                      {matcheach.Team_Match_TID1ToTeam.Sport.name}
                    </Text>
                  </Grid>
                </Box>
                <Box bg={'white'}>
                  <Grid templateColumns={'repeat(2, 1fr)'} gap={6}>
                    <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.012]}>
                      {matcheach.Team_Match_TID1ToTeam.Sport.gender}{' '}
                      {matcheach.Team_Match_TID1ToTeam.Sport.type}
                    </Text>
                    <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.01]}>
                      {matcheach.Description}
                    </Text>
                  </Grid>
                </Box>
                <Box bg={'white'}>
                  <Grid templateColumns={'repeat(2, 1fr)'} gap={6}>
                    <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.012]}>
                      {matcheach.Team_Match_TID1ToTeam.Institute}
                    </Text>
                    <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.012]}>
                      {(teamARegistered / teamACount) * 100 + '%'}
                    </Text>
                  </Grid>
                </Box>
                <Box bg={'white'}>
                  <Grid templateColumns={'repeat(2, 1fr)'} gap={6}>
                    <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.012]}>
                      {matcheach.Team_Match_TID2ToTeam.Institute}
                    </Text>
                    <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.012]}>
                      {(teamBRegistered / teamBCount) * 100 + '%'}
                    </Text>
                  </Grid>
                </Box>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  fontSize={[windowWidth * 0.04, windowWidth * 0.02]}
                >
                  <Button
                    w={['50dvw', '17dvw']}
                    h="5dvh"
                    borderRadius="50"
                    shadow="lg"
                    bg={'#F05A29 !important'}
                    textColor="white"
                    mt={'-0.75dvh'}
                    fontSize={[windowWidth * 0.03, windowWidth * 0.012]}
                    onClick={() => {
                      if (showRegis == index) setShowRegis(-1);
                      else setShowRegis(index);
                    }}
                  >
                    ตรวจสอบการลงทะเบียน
                  </Button>
                </Box>
              </Grid>
            </Box>
            <Box display={'flex'} justifyContent={'center'} pt={'6'}>
              {showRegis == index && (
                <Box
                  pos={'relative'}
                  bg={'#F05A29'}
                  w={['80dvw', '80dvw']}
                  h={['30dvh', '50dvh']}
                  borderRadius={'20'}
                  justifyContent={'center'}
                  overflow={'scroll'}
                  fontSize={[windowWidth * 0.03, windowWidth * 0.015]}
                  textColor={'white'}
                >
                  <Box display={'flex'} justifyContent={'center'} pt={'6'} mb={'5dvh'}>
                    <Box h="10dvh">
                      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(3, 20dvw)']} gap={6}>
                        <Text textAlign={['center', 'left']}>
                          {matcheach.Team_Match_TID1ToTeam.Sport.name}
                        </Text>
                        <Text textAlign={'center'}>
                          {matcheach.Team_Match_TID1ToTeam.Sport.gender}{' '}
                          {matcheach.Team_Match_TID1ToTeam.Sport.type}
                        </Text>
                        <Text textAlign={['center', 'right']}>{matcheach.Description}</Text>
                      </Grid>
                      <Grid
                        templateColumns={['repeat(1, 1fr)', 'repeat(3, 20dvw)']}
                        gap={6}
                        mt={'1dvh'}
                      >
                        <Text textAlign={'left'}>{dateDis}</Text>
                        <Text textAlign={'center'}>{timeDis}</Text>
                        <Text textAlign={'right'}>{matcheach.CompetitionRoom}</Text>
                      </Grid>
                    </Box>
                  </Box>
                  <TeamList TeamMember={matcheach} checkedIn={checkedIn} />
                </Box>
              )}
            </Box>

            <Box bg={'#C1C1C1'} h={1} mt={'2dvh'}></Box>
          </Box>
        );
      })}
    </VStack>
  );
};
