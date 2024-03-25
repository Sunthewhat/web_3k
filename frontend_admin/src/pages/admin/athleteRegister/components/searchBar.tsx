import {
  Grid,
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { MatchList } from './matchList';
import { CheckedInType, Match } from '../model/match';

type SearchBarProps = {
  windowWidth: number;
  windowHeight: number;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  institute: string;
  setInstitute: React.Dispatch<React.SetStateAction<string>>;
  sport: string;
  setSport: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  athid: string;
  matchData: Match[];
  checkedIn: CheckedInType;
};

const SearchBar: FC<SearchBarProps> = ({
  windowHeight,
  windowWidth,
  date,
  setDate,
  institute,
  setInstitute,
  sport,
  setSport,
  name,
  setName,
  athid,
  matchData,
  checkedIn,
}) => {
  return (
    <Grid
      templateRows={['repeat(1, 10dvh)', 'repeat(2, 10dvh)']}
      gap={6}
      pos={'relative'}
      mt={'5dvh'}
      justifyContent={'center'}
    >
      <Box
        // bg={'white'}
        w={['90dvw', '90dvw']}
        h={'10dvh'}
        borderRadius={'20'}
        justifyContent={'center'}
      >
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(5, 1fr)']} gap={6} mt={'2.5dvh'}>
          <Menu>
            <MenuButton
              as={Button}
              h={'5dvh'}
              fontSize={[windowWidth * 0.045, windowWidth * 0.015]}
              borderRadius={'100'}
            >
              {date === '' ? 'วันที่' : date}
            </MenuButton>
            <MenuList fontSize={[windowWidth * 0.045, windowWidth * 0.015]}>
              <MenuItem onClick={() => setDate('2024-02-09')}>9 กุมภา</MenuItem>
              <MenuItem onClick={() => setDate('2024-02-13')}>13 กุมภา</MenuItem>
              <MenuItem onClick={() => setDate('2024-02-16')}>16 กุมภา</MenuItem>
              <MenuItem onClick={() => setDate('2024-02-27')}>27 กุมภา</MenuItem>
              <MenuItem onClick={() => setDate('2024-03-02')}>2 มีนา</MenuItem>
              <MenuItem onClick={() => setDate('2024-03-06')}>6 มีนา</MenuItem>
              <MenuItem onClick={() => setDate('2024-03-09')}>9 มีนา</MenuItem>
            </MenuList>
          </Menu>
          {/* <Input h={'5dvh'} borderRadius={'100'} bg={'white'} fontSize={'2rem'} type='date' /> */}
          <Menu>
            <MenuButton
              as={Button}
              h={'5dvh'}
              fontSize={[windowWidth * 0.045, windowWidth * 0.015]}
              borderRadius={'100'}
            >
              {institute === '' ? 'สถาบัน' : institute}
            </MenuButton>
            <MenuList fontSize={[windowWidth * 0.045, windowWidth * 0.015]}>
              <MenuItem onClick={() => setInstitute('KMUTT')}>KMUTT</MenuItem>
              <MenuItem onClick={() => setInstitute('KMITL')}>KMITL</MenuItem>
              <MenuItem onClick={() => setInstitute('KMUTNB')}>KMUTNB</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              h={'5dvh'}
              fontSize={[windowWidth * 0.045, windowWidth * 0.015]}
              borderRadius={'100'}
            >
              {sport === '' ? 'กีฬา' : sport}
            </MenuButton>
            <MenuList fontSize={[windowWidth * 0.045, windowWidth * 0.015]}>
              <MenuItem onClick={() => setSport('Football')}>Football</MenuItem>
              <MenuItem onClick={() => setSport('Futsal')}>Futsal</MenuItem>
              <MenuItem onClick={() => setSport('Basketball')}>Basketball</MenuItem>
              <MenuItem onClick={() => setSport('Volleyball')}>Volleyball</MenuItem>
              <MenuItem onClick={() => setSport('Badminton')}>Badminton</MenuItem>
              <MenuItem onClick={() => setSport('Table tennis')}>Table tennis</MenuItem>
              <MenuItem onClick={() => setSport('ROV')}>ROV</MenuItem>
              <MenuItem onClick={() => setSport('Valoran')}>Valorant</MenuItem>
              <MenuItem onClick={() => setSport('Petanque')}>Petanque</MenuItem>
              <MenuItem onClick={() => setSport('Bridge')}>Bridge</MenuItem>
            </MenuList>
          </Menu>
          <Input
            placeholder="ชื่อนักกีฬา"
            h={windowHeight * 0.05}
            w={['100%', '100%']}
            bg={'white'}
            borderRadius={'50'}
            fontSize={windowHeight * 0.02}
            pos={'relative'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            pos={'relative'}
            borderRadius={'50'}
            bg={'red !important'}
            w={['37dvw', '15dvw', '15dvw']}
            h={'5dvh'}
            onClick={() => {
              setDate('');
              setInstitute('');
              setSport('');
              setName('');
            }}
          >
            <Text
              color={'white'}
              fontFamily={'Noto sans thai'}
              fontWeight={'bold'}
              fontSize={[windowWidth * 0.04, windowWidth * 0.015]}
              px={'0.5em'}
            >
              รีเซ็ต
            </Text>
          </Button>
        </Grid>
      </Box>
      <Box
        bg={'white'}
        mt={['30dvh', 0]}
        h={'80dvh'}
        borderRadius={'20'}
        scrollBehavior={'smooth'}
        overflow={'scroll'}
      >
        <MatchList
          athId={athid}
          matchAll={matchData}
          checkedIn={checkedIn}
          date={date}
          institute={institute}
          sport={sport}
          name={name}
        />
      </Box>
    </Grid>
  );
};

export default SearchBar;
