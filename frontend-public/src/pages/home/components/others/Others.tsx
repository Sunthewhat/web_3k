import { Box, Text, Grid, Button } from '@chakra-ui/react';
import { IoMdDownload } from 'react-icons/io';

const menu = [
  { name: 'สูจิบัตร', path: 'ดาวน์โหลด' },
  { name: 'รายชื่อนักกีฬา', path: 'ดาวน์โหลด' },
  { name: 'ระเบียบการแข่งขัน', path: 'ดาวน์โหลด' },
];

const path = [
  { path: 'ตารางการแข่ง' },
  { path: 'ตารางการแข่ง' },
  { path: 'ตารางการแข่ง' },
  { path: 'ตารางการแข่ง' },
  { path: 'ตารางการแข่ง' },
  { path: 'ตารางการแข่ง' },
  { path: 'ตารางการแข่ง' },
  { path: 'ตารางการแข่ง' },
  { path: 'ตารางการแข่ง' },
];
const sport = [
  { name: 'football' },
  { name: 'futsal' },
  { name: 'basketball' },
  { name: 'volleyball' },
  { name: 'tabletennis' },
  { name: 'badminton' },
  { name: 'petanque' },
  { name: 'eSport' },
  { name: 'bridge' },
];
const handleViewOtherPdf = () => {
  window.open(`${import.meta.env.VITE_FRONTEND_URL}/regulation/reguls_all.pdf`);
};
const handelViewMatchPdf = (sport: string) => {
  window.open(`${import.meta.env.VITE_FRONTEND_URL}/timetable/${sport}_match.pdf`);
};

function Others() {
  return (
    <Box bg={'grey.200'} fontFamily={'Noto sans thai'}>
      <Box p={{ base: '100px 10% 20px 10%', lg: '100px 10% 20px 10%' }}>
        <Text
          w={{ base: '', md: 'fit-content', lg: 'fit-content' }}
          textAlign={'center'}
          p={'5px 70px 5px 70px'}
          fontSize={{ base: '24px', md: '32px', lg: '32px' }}
          borderRadius={'20px'}
          backgroundColor={'#F05A29'}
          color={'white'}
        >
          อื่นๆ
        </Text>
      </Box>
      <Box>
        <Grid
          h={'fit-content'}
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          templateRows="repeat(1, 1fr)"
          gap={0}
          margin={'0 10% 0 10%'}
        >
          {menu.slice(0, 3).map((item, index) => {
            return (
              <Box>
                <Box>
                  <Text
                    m={'10px'}
                    fontSize={{ base: '24px', md: '32px', lg: '32px' }}
                    color={'white'}
                    key={index}
                  >
                    {item.name}
                  </Text>
                </Box>

                <Box>
                  <Button
                    w={'90%'}
                    m={'10px'}
                    p={'15px 0px 15px 0px'}
                    borderRadius={'20px'}
                    textAlign={'center'}
                    backgroundColor={
                      item.name === 'สูจิบัตร' || item.name === 'รายชื่อนักกีฬา'
                        ? 'grey'
                        : '#F7941F'
                    }
                    h={'fit-content'}
                    fontSize={{ base: '18px', md: '24px', lg: '24px' }}
                    color={'white'}
                    key={index}
                    onClick={() => {
                      if (item.name === 'ระเบียบการแข่งขัน') handleViewOtherPdf();
                    }}
                  >
                    <IoMdDownload />
                    {item.path}
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Grid>
        <Box margin={'0 10% 0 10%'}>
          <Text m={'10px'} fontSize={{ base: '24px', md: '32px', lg: '32px' }} color={'white'}>
            ตารางการแข่งขัน
          </Text>
        </Box>

        <Grid
          h={'fit-content'}
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          templateRows="repeat(3, 1fr)"
          gap={0}
          margin={'0 10% 0 10%'}
        >
          {path.map((item, index) => {
            item;
            return (
              <Box>
                <Button
                  m={'10px'}
                  w={'90%'}
                  p={'15px 0px 15px 0px'}
                  borderRadius={'20px'}
                  textAlign={'center'}
                  backgroundColor={'#F7941F'}
                  h={'fit-content'}
                  fontSize={{ base: '18px', md: '24px', lg: '24px' }}
                  color={'white'}
                  key={index}
                  onClick={() => handelViewMatchPdf(sport[index].name)}
                >
                  <IoMdDownload />

                  {sport[index].name}
                </Button>
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default Others;
{
  /* {path.slice(0, 3).map((item, index) => {
            return (
              <Text
                textAlign={'center'}
                backgroundColor={'#F7941F'}
                h={'fit-content'}
                fontSize={{ base: '18px', md: '24px', lg: '24px' }}
                color={'white'}
                key={index}
              >
                {item.path}
              </Text>
            );
          })} */
}
{
  /* {menu.slice(3, 7).map((item, index) => {
            return (
              <Text fontSize={{ base: '24px', md: '32px', lg: '32px' }} color={'white'} key={index}>
                {item.name}
              </Text>
            );
          })}
          {path.slice(3, 12).map((item, index) => {
            return (
              <Text
                textAlign={'center'}
                backgroundColor={'#F7941F'}
                h={'fit-content'}
                fontSize={{ base: '18px', md: '24px', lg: '24px' }}
                color={'white'}
                key={index}
              >
                {item.path}
              </Text>
            );
          })} */
}
