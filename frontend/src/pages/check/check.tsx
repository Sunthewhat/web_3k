/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Text, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../../assets/images/background.png';
import { fetchData } from './fetchData';

function CheckComponent() {
  const allSport = {
    Football: [{ text: 'ทีมชาย', id: 0 }],
    Footsal: [{ text: 'ทีมชาย', id: 1 }],
    Basketball: [
      { text: 'ทีมชาย', id: 2 },
      { text: 'ทีมหญิง', id: 3 },
    ],
    Volleyball: [
      { text: 'ทีมชาย', id: 4 },
      { text: 'ทีมหญิง', id: 5 },
    ],
    Badminton: [
      { text: 'ชายเดี่ยว คนที่ 1', id: 6 },
      { text: 'ชายเดี่ยว คนที่ 2', id: 7 },
      { text: 'หญิงเดี่ยว คนที่ 1', id: 8 },
      { text: 'หญิงเดี่ยว คนที่ 2', id: 9 },
      { text: 'ชายคู่ ทีมที่ 1', id: 10 },
      { text: 'ชายคู่ ทีมที่ 2', id: 11 },
      { text: 'หญิงคู่ ทีมที่ 1', id: 12 },
      { text: 'หญิงคู่ ทีมที่ 2', id: 13 },
      { text: 'คู่ผสม ทีมที่ 1', id: 14 },
      { text: 'คู่ผสม ทีมที่ 2', id: 15 },
    ],
    Bridge: [{ text: 'บริจด์ทีม', id: 16 }],
    Esport: [
      { text: 'ROV ทีมชาย', id: 17 },
      { text: 'ROV ทีมหญิง', id: 18 },
      { text: 'ROV ทีมผสม', id: 19 },
      { text: 'VALORANT', id: 20 },
    ],
    Petangue: [
      { text: 'ชายคู่', id: 21 },
      { text: 'หญิงคู่', id: 22 },
      { text: 'ทีมชาย', id: 23 },
      { text: 'ทีมหญิง', id: 24 },
    ],
    Tabletennis: [
      { text: 'ชายเดี่ยว คนที่ 1', id: 25 },
      { text: 'ชายเดี่ยว คนที่ 2', id: 26 },
      { text: 'หญิงเดี่ยว คนที่ 1', id: 27 },
      { text: 'หญิงเดี่ยว คนที่ 2', id: 28 },
      { text: 'ชายคู่ ทีมที่ 1', id: 29 },
      { text: 'ชายคู่ ทีมที่ 2', id: 30 },
      { text: 'หญิงคู่ ทีมที่ 1', id: 31 },
      { text: 'หญิงคู่ ทีมที่ 2', id: 32 },
      { text: 'คู่ผสม ทีมที่ 1', id: 33 },
      { text: 'คู่ผสม ทีมที่ 2', id: 34 },
    ],
  };
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<'KMUTT' | 'KMITL' | 'KMUTNB'>('KMUTT');
  const [data, setData] = useState<
    {
      id: number;
      sport: string;
      sex: string;
      type: string;
      institute: string;
      status: boolean;
    }[]
  >([]);

  const fetchDatas = async () => {
    const { data } = await fetchData(activeButton);
    setData(data);
  };

  useEffect(() => {
    fetchDatas();
  }, [activeButton]);

  const handleButtonClick = (button: 'KMUTT' | 'KMITL' | 'KMUTNB') => {
    setActiveButton(button);
    navigate(`/check/${button}`);
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      backgroundImage={Background}
      height={'100vh'}
    >
      <Text
        color={'white'}
        fontWeight={'600'}
        fontSize={'20px'}
        padding={'15px'}
        backgroundColor={'#F05A29'}
        borderRadius={'10px'}
        textAlign={'center'}
        margin={'3vh'}
      >
        ตรวจสอบการลงทะเบียน
      </Text>

      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        width={'80%'}
        marginTop={'2%'}
      >
        <Button
          backgroundColor={activeButton === 'KMUTT' ? 'white !important' : '#F05A29'}
          color={activeButton === 'KMUTT' ? '#034AB6' : 'white'}
          fontWeight={'600'}
          fontSize={'20px'}
          padding={'15px'}
          borderRadius={'10px 10px 0px 0px'}
          width={'34%'}
          textAlign={'center'}
          onClick={() => handleButtonClick('KMUTT')}
        >
          KMUTT
        </Button>

        <Button
          backgroundColor={activeButton === 'KMITL' ? 'white !important' : '#F05A29'}
          color={activeButton === 'KMITL' ? '#034AB6' : 'white'}
          fontWeight={'600'}
          fontSize={'20px'}
          padding={'15px'}
          borderRadius={'10px 10px 0px 0px'}
          width={'34%'}
          margin={'0 2%'}
          textAlign={'center'}
          onClick={() => handleButtonClick('KMITL')}
        >
          KMITL
        </Button>

        <Button
          backgroundColor={activeButton === 'KMUTNB' ? 'white !important' : '#F05A29'}
          color={activeButton === 'KMUTNB' ? '#034AB6' : 'white'}
          fontWeight={'600'}
          fontSize={'20px'}
          padding={'15px'}
          borderRadius={'10px 10px 0px 0px'}
          width={'34%'}
          textAlign={'center'}
          onClick={() => handleButtonClick('KMUTNB')}
        >
          KMUTNB
        </Button>
      </Box>

      <Box backgroundColor={'white'} width={'80%'} height={'65vh'} padding={'5%'} overflow={'auto'}>
        <Box>
          {Object.entries(allSport).map(([category, details]) => (
            <Box key={category}>
              <Text
                color={'#034AB6'}
                fontWeight={'600'}
                fontSize={'20px'}
                padding={'0px'}
                textAlign={'left'}
              >
                {category}
              </Text>
              {details.map((detail, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  margin={'10px'}
                  backgroundColor={'#F05A29'}
                  borderRadius={'10px'}
                  padding={'10px'}
                >
                  <Box borderRadius={'10px'} padding={'10px'}>
                    <Text color={'white'}>{detail.text}</Text>
                  </Box>
                  {!data[detail.id]?.status ? (
                    <Box backgroundColor={'white'} borderRadius={'20px'} padding={'5px 10px'}>
                      <Text fontWeight={'700'} color={'red'} textAlign={'center'}>
                        ยังไม่ลงทะเบียน
                      </Text>
                    </Box>
                  ) : (
                    <Box backgroundColor={'#00BC66'} borderRadius={'20px'} padding={'5px 10px'}>
                      <Text fontWeight={'700'} color={'white'} textAlign={'center'}>
                        ลงทะเบียนแล้ว
                      </Text>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        width={'80%'}
        marginTop={'2%'}
      >
        {/* <Button
          backgroundColor={'#F7941F'}
          color={'white'}
          size="lg"
          borderRadius="100px"
          as={Link}
          to="/"
           w={'40%'}
          leftIcon={<SlArrowLeft />}
        >
          ย้อนกลับ
        </Button> */}
        <Button
          pos={'fixed'}
          bottom={'2%'}
          left={'5%'}
          backgroundColor={'#F7941F'}
          color={'white'}
          size="lg"
          borderRadius="100px"
          as={Link}
          to="/"
          w={'40%'}
          maxW={"200px"}
          leftIcon={<SlArrowLeft />}
        >
          ย้อนกลับ
        </Button>
      </Box>
    </Box>
  );
}

const Home = React.memo(CheckComponent);
Home.displayName = 'Home';

export default Home;
