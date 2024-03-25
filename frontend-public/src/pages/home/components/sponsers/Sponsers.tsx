import { Box, Image, Text } from '@chakra-ui/react';
import Sponser from '@/public/assets/sponser.svg';
import Mansome from '@/public/assets/mansome.svg';
import Molten from '@/public/assets/molten.svg';
import Sumsung from '@/public/assets/samsung.svg';

function Sponsers() {
  return (
    <Box bg={'grey.200'} fontFamily={'Noto sans thai'}>
      <Box
        w={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        paddingTop={'100px'}
      >
        <Text
          color={'white'}
          backgroundColor={'#F05A29'}
          p={'5px 70px 5px 70px'}
          borderRadius={'20px'}
          fontSize={{ base: '24px', md: '32px', lg: '32px' }}
          textAlign={'center'}
        >
          ขอขอบคุณ
        </Text>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Box
          display={'flex'}
          flexDir={{ base: 'column', lg: 'row' }}
          w={'50%'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={'50px'}
        >
          <Box w={'fit-content'} h={'fit-content'} m={'10px'}>
            {' '}
            <Image src={Sponser} />
          </Box>
          <Box w={'fit-content'} h={'fit-content'} m={'10px'}>
            <Image src={Mansome} />
          </Box>
          <Box w={'fit-content'} h={'fit-content'} m={'10px'}>
            <Image src={Molten} />
          </Box>
        </Box>
      </Box>

      <Box display={'flex'} justifyContent={'center'}>
        <Box
          display={'flex'}
          flexDir={{ base: 'column', lg: 'row' }}
          w={{base: '50%', lg: '30%'}}
          justifyContent={'space-between'}
          alignItems={'center'}
          
        >
          <Box w={'fit-content'} h={'fit-content'} m={'10px'}>
            {' '}
            <Image src={Sumsung} />
          </Box>
          
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'center'} marginTop={'50px'}>
        {/* fix */}
        <Text
          color={'white'}
          fontSize={{ base: '10px', md: '12px', lg: '14px' }}
          textAlign={'center'}
          p={'0px 20px 0px 20px'}
        >
          © 2023 - 2024 School of Information Technology Student Association KMUTT and its
          affiliates . All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
export default Sponsers;
