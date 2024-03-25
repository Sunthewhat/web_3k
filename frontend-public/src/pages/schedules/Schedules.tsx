import React from 'react';

import { getMatch } from '@/api/schedule';
import LoadingOverlay from '@/layout/LoadingOverlay';
import {
  Box,
  Divider,
  Flex,
  Hide,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import CustomTab from './components/CustomTab';
import { SchedulesViewType } from './types/shared';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showScore(scores: any, date: string) {
  if (!scores || scores.length > 0) {
    if (scores.length > 1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scoresT1 = scores.map((s: any) => s.T1_Score);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scoresT2 = scores.map((s: any) => s.T2_Score);
      const sumT1 = scoresT1.reduce((acc: number, curr: number) => acc + curr, 0);
      const sumT2 = scoresT2.reduce((acc: number, curr: number) => acc + curr, 0);
      return `${sumT1} - ${sumT2}`;
    }
    return `${scores[0].T1_Score} - ${scores[0].T2_Score}`;
  }
  if (new Date(date).getTime() < new Date().getTime()) {
    return 'รอผล';
  }
  return 'ยังไม่แข่ง';
}

function SchedulesComponent() {
  const [viewType, setViewType] = React.useState<SchedulesViewType>('sports');
  const [tabIndex, setTabIndex] = React.useState(0);
  const { data: matchesData, isLoading } = useQuery({
    queryKey: ['getMatch'],
    queryFn: getMatch,
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const isSportsView = viewType === 'sports';
  const isDateView = viewType === 'date';

  const handleViewType = (type: SchedulesViewType) => {
    setViewType(type);
  };

  // const allSports = matchesData?.reduce((acc, curr) => {
  //   if (!acc.includes(curr.Team_Match_TID1ToTeam.Sport.name)) {
  //     acc.push(curr.Team_Match_TID1ToTeam.Sport.name);
  //   }
  //   return acc;
  // }, [] as string[]);

  const allSports = Array.isArray(matchesData)
    ? matchesData.reduce((acc, curr) => {
        if (!acc.includes(curr.Team_Match_TID1ToTeam.Sport.name)) {
          acc.push(curr.Team_Match_TID1ToTeam.Sport.name);
        }
        return acc;
      }, [] as string[])
    : [];

  // const groupByDate = matchesData?.reduce((acc, curr) => {
  //   const formattedDate = new Date(curr.startTime).toLocaleDateString('en-US');
  //   if (!acc[formattedDate]) {
  //     acc[formattedDate] = [];
  //   }
  //   acc[formattedDate].push(curr);
  //   return acc;
  // }, {} as Record<string, typeof matchesData>);

  const groupByDate = Array.isArray(matchesData)
    ? matchesData.reduce((acc, curr) => {
        const formattedDate = new Date(curr.startTime).toLocaleDateString('en-US');
        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push(curr);
        return acc;
      }, {} as Record<string, typeof matchesData>)
    : {};

  const preparedDate = Object.entries(groupByDate ?? {})
    .map(([date, schedules]) => ({
      date,
      schedules: schedules?.sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      ),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // const groupByType =
  //   matchesData?.reduce((acc, curr) => {
  //     if (!acc[curr.Team_Match_TID1ToTeam.Sport.name]) {
  //       acc[curr.Team_Match_TID1ToTeam.Sport.name] = [];
  //     }
  //     acc[curr.Team_Match_TID1ToTeam.Sport.name].push(curr);
  //     return acc;
  //   }, {} as Record<string, typeof matchesData>) ?? {};

  const groupByType = Array.isArray(matchesData)
    ? matchesData.reduce((acc, curr) => {
        if (!acc[curr.Team_Match_TID1ToTeam.Sport.name]) {
          acc[curr.Team_Match_TID1ToTeam.Sport.name] = [];
        }
        acc[curr.Team_Match_TID1ToTeam.Sport.name].push(curr);
        return acc;
      }, {} as Record<string, typeof matchesData>)
    : {};

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box
      bg="grey.300"
      minH="calc(100dvh - 64px)"
      height="100%"
      zIndex={-99}
      px={{ base: 12, sm: 32 }}
      py={24}
    >
      <Flex gap={4} justifyContent="center">
        <CustomTab
          isActive={isSportsView}
          handleViewType={handleViewType}
          type="sports"
          label="ชนิดกีฬา"
        />
        <Divider orientation="vertical" borderColor="white" size="1px" opacity="1" height="auto" />
        <CustomTab
          isActive={isDateView}
          handleViewType={handleViewType}
          type="date"
          label="วันที่"
        />
      </Flex>

      {viewType === 'sports' ? (
        <Tabs variant="unstyled" mt={12} index={tabIndex} onChange={handleTabsChange}>
          <Hide below="md">
            <TabList justifyContent="center" color="white" gap={4} flexWrap="wrap">
              {allSports?.map((item) => (
                <Tab
                  key={item}
                  py={1}
                  borderRadius={'12px'}
                  _selected={{
                    bgColor: 'brand.200',
                  }}
                  _hover={{
                    bgColor: 'brand.300',
                  }}
                  value={item}
                >
                  {item}
                </Tab>
              ))}
            </TabList>
          </Hide>
          <Hide above="md">
            <Select
              value={allSports && allSports[tabIndex]}
              onChange={(e) => setTabIndex(allSports?.indexOf(e.target.value) ?? 0)}
              bg="white"
              color="black"
              borderRadius={12}
              fontSize="18px"
            >
              {allSports?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Hide>

          <TabPanels>
            {Object.entries(groupByType).map(([key, matches]) => {
              matches.sort(
                (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
              );
              return (
                <TabPanel key={crypto.randomUUID()}>
                  <Box fontSize="24px" fontWeight="bold" color="white" mt={8}>
                    {key}
                  </Box>
                  <Box>
                    {matches.map((match) => {
                      const readableDate = new Date(match.startTime).toLocaleDateString('en-UK', {
                        day: 'numeric',
                        month: 'short',
                      });
                      const readableTime = new Date(match.startTime).toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'UTC',
                      });

                      return (
                        <SimpleGrid
                          key={crypto.randomUUID()}
                          bg="white"
                          color="black"
                          p={4}
                          mt={4}
                          borderRadius={12}
                          columns={{ base: 1, md: 4 }}
                        >
                          <Box fontSize="18px" fontWeight="bold">
                            {readableDate} | {readableTime} |{' '}
                            {match.CompetitionInstitute === 'Online'
                              ? match.CompetitionInstitute
                              : `${match.CompetitionInstitute} ${match.CompetitionRoom}`}
                          </Box>
                          <Box fontSize="16px" fontWeight="bold" textAlign={{ md: 'center' }}>
                            {match.Team_Match_TID1ToTeam.Institute} vs{' '}
                            {match.Team_Match_TID2ToTeam.Institute}
                          </Box>
                          <Box fontSize="16px" fontWeight="bold" textAlign={{ md: 'center' }}>
                            {sportsGenderTranslate[
                              `${match.Team_Match_TID1ToTeam.Sport.type} ${match.Team_Match_TID1ToTeam.Sport.gender}`
                            ] ??
                              `${match.Team_Match_TID1ToTeam.Sport.type} ${match.Team_Match_TID1ToTeam.Sport.gender}`}
                          </Box>
                          <Box fontSize="16px" fontWeight="bold" textAlign={{ md: 'right' }}>
                            {showScore(match.Score, match.startTime)}
                          </Box>
                        </SimpleGrid>
                      );
                    })}
                  </Box>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      ) : (
        <Box>
          {groupByDate &&
            preparedDate.map((item) => {
              const readableDate = new Date(item.date).toLocaleDateString('en-UK', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              return (
                <Box key={item.date}>
                  <Box fontSize="24px" fontWeight="bold" color="white" mt={8}>
                    {readableDate}
                  </Box>
                  {item?.schedules?.map((schedule) => (
                    <SimpleGrid
                      key={crypto.randomUUID()}
                      bg="white"
                      color="black"
                      p={4}
                      mt={4}
                      borderRadius={12}
                      columns={{ base: 1, md: 5 }}
                    >
                      <Box fontSize="18px" fontWeight="bold">
                        {schedule.CompetitionInstitute === 'Online'
                          ? schedule.CompetitionInstitute
                          : `${schedule.CompetitionInstitute} ${schedule.CompetitionRoom}`}
                      </Box>
                      <Box fontSize="16px" fontWeight="bold" textAlign={{ md: 'center' }}>
                        {schedule.Team_Match_TID1ToTeam.Sport.name}
                      </Box>
                      <Box fontSize="16px" fontWeight="bold" textAlign={{ md: 'center' }}>
                        {sportsGenderTranslate[
                          `${schedule.Team_Match_TID1ToTeam.Sport.type} ${schedule.Team_Match_TID1ToTeam.Sport.gender}`
                        ] ??
                          `${schedule.Team_Match_TID1ToTeam.Sport.type} ${schedule.Team_Match_TID1ToTeam.Sport.gender}`}
                      </Box>
                      <Box fontSize="16px" fontWeight="bold" textAlign={{ md: 'center' }}>
                        {schedule.Team_Match_TID1ToTeam.Institute} vs{' '}
                        {schedule.Team_Match_TID2ToTeam.Institute}
                      </Box>
                      <Box fontSize="16px" fontWeight="bold" textAlign={{ md: 'center' }}>
                        {showScore(schedule.Score, schedule.startTime)}
                      </Box>
                    </SimpleGrid>
                  ))}
                </Box>
              );
            })}
        </Box>
      )}
    </Box>
  );
}

const Schedules = React.memo(SchedulesComponent);
Schedules.displayName = 'Schedules';

export default Schedules;
