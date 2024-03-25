import Table from '../ranking/components/TableComponent';

import { Box, Text, Button } from '@chakra-ui/react';

const handleClick = () => {
  window.location.href = '/schedules';
};

function Ranking() {
  return (
    <>
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
            ผลการแข่งขัน
          </Text>
        </Box>

        <Table />

        <Box w={'100%'} display={'flex'} justifyContent={'center'} paddingBottom={'30px'}>
          <Button
            backgroundColor={'#F7941F'}
            borderRadius={'20px'}
            color={'white'}
            onClick={handleClick}
          >
            ดูผลการแข่งขันแยกตามรายการ
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default Ranking;
