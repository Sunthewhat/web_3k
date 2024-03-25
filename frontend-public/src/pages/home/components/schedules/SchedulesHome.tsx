import React from 'react';

import { getMatch } from '@/api/schedule';
import MascotTorch from '@/public/assets/torch-middle.png';
import {
  Box,
  Button,
  Collapse,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import ScheduleHomeCard from '../schedulesCard';

interface ScheduleInfoTextProps {
  startTime: string;
  team1: string;
  team2: string;
  sport: string;
  type: string;
  gender: string;
}

type SportsGenderTranslate = {
  [key: string]: string;
};

const sportsGenderTranslate: SportsGenderTranslate = {
  'solo male': 'ชายเดี่ยว',
  'solo female': 'หญิงเดี่ยว',
  'duo mix': 'คู่ผสม',
  'duo male': 'คู่ชาย',
  'duo female': 'คู่หญิง',
  'team male': 'ทีมชาย',
  'team female': 'ทีมหญิง',
};

function ScheduleInfoText({ startTime, team1, team2, sport, type, gender }: ScheduleInfoTextProps) {
  const formattedTime = new Date(startTime).toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
  return (
    <Flex py={2}>
      <Flex justifyContent="space-between" w="100%">
        <Text fontSize={'xl'} fontWeight={600}>
          {formattedTime}
        </Text>
        <Text fontSize={'xl'} fontWeight={600}>
          {team1} vs {team2}
        </Text>
        <Text fontSize={'xl'} fontWeight={600}>
          {sport} {sportsGenderTranslate[`${type} ${gender}`] ?? `${type} ${gender}`}
        </Text>
      </Flex>
    </Flex>
  );
}

function SchedulesHomeComponent() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: matchesData, isLoading } = useQuery({
    queryKey: ['getMatch'],
    queryFn: getMatch,
  });
  isLoading;

  // const groupByDate = matchesData
  //   ?.filter((match) => new Date(match.startTime) > new Date())
  //   .reduce((acc, curr) => {
  //     const formattedDate = new Date(curr.startTime).toLocaleDateString('en-US');
  //     if (!acc[formattedDate]) {
  //       acc[formattedDate] = [];
  //     }
  //     acc[formattedDate].push(curr);
  //     return acc;
  //   }, {} as Record<string, typeof matchesData>);

  const groupByDate = Array.isArray(matchesData)
    ? matchesData
        .filter((match) => new Date(match.startTime) > new Date())
        .reduce((acc, curr) => {
          const formattedDate = new Date(curr.startTime).toLocaleDateString('en-US');
          if (!acc[formattedDate]) {
            acc[formattedDate] = [];
          }
          acc[formattedDate].push(curr);
          return acc;
        }, {} as Record<string, typeof matchesData>)
    : {};

  // Then proceed with the rest of your code...

  // then group into { date: { type: 'football', schedules: [...]}}
  const groupBySport = Object.entries(groupByDate ?? {}).reduce((acc, [date, schedules]) => {
    const sportGroup = schedules.reduce((acc, curr) => {
      if (!acc[curr.Team_Match_TID1ToTeam.Sport.name]) {
        acc[curr.Team_Match_TID1ToTeam.Sport.name] = [];
      }
      acc[curr.Team_Match_TID1ToTeam.Sport.name].push(curr);
      return acc;
    }, {} as Record<string, typeof schedules>);

    acc[date] = sportGroup;
    return acc;
  }, {} as Record<string, Record<string, typeof matchesData>>);

  const preparedDate = Object.entries(groupBySport)
    .map(([date, sportGroup]) => {
      const sortedSchedules = Object.entries(sportGroup).map(([sport, schedules]) => {
        const sortedSchedules = schedules?.sort(
          (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
        return { type: sport, schedules: sortedSchedules };
      });

      return { date, schedules: sortedSchedules };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Box bg={'grey.200'} fontFamily={'Noto sans thai'}>
      <Box p={{ base: '100px 10% 70px 10%', lg: '100px 10% 70px 10%' }}>
        <Text
          w={{ base: '', md: 'fit-content', lg: 'fit-content' }}
          textAlign={'center'}
          p={'5px 70px 5px 70px'}
          fontSize={{ base: '24px', md: '32px', lg: '32px' }}
          borderRadius={'20px'}
          backgroundColor={'#F05A29'}
          color={'white'}
        >
          กำหนดการแข่งขัน
        </Text>
      </Box>

      <Grid
        p={{ base: '0px 10% 70px 10%', lg: '0px 10% 70px 10%' }}
        templateAreas={{ base: '"img" "content"', md: '"img content"' }}
        gridTemplateColumns={{ base: '1fr', md: '30dvw 1fr' }}
        gridTemplateRows={{ base: '2fr', md: '1fr' }}
      >
        <GridItem area={'img'} marginBottom={{ base: 12, md: 0 }}>
          <Image src={MascotTorch} alt="Mascot Torch" />
        </GridItem>
        <GridItem area={'content'}>
          <Flex direction="column" gap={8}>
            <Flex direction="column" gap={6}>
              <Text fontSize="2xl" color="white" fontWeight={800}>
                Today
              </Text>
              {preparedDate
                .find((date) => {
                  const today = new Date();
                  const matchDate = new Date(date.date);
                  return (
                    today.getFullYear() === matchDate.getFullYear() &&
                    today.getMonth() === matchDate.getMonth() &&
                    today.getDate() === matchDate.getDate()
                  );
                })
                ?.schedules.map((sport) => (
                  <ScheduleHomeCard label="Today Match(es)">
                    {sport?.schedules?.map((match) => (
                      <ScheduleInfoText
                        startTime={match.startTime}
                        team1={match.Team_Match_TID1ToTeam.Institute}
                        team2={match.Team_Match_TID2ToTeam.Institute}
                        sport={match.Team_Match_TID1ToTeam.Sport.name}
                        type={match.Team_Match_TID1ToTeam.Sport.type}
                        gender={match.Team_Match_TID1ToTeam.Sport.gender}
                      />
                    )) ?? (
                      <Text fontSize={'xl'} fontWeight={600} py={2}>
                        No match today
                      </Text>
                    )}
                  </ScheduleHomeCard>
                )) ?? (
                <Text fontSize={'xl'} fontWeight={600} py={2} color="grey.100">
                  No match today
                </Text>
              )}
            </Flex>

            {preparedDate.slice(1, 3).map((sport) => {
              const formattedDate = new Date(sport.date).toLocaleDateString('th-TH', {
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Bangkok',
              });
              return (
                <Flex direction="column" gap={6}>
                  <Text fontSize="2xl" color="white" fontWeight={800}>
                    {formattedDate}
                  </Text>

                  {sport.schedules.map((match) => (
                    <ScheduleHomeCard label={match.type}>
                      {match?.schedules?.map((match) => (
                        <ScheduleInfoText
                          startTime={match.startTime}
                          team1={match.Team_Match_TID1ToTeam.Institute}
                          team2={match.Team_Match_TID2ToTeam.Institute}
                          sport={match.Team_Match_TID1ToTeam.Sport.name}
                          type={match.Team_Match_TID1ToTeam.Sport.type}
                          gender={match.Team_Match_TID1ToTeam.Sport.gender}
                        />
                      )) ?? (
                        <Text fontSize={'xl'} fontWeight={600} py={2} color="grey.100">
                          No match today
                        </Text>
                      )}
                    </ScheduleHomeCard>
                  ))}
                </Flex>
              );
            })}

            <Collapse in={isOpen} animateOpacity>
              <Flex direction="column" gap={8}>
                {preparedDate.slice(3, preparedDate.length).map((sport) => {
                  const formattedDate = new Date(sport.date).toLocaleDateString('th-TH', {
                    month: 'long',
                    day: 'numeric',
                  });
                  return (
                    <Flex direction="column" gap={6}>
                      <Text fontSize="2xl" color="white" fontWeight={800}>
                        {formattedDate}
                      </Text>

                      {sport.schedules.map((match) => (
                        <ScheduleHomeCard label={match.type}>
                          {match?.schedules?.map((match) => (
                            <ScheduleInfoText
                              startTime={match.startTime}
                              team1={match.Team_Match_TID1ToTeam.Institute}
                              team2={match.Team_Match_TID2ToTeam.Institute}
                              sport={match.Team_Match_TID1ToTeam.Sport.name}
                              type={match.Team_Match_TID1ToTeam.Sport.type}
                              gender={match.Team_Match_TID1ToTeam.Sport.gender}
                            />
                          )) ?? (
                            <Text fontSize={'xl'} fontWeight={600} py={2} color="grey.100">
                              No match today
                            </Text>
                          )}
                        </ScheduleHomeCard>
                      ))}
                    </Flex>
                  );
                })}
              </Flex>
            </Collapse>
            <Button
              onClick={onToggle}
              w={320}
              color="white"
              margin="auto"
              borderRadius={24}
              bgColor="brand.100"
              _hover={{ bgColor: 'brand.200' }}
            >
              แสดงเพิ่มเติม
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}

const SchedulesHome = React.memo(SchedulesHomeComponent);
SchedulesHome.displayName = 'SchedulesHome';

export default SchedulesHome;
