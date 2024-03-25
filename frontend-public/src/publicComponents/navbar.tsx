import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Box,
  Collapse,
  Flex,
  Hide,
  Icon,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { IconBaselineDensityMedium, IconChevronUp, IconX } from '@tabler/icons-react';

import Logo3K from '../public/assets/3k_logo.png';

const routes = [
  {
    name: 'กำหนดการ',
    path: '/',
  },
  {
    name: 'การแข่งขัน',
    path: '/schedules',
  },
  {
    name: 'กีฬาของเรา',
    path: '/sports',
  },
  {
    name: 'การเดินทาง',
    path: '/travel',
  },
];

const Navbar: FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();

  return (
    <React.Fragment>
      <Flex
        as="nav"
        pos={'fixed'}
        top={'0'}
        h="64px"
        w="100dvw"
        bg="white"
        alignItems="center"
        justifyContent="center"
        px={12}
        gap={8}
        zIndex={1000}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        <Box pos="absolute" left={0} ml={{ base: 4, md: 12 }}>
          <Image src={Logo3K} alt="Logo 3K" w="48px" h="48px" />
        </Box>
        <Flex hideBelow={'lg'} gap={12}>
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
        <Hide above={'lg'}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <IconX /> : <IconBaselineDensityMedium />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            pos="absolute"
            right={0}
            mr={{ base: 4, md: 12 }}
          />
        </Hide>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack bg="white" px={4} py={8} display={{ lg: 'none' }} mt="64px">
          {routes.map((navItem) => (
            <MobileNavItem key={crypto.randomUUID()} label={navItem.name} href={navItem.path} />
          ))}
        </Stack>
      </Collapse>
    </React.Fragment>
  );
};

interface NavItem {
  label: string;
  children?: Array<NavItem>;
  href?: string;
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color="gray.600">
          {label}
        </Text>
        {children && (
          <Icon
            as={IconChevronUp}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor="gray.200"
          align={'start'}
        >
          {children?.map((child) => (
            <Box as="a" key={child.label} py={2} href={child.href}>
              {child.label}
            </Box>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default Navbar;
