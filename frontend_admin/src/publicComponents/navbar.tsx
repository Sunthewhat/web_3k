import {
  Box,
  Flex,
  Image,
  Link,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Text,
  Hide,
} from '@chakra-ui/react';

import { FC, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pic3K from '../public/assets/3k_logo.png';
import { UserContext } from '@/contexts/userContext';
// import { useState } from 'react';
import { SlArrowDown, SlMenu } from 'react-icons/sl';
import { logout } from '@/api/Logout';

const routes = [
  {
    name: 'ลงทะเบียน',
    path: '/athleteRegister',
  },
  {
    name: 'ผลคะแนน',
    path: '/score',
  },
  {
    name: 'ประกาศ',
    path: '/Announcement',
  },
  // {
  //   name: 'อื่นๆ',
  //   path: '/Landing',
  // },
  // {
  //   name: 'Hello {$name}',
  //   path: '/',
  // },
];

const Navbar: FC = () => {
  const location = useLocation();
  const user = useContext(UserContext);
  const excludePaths = ['/login', '/testing'];
  const currentPath = location.pathname;
  const shouldShowNavbar = !excludePaths.includes(currentPath);
  const navigate = useNavigate();

  if (!shouldShowNavbar) return null;

  return (
    <Flex
      as="nav"
      pos={'fixed'}
      top={'0'}
      h="64px"
      w="100dvw"
      bg="white"
      alignItems="center"
      justifyContent={['flex-end', 'center', 'center', 'center']}
      px={12}
      gap={8}
      zIndex={1000}
    >
      <Box
        pos={'fixed'}
        right={'4dvw'}
        display={'flex'}
        width={'150px'}
        flexDirection={'row'}
        fontWeight={'bold'}
      >
        {' '}
        <Menu>
          <MenuButton as={Box} onClick={(e) => e.stopPropagation()} cursor="pointer" w={'100%'}>
            <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'space-around'}
              alignItems={'center'}
              hideBelow={['sm', 'md']}
            >
              <Hide below="md">
                <Text>Hello {user.name}</Text>
              </Hide>
              <SlArrowDown />
            </Box>
          </MenuButton>
          <MenuList>
            <MenuItem
              fontWeight={'bold'}
              fontFamily={'Roboto Slab'}
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>{' '}
      </Box>
      <Box
        w={['10%', '10%', '6%', '4%', '2%']}
        pos="absolute"
        left={0}
        ml={12}
        onClick={() => {
          navigate('/');
        }}
      >
        <Image src={pic3K} alt="Logo 3K" w={'100%'} />
      </Box>
      <Flex hideBelow={'md'} gap={12}>
        {routes.map((route) => {
          const isActive = location.pathname === route.path;
          return (
            <Link
              href={route.path}
              fontWeight="bold"
              key={crypto.randomUUID()}
              bgColor={isActive ? 'brand.200' : undefined}
              color={isActive ? 'white' : 'grey.500'}
              px={4}
              py={2}
              rounded={12}
            >
              {route.name}
            </Link>
          );
        })}
      </Flex>
      <Flex>
        <Box
          pos="fixed"
          right={0}
          ml={12}
          paddingRight={'10dvh'}
          color={'red'}
          fontWeight={'bold'}
          fontFamily={'Roboto Slab'}
        ></Box>
        <Menu>
          <MenuButton as={Box} onClick={(e) => e.stopPropagation()} cursor="pointer" w={'100%'}>
            <Box
              hideFrom={'md'}
              w={'100%'}
              display={'flex'}
              justifyContent={'space-around'}
              alignItems={'center'}
              right={0}
              // position={'fixed'}
              // top={'1%'}
              // zIndex={1000}
              // p={4}
            >
              <SlMenu />
            </Box>
          </MenuButton>
          <MenuList>
            <MenuItem
              fontWeight={'bold'}
              fontFamily={'Roboto Slab'}
              onClick={() => {
                navigate('/athleteRegister');
              }}
            >
              ลงทะเบียน
            </MenuItem>
            <MenuItem
              fontWeight={'bold'}
              fontFamily={'Roboto Slab'}
              onClick={() => {
                navigate('/score');
              }}
            >
              ผลคะแนน
            </MenuItem>
            <MenuItem
              fontWeight={'bold'}
              fontFamily={'Roboto Slab'}
              onClick={() => {
                navigate('/Announcement');
              }}
            >
              ประกาศ
            </MenuItem>
            {/* <MenuItem fontWeight={'bold'} fontFamily={'Roboto Slab'}>
              อื่นๆ
            </MenuItem> */}
            <MenuItem
              fontWeight={'bold'}
              fontFamily={'Roboto Slab'}
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
