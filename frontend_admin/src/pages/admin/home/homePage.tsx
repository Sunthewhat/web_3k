// import { Button } from '@chakra-ui/react';
import { Box, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { FC, useContext } from 'react';
import Torch from '@/public/assets/torch-middle.png';
import { UserContext } from '@/contexts/userContext';
import { useNavigate } from 'react-router-dom';

const HomePage: FC = () => {
  const user = useContext(UserContext);
  const hoverStyles = {
    _hover: {
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      fontSize: '32px',
      transition: 'all 0.3s ease',
    },
    transition: 'all 0.3s ease',
  };

  const navigate = useNavigate();
  return (
    <Box fontFamily={'Noto sans thai'} color={'white'} marginTop={'30dvh'}>
      <Grid
        h={['450px', '400px']}
        templateRows={['repeat(3, 1fr)', 'repeat(4, 1fr)']}
        templateColumns={['repeat(1, 1fr)', 'repeat(10, 1fr)']}
        gap={[1, 4]}
      >
        <GridItem
          rowSpan={[1, 4]}
          colSpan={[1, 1]}
          colStart={[1, 1]}
          colEnd={[1, 5]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {/* Black circle */}
          <Box
            position="absolute"
            w={['220px', '80%']}
            h={['220px', '110%']}
            backgroundColor="black"
            zIndex={-1}
            css={{
              animation: 'morph 12s ease-in-out infinite',
              '@keyframes morph': {
                '0%': {
                  borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%',
                },
                '50%': {
                  borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%',
                },
                '100%': {
                  borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%',
                },
              },
            }}
          />
          {/* Torch Image */}
          <Image h="auto" maxH={['200px', '400px']} src={Torch} />
        </GridItem>

        <GridItem
          colStart={[1, 5]}
          colEnd={[2, 11]}
          rowStart={[1, 1]}
          rowEnd={[2, 2]}
          display="flex"
          alignItems="center"
          maxH={['50px', '500px']}
        >
          <Text
            fontSize={['35px', '50px']}
            fontWeight={'bold'}
            textAlign={['center', 'left']}
            w={'100%'}
          >
            สวัสดี ! {user.name}
          </Text>
        </GridItem>

        <GridItem colStart={[1, 5]} colEnd={[2, 11]} rowSpan={[1, 3]}>
          <Grid
            h={'100%'}
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(8, 1fr)"
            gap={[1, 4]}
          >
            <GridItem colSpan={1}>
              <Box
                w={['0px', '4px']}
                h={'100%'}
                backgroundColor={'white'}
                borderRadius={'100px'}
              ></Box>
            </GridItem>

            <GridItem
              colSpan={[8, 7]}
              fontSize={['25px', '30px']}
              fontWeight={'semibold'}
              margin={'10px'}
              display={'flex'}
              flexDir={'column'}
              justifyContent={'center'}
            >
              {/* <Box w={'100%'} fontSize={['25px', '30px']} fontWeight={'semibold'}> */}
              <Box>
                <Text
                  {...hoverStyles}
                  margin={'15px'}
                  textAlign={['center', 'left']}
                  w={['', 'fit-content']}
                  onClick={() => navigate('/AthleteRegister')}
                >
                  ลงทะเบียน
                </Text>
              </Box>
              <Box {...hoverStyles}>
                <Text
                  // {...hoverStyles}
                  margin={'15px'}
                  textAlign={['center', 'left']}
                  w={['', 'fit-content']}
                  onClick={() => navigate('/Score')}
                >
                  ผลคะแนน
                </Text>
              </Box>
              <Box>
                <Text
                  {...hoverStyles}
                  margin={'15px'}
                  textAlign={['center', 'left']}
                  w={['', 'fit-content']}
                  onClick={() => navigate('/Announcement')}
                >
                  สร้างประกาศ
                </Text>
              </Box>
              {/* <Box>
                <Text
                  {...hoverStyles}
                  margin={'15px'}
                  textAlign={['center', 'left']}
                  w={['', 'fit-content']}
                >
                  ข้อมูลอื่นๆ
                </Text>
              </Box> */}
              {/* </Box> */}
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomePage;
