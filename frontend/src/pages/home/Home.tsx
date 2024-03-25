import React from 'react';
import { Link } from 'react-router-dom';

import Logo3K from '@/assets/image/3k_logo.png';
import DesktopHomePageBackground from '@/assets/images/desktop-homepage-background.png';
import HomePageBackground from '@/assets/images/homepage-background.png';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

function HomeComponent() {
  return (
    <Box
      w="100dvw"
      h="100dvh"
      pos="fixed"
      bgImage={{ base: `url(${HomePageBackground})`, md: `url(${DesktopHomePageBackground})` }}
      bgPos="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Image
        src={Logo3K}
        alt="3K Logo"
        width={314}
        height={333.333}
        pos="fixed"
        left="50%"
        style={{ transform: 'translateX(-50%)' }}
        top="10%"
        maxW="60dvw"
        h="auto"
      />
      <Flex
        direction="column"
        pos="fixed"
        left="50%"
        style={{ transform: 'translateX(-50%)' }}
        bottom="12%"
        w="max-content"
        align="center"
        gap={6}
      >
        <Flex direction="column" align="center" gap={4}>
          <Button
            size="lg"
            borderRadius={24}
            bg="brand.100"
            color="white"
            fontSize={24}
            w="100%"
            as={Link}
            to="/select-institute"
          >
            ลงทะเบียน
          </Button>
          <Button
            size="lg"
            borderRadius={24}
            px="16px"
            w="max-content"
            color="white"
            fontWeight={500}
            fontSize={16}
            bg="grey.100"
            as={Link}
            to="/check/KMUTT"
          >
            ตรวจสอบการลงทะเบียน
          </Button>
        </Flex>
        <Text w="100%" color="white">
          “Prosperity Bonds, Eternal Victories.”
        </Text>
      </Flex>
    </Box>
  );
}

const Home = React.memo(HomeComponent);
Home.displayName = 'Home';

export default Home;
