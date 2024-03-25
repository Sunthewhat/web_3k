import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

import { getAnnouncement } from '@/api/home';
import LoadingOverlay from '@/layout/LoadingOverlay';
import Ranking from '@/pages/home/components/ranking/Ranking';
import Sponser from '@/pages/home/components/sponsers/Sponsers';
import Others from '@/pages/home/components/others/Others';
import { Box, Flex, Hide, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Footer from '@/publicComponents/footer';

// import { SlArrowDownCircle } from 'react-icons/sl';
import HalfCircleBackground from '../../public/assets/half-circle-on-the-fucking-left-home.svg';
import MascotTorch from '../../public/assets/torch-middle.png';
import HomeAlert from './components/alert/HomeAlert';
import SchedulesHome from './components/schedules/SchedulesHome';

function HomeComponent() {
  const {
    data: announcementData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getAnnouncement'],
    queryFn: getAnnouncement,
  });

  console.log(error);

  if (isLoading || error) {
    return <LoadingOverlay />;
  }
  return (
    <>
      {announcementData !== undefined && <HomeAlert announcementData={announcementData} />}
      <Box
        bg="grey.200"
        height="calc(100dvh - 64px)"
        pos="relative"
        zIndex={-99}
        fontFamily={'Noto sans thai'}
      >
        <Image
          src={HalfCircleBackground}
          alt="Half Circle Background"
          pos="absolute"
          top="50%"
          transform="translateY(-50%)"
          height="calc(100dvh - 64px - 20px)"
          hideBelow="lg"
          zIndex={-1}
        />
        <Image
          src={MascotTorch}
          alt="Mascot Torch"
          maxH="70dvh"
          pos="absolute"
          top="50%"
          transform="translateY(-50%)"
          maxHeight="calc(100dvh - 64px - 20px)"
          maxW="500px"
          hideBelow="lg"
        />
        <Flex
          direction="column"
          pos="absolute"
          top="50%"
          right={{ base: '50%', lg: 0 }}
          transform={{ base: 'translate(50%, -50%)', lg: 'translateY(-50%)' }}
          height="calc(100dvh - 64px - 20px)"
          h="auto"
          pr={{ base: 0, lg: 24 }}
          textAlign={{ base: 'center', lg: 'right' }}
          maxW={{ base: '100%', lg: '50%', xl: '61%' }}
          gap={4}
          px={{ base: 6, md: 0 }}
        >
          <Hide above="lg">
            <Image src={MascotTorch} alt="Mascot Torch" maxH="70dvh" maxW="500px" mb={4} />
          </Hide>
          <Text color="white" fontSize={{ base: '18px', md: '24px' }}>
            งานแข่งขันฟุตบอลประเพณีชิงถ้วยพระราชทาน{' '}
            <Hide above="md">
              <br />
            </Hide>
            และกีฬา 3 พระจอมเกล้า ครั้งที่ 15
          </Text>
          <Text color="brand.200" fontSize={{ base: '20px', md: '32px' }} fontWeight={700}>
            The 15th Royal Trophy Trilateral Football Tournament and Sports for King Mongkut`s
            Institutions
          </Text>
        </Flex>
        <Text
          pos="absolute"
          bottom="5%"
          left="50%"
          transform="translateX(-50%)"
          color="white"
          fontSize={{ base: '14px', md: '24px' }}
          textAlign="center"
          w="100%"
        >
          “Prosperity Bonds, Eternal Victories”.
        </Text>
        <Box pos={'absolute'} left={'50%'} bottom={'2%'}>
          <FaArrowDown color="white" />
        </Box>
      </Box>
      <SchedulesHome />
      <Ranking />
      <Others />
      <Sponser />
      <Footer />
    </>
  );
}

const Home = React.memo(HomeComponent);
Home.displayName = 'Home';

export default Home;
