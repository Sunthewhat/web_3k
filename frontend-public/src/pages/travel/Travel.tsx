import React from 'react';

import { Box, Button, Card, CardBody, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import KfcImage from '../../public/assets/kfc.jpg';

function TravelComponent() {
  const Location = [
    {
      name: 'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง',
      link: 'https://maps.app.goo.gl/MTP9GhpXykadk3T69',
    },
    {
      name: 'มหาวิทยาลัยพระจอมเกล้าพระนครเหนือ',
      link: 'https://maps.app.goo.gl/peRd8vkpzCSAPC5w6',
    },
    {
      name: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี',
      link: 'https://maps.app.goo.gl/ksXL6Jr2Xf9m4opx6',
    },
  ];
  return (
    <Box
      bg="grey.300"
      minH="calc(100dvh - 64px)"
      height="100%"
      zIndex={-99}
      px={{ base: 12, sm: 32 }}
      py={24}
    >
      <section id="header">
        <Text fontSize="4xl" color="brand.200" align="center" fontWeight={700} mb={16}>
          การเดินทาง
        </Text>
        <SimpleGrid
          gap={{ base: 6, lg: 4 }}
          mx={{ lg: 0, xl: 60 }}
          columns={{ base: 1, md: 2 }}
          mb={24}
        >
          <Image src={KfcImage} alt="Travel" w="100%" h="auto" borderRadius={24} m="auto" />
          <Box pr="16px" pb="16px">
            <Card
              borderRadius={24}
              boxShadow="16px 16px 0px 0px #F05A29;"
              bgColor="#D9D9D9"
              px={{ base: 2, lg: 4 }}
              py={{ base: 2, lg: 6 }}
              height="100%"
            >
              <CardBody>
                <Text fontSize={{ lg: '24px' }} fontWeight={700} color="grey.200">
                  โรงยิม KFC
                </Text>
                <Text fontSize={{ lg: '24px' }} fontWeight={700} color="brand.200" mb={2}>
                  มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
                </Text>
                <Button
                  bgColor="brand.200"
                  color="white"
                  _hover={{
                    bgColor: 'brand.300',
                  }}
                >
                  <Link href="https://maps.app.goo.gl/XJ5awXPQegoKUde8A" isExternal>
                    {' '}
                    เปิด Google Map
                  </Link>
                </Button>
              </CardBody>
            </Card>
          </Box>
        </SimpleGrid>
      </section>

      <section id="content">
        <SimpleGrid gap={{ base: 6, md: 16, lg: 24 }} columns={{ base: 1, md: 2, lg: 3 }}>
          {Array.from(Location).map((e) => (
            <Card
              borderRadius={24}
              boxShadow="16px 16px 0px 0px #F05A29;"
              bgColor="#D9D9D9"
              px={{ base: 2, lg: 4 }}
              py={{ base: 2, lg: 6 }}
              height="100%"
              minHeight={{ md: '15vh', lg: '24vh' }}
              key={crypto.randomUUID()}
            >
              <CardBody>
                <Text fontSize={{ lg: '24px' }} fontWeight={700} color="grey.200">
                  {e.name}
                </Text>
                {/* <Text fontSize={{ lg: '24px', xl: '28px' }} fontWeight={700} color="brand.200">
                  โรงยิม
                </Text> */}
                <Button
                  bgColor="brand.200"
                  color="white"
                  _hover={{
                    bgColor: 'brand.300',
                  }}
                >
                  <Link href={e.link} isExternal>
                    {' '}
                    เปิด Google Map
                  </Link>
                </Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </section>
    </Box>
  );
}

const Travel = React.memo(TravelComponent);
Travel.displayName = 'Travel';

export default Travel;
