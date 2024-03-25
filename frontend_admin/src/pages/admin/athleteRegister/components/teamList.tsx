import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Grid, Button } from '@chakra-ui/react';
import { CheckedInType, Match } from '../model/match';

export const TeamList: React.FC<{ TeamMember: Match; checkedIn: CheckedInType }> = ({
  TeamMember,
  checkedIn,
}) => {
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

  const [selectedTeam, setSelectedTeam] = useState<boolean>(true);

  return (
    <VStack align="center" spacing={3}>
      <Box w={'100%'} display={'flex'} justifyContent={'space-around'}>
        <Button
          w={'20%'}
          bg={selectedTeam ? '#00BC66 !important' : 'white'}
          onClick={() => {
            if (selectedTeam) return;
            setSelectedTeam(true);
          }}
        >
          {TeamMember.Team_Match_TID1ToTeam.Institute}
        </Button>
        <Button
          w={'20%'}
          bg={!selectedTeam ? '#00BC66 !important' : 'white'}
          onClick={() => {
            if (!selectedTeam) return;
            setSelectedTeam(false);
          }}
        >
          {TeamMember.Team_Match_TID2ToTeam.Institute}
        </Button>
      </Box>
      {selectedTeam &&
        (TeamMember.Team_Match_TID1ToTeam.Member.length !== 0 ? (
          TeamMember.Team_Match_TID1ToTeam.Member.map((teameach, index) => {
            const isMatch =
              checkedIn.find((dat) => {
                return dat.AID == teameach.AId && TeamMember.Id == dat.MID;
              }) != undefined;
            if (TeamMember.Team_Match_TID1ToTeam.Member.length === 0)
              return <Box>ไม่มีผู้เข้าแข่งขัน</Box>;
            return (
              <Box display={'flex'} justifyContent={'center'} pos={'relative'} key={index}>
                <Grid templateColumns={'repeat(1, 70dvw)'} gap={3} mt={'3dvh'}>
                  <Box display={'flex'} justifyContent={'center'} pos={'relative'} key={index}>
                    <Grid
                      templateColumns={['repeat(1, 60dvw)', 'repeat(2, 40dvw)']}
                      gap={2}
                      mt={'1dvh'}
                    >
                      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 20dvw)']} gap={6}>
                        <Text
                          textAlign={['center', 'right']}
                          fontSize={[windowWidth * 0.04, windowWidth * 0.015]}
                        >
                          {teameach.Athlete.Id}
                        </Text>
                        <Text
                          textAlign={'center'}
                          fontSize={[windowWidth * 0.04, windowWidth * 0.015]}
                        >
                          {teameach.Athlete.Name}
                        </Text>
                      </Grid>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        pos={'relative'}
                        fontSize={[windowWidth * 0.04, windowWidth * 0.02]}
                      >
                        <Box
                          w={['50dvw', '15dvw']}
                          h="5dvh"
                          borderRadius="20"
                          shadow="lg"
                          bg={isMatch ? '#00BC66 !important' : '#F7941F !important'}
                          textColor="white"
                          mt={'-0.75dvh'}
                          fontSize={[windowWidth * 0.03, windowWidth * 0.012]}
                        >
                          <Text
                            textAlign={'center'}
                            fontSize={[windowWidth * 0.04, windowWidth * 0.015]}
                          >
                            {isMatch ? 'ลงทะเบียนเรียบร้อย' : 'รอลงทะเบียน'}
                          </Text>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                  <Box bg={'#C1C1C1'} h={1} mt={'2dvh'}></Box>
                </Grid>
              </Box>
            );
          })
        ) : (
          <Box>ไม่มีผู้เข้าแข่งขัน</Box>
        ))}
      {!selectedTeam &&
        (TeamMember.Team_Match_TID2ToTeam.Member.length !== 0 ? (
          TeamMember.Team_Match_TID2ToTeam.Member.map((teameach, index) => {
            const isMatch =
              checkedIn.find((dat) => {
                return dat.AID == teameach.AId && TeamMember.Id == dat.MID;
              }) != undefined;
            return (
              <Box display={'flex'} justifyContent={'center'} pos={'relative'} key={index}>
                <Grid templateColumns={'repeat(1, 70dvw)'} gap={3} mt={'3dvh'}>
                  <Box display={'flex'} justifyContent={'center'} pos={'relative'} key={index}>
                    <Grid
                      templateColumns={['repeat(1, 60dvw)', 'repeat(2, 40dvw)']}
                      gap={2}
                      mt={'1dvh'}
                    >
                      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 20dvw)']} gap={6}>
                        <Text
                          textAlign={['center', 'right']}
                          fontSize={[windowWidth * 0.04, windowWidth * 0.015]}
                        >
                          {teameach.Athlete.Id}
                        </Text>
                        <Text
                          textAlign={'center'}
                          fontSize={[windowWidth * 0.04, windowWidth * 0.015]}
                        >
                          {teameach.Athlete.Name}
                        </Text>
                      </Grid>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        pos={'relative'}
                        fontSize={[windowWidth * 0.04, windowWidth * 0.02]}
                      >
                        <Box
                          w={['50dvw', '15dvw']}
                          h="5dvh"
                          borderRadius="20"
                          shadow="lg"
                          bg={isMatch ? '#00BC66 !important' : '#F7941F !important'}
                          textColor="white"
                          mt={'-0.75dvh'}
                          fontSize={[windowWidth * 0.03, windowWidth * 0.012]}
                        >
                          <Text
                            textAlign={'center'}
                            fontSize={[windowWidth * 0.04, windowWidth * 0.015]}
                          >
                            {isMatch ? 'ลงทะเบียนเรียบร้อย' : 'รอลงทะเบียน'}
                          </Text>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                  <Box bg={'#C1C1C1'} h={1} mt={'2dvh'}></Box>
                </Grid>
              </Box>
            );
          })
        ) : (
          <Box>ไม่มีผู้เข้าแข่งขัน</Box>
        ))}
    </VStack>
  );
};
