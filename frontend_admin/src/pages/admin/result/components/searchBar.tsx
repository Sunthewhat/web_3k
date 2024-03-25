import { Box, Button, Input, Select, Text } from '@chakra-ui/react';
import { FC } from 'react';

type SearchBarProps = {
  date: string;
  setDate: (date: string) => void;
  institute: string;
  setInstitute: (institute: string) => void;
  sport: string;
  setSport: (sport: string) => void;
  fetchResult: () => void;
};

const SearchBar: FC<SearchBarProps> = ({
  date,
  setDate,
  institute,
  setInstitute,
  sport,
  setSport,
  fetchResult,
}) => {
  return (
    <Box>
      <Text color={'white'} fontSize={['5dvw', '6dvw', '3dvw']} fontWeight={'semibold'} mt={'5dvh'}>
        รายชื่อผลการแข่งขัน
      </Text>
      <Box
        display={'flex'}
        flexDir={['column', 'column', 'row']}
        w={'100%'}
        justifyContent={['space-between']}
        alignItems={['center', 'end', 'center']}
      >
        <Box
          display={'flex'}
          flexDir={['column', 'row', 'row']}
          justifyContent={'space-around'}
          alignItems={'center'}
          w={['100%', '100%', '85%']}
        >
          <Input
            type="date"
            bg={'white'}
            borderRadius={50}
            w={['90%', '23%', '30%']}
            mt={'1dvh'}
            placeholder="วันที่"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <Select
            bg={'white'}
            borderRadius={50}
            w={['90%', '23%', '30%']}
            mt={'1dvh'}
            placeholder="สถาบัน"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
          >
            <option value="KMUTT">KMUTT</option>
            <option value="KMITL">KMITL</option>
            <option value="KMUTNB">KMUTNB</option>
          </Select>
          <Select
            bg={'white'}
            borderRadius={50}
            w={['90%', '23%', '30%']}
            mt={'1dvh'}
            placeholder="กีฬา"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option value={'football'}>ฟุตบอล</option>
            <option value={'futsal'}>ฟุตซอล</option>
            <option value={'basketball'}>บาสเกตบอล</option>
            <option value={'volleyball'}>วอลเลย์บอล</option>
            <option value={'badminton'}>แบดมินตัน</option>
            <option value={'tabletennis'}>ปิงปอง</option>
            <option value={'bridge'}>บริดจ์</option>
            <option value={'esport'}>อีสปอร์ต</option>
            <option value={'petanque'}>เปตอง</option>
          </Select>
        </Box>
        <Button
          bg={'#00BC66 !important'}
          color={'white'}
          borderRadius={50}
          ml={[0, '0', '2vw']}
          mt={['1dvh', '3dvh', '1dvh']}
          w={['70%', '40%', '15%']}
          onClick={fetchResult}
        >
          ค้นหา
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
