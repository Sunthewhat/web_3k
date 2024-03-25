import { Link } from 'react-router-dom';
import { Button, Text, Flex, Box } from '@chakra-ui/react';
import Volley from '../../assets/image/volleyball.png';
import Badminton from '../../assets/image/badminton.png';
import Basketball from '../../assets/image/basketball.png';
import Football from '../../assets/image/football.png';
import Futsal from '../../assets/image/futsal.png';
import Bridge from '../../assets/image/bridge.png';
import Esport from '../../assets/image/esport.png';
import Petangue from '../../assets/image/petangue.png';
import Tabletennis from '../../assets/image/tabletennis.png';
import React, { FC } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { SlArrowLeft } from 'react-icons/sl';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/reducer/userDataSlice';

const SelectSportComponent: FC = () => {
  const navigate = useNavigate();

  const userData = useAppSelector(selectUserData);
  if (!userData.institute) {
    return <Navigate to="/select-institute" />;
  }

  const allSport = [
    {
      name: 'Volleyball',
      img: Volley,
    },
    {
      name: 'Badminton',
      img: Badminton,
    },
    {
      name: 'Basketball',
      img: Basketball,
    },
    {
      name: 'Football',
      img: Football,
    },
    {
      name: 'Futsal',
      img: Futsal,
    },
    {
      name: 'Bridge',
      img: Bridge,
    },
    {
      name: 'E-sport',
      img: Esport,
    },
    {
      name: 'Petangue',
      img: Petangue,
    },
    {
      name: 'Tabletennis',
      img: Tabletennis,
    },
  ];

  return (
    <Box>
      <Box style={{ alignItems: 'center', height: '120px' }}>
        <Flex
          flexDir="column"
          alignItems="center"
          pos="fixed"
          left="50%"
          style={{ transform: 'translateX(-50%)' }}
          top="10%"
        >
          <Text
            fontSize={24}
            fontWeight={600}
            color="white"
            bgColor="brand.200"
            px={6}
            py={1}
            borderRadius={8}
          >
            โปรดเลือกกีฬา
          </Text>
        </Flex>
      </Box>

      <Flex
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#373737',
          marginTop: '40px',
        }}
      >
        <SimpleGrid
          // paddingLeft={['50px', '150px']}
          columns={[2, 3]}
          spacingX={['2px', '20px']}
          spacingY={['25px', '20px']}
          alignItems={'center'}
          justifyContent={'center'}
          overflowY="scroll"
          // height="60dvh"
          height={['60dvh', '530px']}
          width={['390px', '70%']}
          paddingTop="30px"
        >
          {allSport.map((sport) => (
            <Flex
              key={sport.name}
              margin="auto"
              style={{
                backgroundColor: '#231F20',
                width: '141px',
                height: '141px',
                borderRadius: '28px',
              }}
              onClick={() => navigate(`/rule/${sport.name}`)}
            >
              <div style={{ marginTop: '-25px' }}>
                <img src={sport.img} alt={sport.name} />
                <h1
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: '"Kanit" ,sans-serif',
                  }}
                >
                  {sport.name}
                </h1>
              </div>
            </Flex>
          ))}
        </SimpleGrid>
        {/* </div> */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '90%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Flex style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Button
              pos={'fixed'}
              bottom={'2%'}
              left={'5%'}
              backgroundColor={'#F7941F'}
              color={'white'}
              size="lg"
              borderRadius="100px"
              as={Link}
              to="/select-institute"
              w={'40%'}
              maxW={'200px'}
              leftIcon={<SlArrowLeft />}
            >
              ย้อนกลับ
            </Button>
            {/* <Button
            as={Link}
            to="/select-institute"
            borderRadius={22.5}
            bg="brand.100"
            color={'white'}

          >
            ย้อนกลับ
          </Button> */}
          </Flex>
        </div>
      </Flex>
      {/* </Box> */}
    </Box>
  );
};
const SelectSport = React.memo(SelectSportComponent);
SelectSport.displayName = 'selectSport';

export default SelectSport;
