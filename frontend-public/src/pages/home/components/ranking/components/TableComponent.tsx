import { FC, useEffect, useState } from 'react';

import { Box, Hide, Show, Text } from '@chakra-ui/react';
import { getMedal } from '@/api/medal';
import { getScoreInput } from '@/api/medal';

const dataPlaceholder: Medal[] = [
  {
    name: 'KMUTT',
    gold: 0,
    silver: 0,
    bronze: 0,
    point: 0,
  },
  {
    name: 'KMITL',
    gold: 0,
    silver: 0,
    bronze: 0,
    point: 0,
  },
  {
    name: 'KMUTNB',
    gold: 0,
    silver: 0,
    bronze: 0,
    point: 0,
  },
];
// medalsData.sort((a, b) => b.point - a.point);
// console.log(sampleData);
interface Medal {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
  point: number | null;
}

const TableComponent: FC = () => {
  const [medalsData, setMedalsData] = useState<Medal[]>(dataPlaceholder);
  const [scoreInput, setScoreInput] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Medal[] = await getMedal();
        setMedalsData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getScoreInput();
        setScoreInput(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Hide below="md">
        <Box
          display={'flex'}
          flexDir={{ base: 'column', md: 'row', lg: 'row' }}
          justifyContent={{ base: 'center', lg: 'space-between' }}
          p={{ base: '0px 50px 0px 50px', md: '0px 100px 0px 100px', lg: '0px 100px 0px 100px' }}
        >
          {/* 2st */}
          <Box
            w={{ base: '100%', md: '100%', lg: '30%' }}
            h={'fit-content'}
            backgroundImage={'linear-gradient(to bottom, #524A3E, #EDECEB)'}
            marginTop={{ base: '', md: '70px', lg: '70px' }}
            marginBottom={{ base: '30px' }}
            borderRadius={'20px'}
          >
            <Box
              margin={'20px'}
              backgroundColor={'white'}
              borderRadius={'20px'}
              padding={'20px'}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
              h={'fit-content'}
            >
              <Box
                backgroundImage={'linear-gradient(to bottom, #524A3E, #EDECEB)'}
                w={{ base: 'fit-content', lg: '130px' }}
                h={'fit-content'}
                borderRadius={'10px'}
                padding={'10px'}
              >
                <Text textAlign={'center'} color={'white'}>
                  {medalsData[1].name}
                </Text>
              </Box>
              {/* Gold */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                maxW={'290px'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#FFB84D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[1].gold}</Text>
              </Box>
              {/* Metal */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                maxW={'290px'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#BBBBBB'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[1].silver}</Text>
              </Box>
              {/* Bronze */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                maxW={'290px'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#DA7B5D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[1].bronze}</Text>
              </Box>
              <Box>
                <Text>{medalsData[1].point == null ? 0 : medalsData[1].point} points</Text>
              </Box>
            </Box>
          </Box>
          {/* 1st */}
          <Box
            w={{ base: '100%', md: '100%', lg: '30%' }}
            h={'fit-content'}
            backgroundImage={'linear-gradient(to bottom, #FFD84D, #FFAC2F)'}
            marginTop={'0px'}
            marginBottom={{ base: '30px' }}
            borderRadius={'20px'}
          >
            <Box
              margin={'20px'}
              backgroundColor={'white'}
              borderRadius={'20px'}
              padding={'20px'}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
              h={'fit-content'}
            >
              <Box
                backgroundImage={'linear-gradient(to bottom, #FFD84D, #FFAC2F)'}
                w={{ base: 'fit-content', lg: '130px' }}
                h={'fit-content'}
                borderRadius={'10px'}
                padding={'10px'}
              >
                <Text textAlign={'center'} color={'white'}>
                  {medalsData[0].name}
                </Text>
              </Box>
              {/* Gold */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                maxW={'290px'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#FFB84D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[0].gold}</Text>
              </Box>
              {/* Metal */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                maxW={'290px'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#BBBBBB'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[0].silver}</Text>
              </Box>
              {/* Bronze */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                maxW={'290px'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#DA7B5D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[0].bronze}</Text>
              </Box>
              <Box>
                <Text>{medalsData[0].point == null ? 0 : medalsData[0].point} points</Text>
              </Box>
            </Box>
          </Box>
          {/* 3rd */}
          <Box
            w={{ base: '100%', md: '100%', lg: '30%' }}
            h={'fit-content'}
            backgroundImage={'linear-gradient(to bottom, #C28120, #912928)'}
            marginTop={{ base: '', md: '70px', lg: '70px' }}
            borderRadius={'20px'}
          >
            <Box
              margin={'20px'}
              backgroundColor={'white'}
              borderRadius={'20px'}
              padding={'20px'}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
              h={'fit-content'}
            >
              <Box
                backgroundImage={'linear-gradient(to bottom, #C28120, #912928)'}
                w={{ base: 'fit-content', lg: '130px' }}
                h={'fit-content'}
                borderRadius={'10px'}
                padding={'10px'}
              >
                <Text textAlign={'center'} color={'white'}>
                  {medalsData[2].name}
                </Text>
              </Box>
              {/* Gold */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                maxW={'290px'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#FFB84D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[2].gold}</Text>
              </Box>
              {/* Metal */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                maxW={'290px'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#BBBBBB'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[2].silver}</Text>
              </Box>
              {/* Bronze */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'100%'}
                maxW={'290px'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#DA7B5D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[2].bronze}</Text>
              </Box>
              <Box>
                <Text>{medalsData[2].point == null ? 0 : medalsData[2].point} points</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Hide>

      <Show below="md">
        <Box
          display={'flex'}
          flexDir={{ base: 'column', md: 'row', lg: 'row' }}
          justifyContent={{ base: 'center', lg: 'space-between' }}
          p={{ base: '0px 50px 0px 50px', md: '0px 100px 0px 100px', lg: '0px 100px 0px 100px' }}
        >
          {/* 1st */}
          <Box
            w={{ base: '100%', md: '100%', lg: '30%' }}
            h={'fit-content'}
            backgroundImage={'linear-gradient(to bottom, #FFD84D, #FFAC2F)'}
            marginTop={'0px'}
            marginBottom={{ base: '30px' }}
            borderRadius={'20px'}
          >
            <Box
              margin={'20px'}
              backgroundColor={'white'}
              borderRadius={'20px'}
              padding={'20px'}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
              h={'fit-content'}
            >
              <Box
                backgroundImage={'linear-gradient(to bottom, #FFD84D, #FFAC2F)'}
                w={{ base: 'fit-content', lg: '130px' }}
                h={'fit-content'}
                borderRadius={'10px'}
                padding={'10px'}
              >
                <Text textAlign={'center'} color={'white'}>
                  {medalsData[0].name}
                </Text>
              </Box>
              {/* Gold */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'65%'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#FFB84D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[0].gold}</Text>
              </Box>
              {/* Metal */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'65%'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#BBBBBB'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[0].silver}</Text>
              </Box>
              {/* Bronze */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'65%'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#DA7B5D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[0].bronze}</Text>
              </Box>
              <Box>
                <Text>{medalsData[0].point == null ? 0 : medalsData[0].point} points</Text>
              </Box>
            </Box>
          </Box>
          {/* 2st */}
          <Box
            w={{ base: '100%', md: '100%', lg: '30%' }}
            h={'fit-content'}
            backgroundImage={'linear-gradient(to bottom, #524A3E, #EDECEB)'}
            marginTop={{ base: '', md: '70px', lg: '70px' }}
            marginBottom={{ base: '30px' }}
            borderRadius={'20px'}
          >
            <Box
              margin={'20px'}
              backgroundColor={'white'}
              borderRadius={'20px'}
              padding={'20px'}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
              h={'fit-content'}
            >
              <Box
                backgroundImage={'linear-gradient(to bottom, #524A3E, #EDECEB)'}
                w={{ base: 'fit-content', lg: '130px' }}
                h={'fit-content'}
                borderRadius={'10px'}
                padding={'10px'}
              >
                <Text textAlign={'center'} color={'white'}>
                  {medalsData[1].name}
                </Text>
              </Box>
              {/* Gold */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'65%'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#FFB84D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[1].gold}</Text>
              </Box>
              {/* Metal */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'65%'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#BBBBBB'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[1].silver}</Text>
              </Box>
              {/* Bronze */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'65%'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#DA7B5D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[1].bronze}</Text>
              </Box>
              <Box>
                <Text>{medalsData[1].point == null ? 0 : medalsData[1].point} points</Text>
              </Box>
            </Box>
          </Box>
          {/* 3rd */}
          <Box
            w={{ base: '100%', md: '100%', lg: '30%' }}
            h={'fit-content'}
            backgroundImage={'linear-gradient(to bottom, #C28120, #912928)'}
            marginTop={{ base: '', md: '70px', lg: '70px' }}
            borderRadius={'20px'}
          >
            <Box
              margin={'20px'}
              backgroundColor={'white'}
              borderRadius={'20px'}
              padding={'20px'}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
              h={'fit-content'}
            >
              <Box
                backgroundImage={'linear-gradient(to bottom, #C28120, #912928)'}
                w={{ base: 'fit-content', lg: '130px' }}
                h={'fit-content'}
                borderRadius={'10px'}
                padding={'10px'}
              >
                <Text textAlign={'center'} color={'white'}>
                  {medalsData[2].name}
                </Text>
              </Box>
              {/* Gold */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'65%'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#FFB84D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[2].gold}</Text>
              </Box>
              {/* Metal */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'65%'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#BBBBBB'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[2].silver}</Text>
              </Box>
              {/* Bronze */}
              <Box
                p={'10px 30px 10px 30px'}
                display={'flex'}
                flexDir={'row'}
                justifyContent={'space-between'}
                w={'65%'}
              >
                <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                  <Box
                    w={'20px'}
                    h={'20px'}
                    backgroundColor={'#DA7B5D'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                  ></Box>
                </Box>
                <Text>{medalsData[2].bronze}</Text>
              </Box>
              <Box>
                <Text>{medalsData[2].point == null ? 0 : medalsData[2].point} points</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Show>
      <Box w={'100%'} display={'flex'} justifyContent={'center'}>
        <Text m={'30px 30px 30px 30px'} color={'white'}>
          ข้อมูล ณ วันที่{' '}
          {new Date(new Date(scoreInput).getTime() - 7 * 60 * 60 * 1000).toLocaleString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </Text>
      </Box>
    </>
  );
};

export default TableComponent;
