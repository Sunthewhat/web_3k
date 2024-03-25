import { addMatch, findTeam } from '@/api/Result';
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { AvailableTeamType } from '../model/resultList';

type AddMatchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchResult: () => Promise<void>;
};

const AddMatchModal: FC<AddMatchModalProps> = ({ isOpen, onClose, fetchResult }) => {
  const [sport, setSport] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [Agroup, setAGroup] = useState<string>('-');
  const [Bgroup, setBGroup] = useState<string>('-');
  const [isSportValid, setIsSportValid] = useState<boolean>(true);
  const [isGenderValid, setIsGenderValid] = useState<boolean>(true);
  const [isTypeValid, setIsTypeValid] = useState<boolean>(true);
  const [availableTeam, setAvailableTeam] = useState<AvailableTeamType>({ A: [], B: [] });
  const { isOpen: isLoading, onOpen: onLoadingStart, onClose: onLoadingEnd } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [TID1, setTID1] = useState<string>('');
  const [TID2, setTID2] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>('00:00');
  const [location, setLocation] = useState<string>('');
  const [institute, setInstitute] = useState<string>('');
  const [Description, setDescription] = useState<string>('');

  const fetchAvailableMatch = async () => {
    onLoadingStart();
    const res = await findTeam(sport, gender, type, Agroup, Bgroup);
    setAvailableTeam(res);
    onLoadingEnd();
    setIsLoaded(true);
  };
  const handleAddMatch = async () => {
    await addMatch(TID1, TID2, date, time, location, institute, Description);
    await fetchResult();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent fontFamily={'Noto sans thai'} w={['80%', '40%', '40%']} overflowY={'scroll'}>
        <ModalHeader>เพิ่มรอบการแข่งขัน</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            {!isLoaded && (
              <Box>
                <Text fontWeight={'bold'}>เลือกกีฬา</Text>
                <Select
                  isInvalid={!isSportValid}
                  placeholder="เลือกกีฬา"
                  value={sport}
                  onChange={(e) => {
                    setSport(e.target.value);
                    setIsSportValid(true);
                  }}
                >
                  <option value={'Football'}>ฟุตบอล</option>
                  <option value={'Futsal'}>ฟุตซอล</option>
                  <option value={'Basketball'}>บาสเก็ตบอล</option>
                  <option value={'Volleyball'}>วอลเลย์บอล</option>
                  <option value={'Badminton'}>แบดมินตัน</option>
                  <option value={'Petanque'}>เปตอง</option>
                  <option value={'Table tennis'}>ปิงปอง</option>
                  <option value={'Bridge'}>บริดจ์</option>
                  <option value={'ROV'}>ROV</option>
                  <option value={'Valorant'}>Valorant</option>
                </Select>
                <Text fontWeight={'bold'}>เลือกเพศ</Text>
                <Select
                  isInvalid={!isGenderValid}
                  placeholder="เลือกเพศ"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setIsGenderValid(true);
                  }}
                >
                  <option value={'male'}>ชาย</option>
                  <option value={'female'}>หญิง</option>
                  <option value={'mix'}>ผสม</option>
                </Select>
                <Text fontWeight={'bold'}>เลือกประเภท</Text>
                <Select
                  isInvalid={!isTypeValid}
                  placeholder="เลือกประเภท"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setIsTypeValid(true);
                  }}
                >
                  <option value={'team'}>ทีม</option>
                  <option value={'solo'}>เดี่ยว</option>
                  <option value={'duo'}>คู่</option>
                </Select>
                <Text fontWeight={'bold'}>เลือกสาย (ถ้ามี)</Text>
                <Box display={'flex'} w={'100%'}>
                  <Box w={'49%'}>
                    <Text>ทีม A</Text>
                    <Select
                      placeholder="เลือกสาย"
                      value={Agroup}
                      onChange={(e) => setAGroup(e.target.value)}
                    >
                      <option value={'A'}>A</option>
                      <option value={'B'}>B</option>
                    </Select>
                  </Box>
                  <Box w={'49%'}>
                    <Text>ทีม B</Text>
                    <Select
                      placeholder="เลือกสาย"
                      value={Bgroup}
                      onChange={(e) => setBGroup(e.target.value)}
                    >
                      <option value={'A'}>A</option>
                      <option value={'B'}>B</option>
                    </Select>
                  </Box>
                </Box>

                <Box w={'100%'}>{isLoading && <Text textAlign={'center'}>กำลังค้นหา</Text>}</Box>
                <Box w={'100%'} display={'flex'} justifyContent={'flex-end'} mt={'3dvh'}>
                  <Button
                    onClick={() => {
                      if (sport === '') {
                        setIsSportValid(false);
                        return;
                      }
                      if (gender === '') {
                        setIsGenderValid(false);
                        return;
                      }
                      if (type === '') {
                        setIsTypeValid(false);
                        return;
                      }
                      fetchAvailableMatch();
                    }}
                  >
                    ค้นหา
                  </Button>
                </Box>
              </Box>
            )}
            {isLoaded && (
              <Box display={'flex'} flexDir={'column'} w={'100%'}>
                <Button bg={'#373737'} color={'white'} onClick={() => setIsLoaded(false)}>
                  ค้นหาใหม่
                </Button>
                <Box w={'100%'} display={'flex'} justifyContent={'space-between'} mt={'3dvh'}>
                  <Box w={'49%'}>
                    <Text>ทีม A</Text>
                    <Select
                      placeholder="เลือกทีม A"
                      onChange={(e) => {
                        setTID1(e.target.value);
                      }}
                    >
                      {availableTeam.A.map((team, index: number) => {
                        return (
                          <option key={index} value={team.Id}>
                            {team.Institute}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box w={'49%'}>
                    <Text>ทีม B</Text>
                    <Select placeholder="เลือกทีม B" onChange={(e) => setTID2(e.target.value)}>
                      {availableTeam.A.map((team, index: number) => {
                        return (
                          <option key={index} value={team.Id}>
                            {team.Institute}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                </Box>
                <Box>
                  <Text mt={'3dvh'}>วันที่และเวลาการแข่งขัน</Text>
                  <Input
                    mt={'2dvh'}
                    type="time"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                    }}
                  />
                  <Input
                    mt={'2dvh'}
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </Box>
                <Box>
                  <Text mt={'3dvh'}>สถานที่</Text>
                  <Input
                    mt={'2dvh'}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </Box>
                <Box>
                  <Text>มหาวิทยาลัย</Text>
                  <Select
                    placeholder="เลือกมหาวิทยาลัย"
                    onChange={(e) => {
                      setInstitute(e.target.value);
                    }}
                  >
                    <option value="KMUTT">KMUTT</option>
                    <option value="KMITL">KMITL</option>
                    <option value="KMUTNB">KMUTNB</option>
                  </Select>
                </Box>
                <Box>
                  <Text mt={'3dvh'}>คำอธิบายเพิ่มเติม เช่น รอบชิงชนะเลศ</Text>
                  <Input
                    mt={'2dvh'}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button bg={'#373737'} color={'white'} mr={3} onClick={onClose}>
            ยกเลิก
          </Button>
          <Button
            bg={'#00BC66'}
            color={'white'}
            onClick={async () => {
              await handleAddMatch();
              onClose();
            }}
          >
            เพิ่ม
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMatchModal;
