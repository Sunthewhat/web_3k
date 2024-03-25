import { Box, Button, Grid, Input, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { AthleteData } from './components/athleteSportModal';
import {
  getAthleteName,
  getAthleteSport,
  getLogs,
  getMatch,
  getStaffName,
} from '@/api/AthleteRegister';
import React from 'react';
import { CheckedInType, Match, Staff } from './model/match';
import { MdPhotoCamera } from 'react-icons/md';
import SearchBar from './components/searchBar';
import AthleteScanModal from './components/athleteScanModal';
import StaffCheckInModal from './components/staffCheckinModal';

const AthleteRegister: FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  const finalRef = React.useRef(null);
  const [athName, setAthName] = useState('');
  const [date, setDate] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [sport, setSport] = useState<string>('');
  const [athid, setAthid] = useState<string>('');
  const [athId, setAthId] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const [institute, setInstitute] = useState<string>('');
  const [matchData, setMatchData] = useState<Match[]>([]);
  const [athData, setAthData] = useState<AthleteData[]>([]);
  const [athleteInstitute, setAthleteInstitute] = useState('');
  const [checkedIn, setCheckedIn] = useState<CheckedInType>([]);
  const [staffData, setStaffData] = useState<Staff>();

  const {
    isOpen: isAthleteScanOpen,
    onOpen: onAthleteScanOpen,
    onClose: onAthleteScanClose,
  } = useDisclosure();

  const {
    isOpen: isStaffScanOpen,
    onOpen: onStaffScanOpen,
    onClose: onStaffScanClose,
  } = useDisclosure();

  const startScanning = () => {
    setScanning(true);
  };

  const getMatchdata = async () => {
    const j = await getMatch();
    setMatchData(j);
  };

  const handleScan = async (data: string) => {
    if (data) {
      data = data.replace(/'/g, '"');
      const jsonObject = JSON.parse(data);
      const institute = jsonObject.id.split('-')[0];
      const type = jsonObject.id.split('-')[1];
      if (type == '04') {
        if (institute == '0151') {
          setAthleteInstitute('KMUTNB');
        } else if (institute == '0152') {
          setAthleteInstitute('KMUTT');
        } else if (institute == '0153') {
          setAthleteInstitute('KMITL');
        }
        const j = await getAthleteSport(jsonObject.id);
        setAthData(j);
        setAthName(jsonObject.name);
        setAthId(jsonObject.id);
        setScanning(false);
        onAthleteScanOpen();
      } else {
        handleStaffCheckIn(jsonObject.id);
      }
    }
  };

  const handleManual = async () => {
    if (athid.split('-')[1] === '04') {
      const institute = athid.split('-')[0];
      if (institute == '0151') {
        setAthleteInstitute('KMUTNB');
      } else if (institute == '0152') {
        setAthleteInstitute('KMUTT');
      } else if (institute == '0153') {
        setAthleteInstitute('KMITL');
      }
      const j = await getAthleteSport(athid);
      setAthData(j);
      const res = await getAthleteName(athid);
      setAthName(res.Name);
      setAthId(res.Id);
      onAthleteScanOpen();
    } else {
      handleStaffCheckIn(athid);
    }
  };

  const handleStaffCheckIn = async (sid: string) => {
    const res = await getStaffName(sid);
    setStaffData(res);
    onStaffScanOpen();
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const fetchCheckedIn = async () => {
    const res = await getLogs();
    setCheckedIn(res);
  };

  useEffect(() => {
    fetchCheckedIn();
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

  useEffect(() => {
    getMatchdata();
  }, []);

  return (
    <Box
      mt={'5dvh'}
      minH={'200dvh'}
      display={'flex'}
      flexDir={'column'}
      alignItems={'center'}
      fontFamily={'Noto sans thai'}
    >
      <Box
        m={'10'}
        px={'2dvw'}
        bg={'#373737'}
        color={'white'}
        w={['40%', '20%']}
        py={['2dvw', '1dvw']}
        borderRadius={['10', '20']}
      >
        <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.02]}>
          ลงทะเบียน
        </Text>
      </Box>
      <Box
        bg={'white'}
        pos={'absolute'}
        borderRadius={'20'}
        w={['75dvw', '0.3dvw']}
        h={['0.5dvh', '40dvh']}
        mt={['65dvh', '20dvh']}
      ></Box>
      <Grid templateColumns={['repeat(1, 100dvw)', 'repeat(2, 50dvw)']} gap={6} mt={'5dvh'}>
        <Box w={['100dvw', '40dvw']} h={'40dvh'} borderRadius={'20'} ml={['0', '10dvw']}>
          <Text
            mt={'2dvh'}
            textAlign={'center'}
            fontSize={[windowWidth * 0.06, windowWidth * 0.02]}
            color={'white'}
          >
            กรอกรหัส
          </Text>
          <Box display={'flex'} justifyContent={'center'} h={windowHeight * 0.06} mt={'10dvh'}>
            <Input
              bg={'white'}
              value={athid}
              pos={'relative'}
              placeholder="Code"
              w={['70%', '60%']}
              borderRadius={'50'}
              h={windowHeight * 0.065}
              fontSize={windowHeight * 0.02}
              onChange={(e) => {
                setAthid(e.target.value);
              }}
            />
          </Box>
          <Box display={'flex'} justifyContent={'center'} h={windowHeight * 0.06} mt={'10dvh'}>
            <Button
              h={'5dvh'}
              pos={'relative'}
              borderRadius={'50'}
              bg={'#00BC66 !important'}
              w={['37dvw', '15dvw', '15dvw']}
            >
              <Text
                px={'0.5em'}
                color={'white'}
                fontWeight={'bold'}
                fontFamily={'Noto sans thai'}
                fontSize={[windowWidth * 0.04, windowWidth * 0.015]}
                onClick={() => {
                  // console.log('Click!');
                  handleManual();
                }}
              >
                ตรวจสอบข้อมูล
              </Text>
            </Button>
          </Box>
        </Box>
        <Box
          h={'40dvh'}
          mt={['10dvh', '0']}
          borderRadius={'20'}
          w={['100dvw', '40dvw']}
          justifyItems={'center'}
          justifyContent={'center'}
        >
          <Text
            mt={'2dvh'}
            color={'white'}
            textAlign={'center'}
            fontSize={[windowWidth * 0.06, windowWidth * 0.02]}
          >
            สแกนคิวอาร์โค้ด
          </Text>
          {scanning && (
            <Box display={'flex'} justifyContent={'center'} pos={'relative'} pt={'5dvh'}>
              <Box w={['23dvh', '20dvh']} h={['23dvh', '20dvh']}>
                <QrScanner onError={handleError} onDecode={handleScan} />
              </Box>
            </Box>
          )}
          {!scanning && (
            <Box display={'flex'} justifyContent={'center'} pos={'relative'} pt={'5dvh'}>
              <Box
                bg={'white'}
                pos={'relative'}
                display={'flex'}
                borderRadius={'20'}
                alignItems={'center'}
                w={['21dvh', '18dvh']}
                h={['21dvh', '18dvh']}
                onClick={startScanning}
                justifyContent={'center'}
              >
                <MdPhotoCamera size={'50%'} color="grey" />
              </Box>
            </Box>
          )}
          <Text
            color={'white'}
            textAlign={'center'}
            mt={scanning ? '5dvh' : '5dvh'}
            fontSize={[windowWidth * 0.045, windowWidth * 0.015]}
          >
            กดเพื่อเริ่มสแกน
          </Text>
        </Box>
      </Grid>
      <Box
        px={'2dvw'}
        mt={'7dvh'}
        bg={'#373737'}
        color={'white'}
        pos={'relative'}
        w={['40%', '20%']}
        py={['2dvw', '1dvw']}
        borderRadius={['10', '20']}
      >
        <Text textAlign={'center'} fontSize={[windowWidth * 0.04, windowWidth * 0.02]}>
          รายชื่อลงทะเบียน
        </Text>
      </Box>
      <SearchBar
        name={name}
        date={date}
        athid={athid}
        sport={sport}
        setName={setName}
        setDate={setDate}
        setSport={setSport}
        checkedIn={checkedIn}
        matchData={matchData}
        institute={institute}
        windowWidth={windowWidth}
        setInstitute={setInstitute}
        windowHeight={windowHeight}
      />
      <AthleteScanModal
        athId={athId}
        athData={athData}
        athName={athName}
        finalRef={finalRef}
        windowWidth={windowWidth}
        isOpen={isAthleteScanOpen}
        onClose={onAthleteScanClose}
        fetchCheckedIn={fetchCheckedIn}
        athleteInstitute={athleteInstitute}
      />

      <StaffCheckInModal
        staffData={staffData}
        isOpen={isStaffScanOpen}
        onClose={onStaffScanClose}
      />
    </Box>
  );
};

export default AthleteRegister;
