import { Box, Button, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { ResultListType } from '../model/resultList';
import DetailedContent from './detailedContent';

const ListView: FC<{
  resultList: ResultListType[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  setResultList: React.Dispatch<React.SetStateAction<ResultListType[]>>;
}> = ({ resultList, setSelectedIndex, selectedIndex, setResultList }) => {
  return (
    <Box bg={'white'} borderRadius={20} mt={['2dvh', '7dvh']} p={[0, '2dvh', '3dvh']}>
      {resultList.length == 0 && (
        <>
          <Text textAlign={'center'}>ไม่พบการแข่งขันในวันนี้</Text>
          <Text textAlign={'center'}>กรุณาตรวจสอบการค้นหาของคุณ</Text>
        </>
      )}
      {resultList.map((result, index) => {
        return (
          <Box key={index} display={'flex'} flexDir={'column'}>
            <Box
              display={'flex'}
              flexDir={['column', 'row', 'row']}
              justifyContent={'space-around'}
              alignItems={'center'}
              p={'2dvh'}
              mt={'2dvh'}
            >
              <Box
                width={['100%', '100%', '80%']}
                borderRadius={20}
                display={'flex'}
                flexDir={['column', 'row', 'row']}
                justifyContent={'space-around'}
                fontSize={['3dvw', '2.5dvw', '1.5dvw']}
              >
                <Box
                  display={'flex'}
                  flexDir={['row', 'row', 'row']}
                  width={['30%', '25%', '25%']}
                  justifyContent={'space-between'}
                >
                  <Text fontWeight={'semibold'}>{result.Team_Match_TID1ToTeam.Sport?.Id}</Text>
                  <Text fontWeight={'semibold'}>{result.Team_Match_TID1ToTeam.Sport?.name}</Text>
                </Box>
                <Box w={['100%', '60%', '60%']} display={'flex'}>
                  <Box w={['50%']}>
                    <Text fontWeight={'semibold'}>
                      {result.Team_Match_TID1ToTeam.Sport?.gender +
                        ' ' +
                        result.Team_Match_TID1ToTeam.Sport?.type}
                    </Text>
                  </Box>
                  <Box w={['100%', '55%', '55%']} display={'flex'} justifyContent={'space-between'}>
                    <Text textAlign={'center'} w={'40%'} fontWeight={'semibold'}>
                      {result.Team_Match_TID1ToTeam.Institute}
                    </Text>
                    <Text textAlign={'center'} fontWeight={'semibold'}>
                      VS
                    </Text>
                    <Text textAlign={'center'} w={'40%'} fontWeight={'semibold'}>
                      {result.Team_Match_TID2ToTeam.Institute}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box w={['100%', '20%', '20%']} display={'flex'} justifyContent={'flex-end'}>
                <Button
                  color={'white'}
                  bg={'#F05A29 !important'}
                  width={['30%', '70%', '50%']}
                  mt={['2dvh', '0', '0']}
                  onClick={() => {
                    if (selectedIndex == index) setSelectedIndex(-1);
                    else setSelectedIndex(index);
                  }}
                >
                  ดูข้อมูล
                </Button>
              </Box>
            </Box>
            {selectedIndex == index && (
              <DetailedContent data={result} setResultList={setResultList} />
            )}
            {resultList.length - 1 != index && (
              <Box w={'100%'} display={'flex'} alignItems={'center'} flexDir={'column'}>
                <Box w={'95%'} h={'1px'} border={'1px'} borderColor={'#C1C1C1'} />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ListView;
