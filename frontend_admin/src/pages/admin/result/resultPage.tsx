import { Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useContext, useEffect, useState } from 'react';
import SearchBar from './components/searchBar';
import { getResultList } from '@/api/Result';
import { ResultListType } from './model/resultList';
import ListView from './components/listView';
import { UserContext } from '@/contexts/userContext';
import AddMatchModal from './components/addMatchModal';

const ResultPage: FC = () => {
  const todayDate = new Date();
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [date, setDate] = useState<string>(todayDate.toISOString().split('T')[0]);
  const [institute, setInstitute] = useState<string>('');
  const [sport, setSport] = useState<string>('');
  const [resultList, setResultList] = useState<ResultListType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const fetchResult = async () => {
    const response = await getResultList(date, institute, sport);
    setSelectedIndex(-1);
    setResultList(response);
  };

  const {
    isOpen: isAddMatchOpen,
    onOpen: onAddMatchOpen,
    onClose: onAddMatchClose,
  } = useDisclosure();

  useEffect(() => {
    fetchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowHeight, windowWidth]);
  const user = useContext(UserContext);
  return (
    <Box mt={'10dvh'} w={'100%'} px={'4dvw'} fontFamily={'Noto sans thai'}>
      <Box
        color={'white'}
        bg={'#373737'}
        px={'5vw'}
        py={'2vw'}
        w={['40%', '30%', '20%']}
        borderRadius={'20'}
        ml={'3vw'}
      >
        <Text
          textAlign={'center'}
          fontWeight={'bold'}
          fontSize={[windowWidth * 0.05, windowWidth * 0.03, windowWidth * 0.019]}
        >
          ผลคะแนน
        </Text>
      </Box>
      <SearchBar
        date={date}
        setDate={setDate}
        institute={institute}
        setInstitute={setInstitute}
        sport={sport}
        setSport={setSport}
        fetchResult={fetchResult}
      />
      {user.privilege === 'admin' && (
        <Box w={'100%'} mt={'7dvh'} display={'flex'} justifyContent={'center'}>
          <Button onClick={onAddMatchOpen}>
            <Text>เพิ่มรอบการแข่งขัน</Text>
          </Button>
        </Box>
      )}
      <ListView
        resultList={resultList}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        setResultList={setResultList}
      />
      <AddMatchModal isOpen={isAddMatchOpen} onClose={onAddMatchClose} fetchResult={fetchResult} />
    </Box>
  );
};

export default ResultPage;
