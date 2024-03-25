import { UserContext } from '@/contexts/userContext';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Text,
} from '@chakra-ui/react';
import { FC, useContext, useEffect, useState } from 'react';
import { ResultListType } from '../model/resultList';

type ConfirmModalType = {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: (
    id: number,
    sport: string,
    winner: string,
    isHaveMedal: boolean,
    team1: string,
    team1Medal: string,
    team2: string,
    team2Medal: string
  ) => Promise<void>;
  id: number;
  winner: string;
  data: ResultListType;
};

const ConfirmModal: FC<ConfirmModalType> = ({
  isOpen,
  onClose,
  handleConfirm,
  id,
  winner,
  data,
}) => {
  const user = useContext(UserContext);
  const isAdmin = user.privilege === 'admin';
  const [isHaveMedal, setIsHaveMedal] = useState<boolean>(false);
  const [team1Medal, setTeam1Medal] = useState<string>('');
  const [team2Medal, setTeam2Medal] = useState<string>('');
  const [isTeam1MedalValid, setIsTeam1MedalValid] = useState<boolean>(true);
  const [isTeam2MedalValid, setIsTeam2MedalValid] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) {
      setIsHaveMedal(false);
      setTeam1Medal('');
      setTeam2Medal('');
      setIsTeam1MedalValid(true);
      setIsTeam2MedalValid(true);
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {isAdmin ? (
        <ModalContent fontFamily={'Noto sans thai'} w={['80%', '40%', '40%']}>
          <ModalHeader>ยืนยันการตรวจสอบผลการแข่งขัน</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={'flex'} flexDir={'column'}>
              <Text fontWeight={'bold'}>ผู้ชนะ</Text>
              <Text fontWeight={'bold'} fontSize={'1.5rem'}>
                {winner}
              </Text>
            </Box>
            <Box display={'flex'} mt={'2dvh'}>
              <Switch
                isChecked={isHaveMedal}
                onChange={() => {
                  setIsHaveMedal((prev) => !prev);
                }}
              />
              <Text ml={'1vw'}>มีผู้ได้เหรียญรางวัล</Text>
            </Box>
            {isHaveMedal && (
              <Box mt={'2dvh'}>
                <Box>
                  <Text fontWeight={'bold'}>{data.Team_Match_TID1ToTeam.Institute}</Text>
                  <Select
                    placeholder="เลือกเหรียญรางวัล"
                    isInvalid={!isTeam1MedalValid}
                    value={team1Medal}
                    onChange={(e) => {
                      setIsTeam1MedalValid(true);
                      setTeam1Medal(e.target.value);
                    }}
                  >
                    <option value={'none'}>ไม่มีเหรียญรางวัล</option>
                    <option value={'gold'}>ทอง</option>
                    <option value={'silver'}>เงิน</option>
                    <option value={'bronze'}>ทองแดง</option>
                  </Select>
                </Box>
                <Box mt={'2dvh'}>
                  <Text fontWeight={'bold'}>{data.Team_Match_TID2ToTeam.Institute}</Text>
                  <Select
                    placeholder="เลือกเหรียญรางวัล"
                    isInvalid={!isTeam2MedalValid}
                    value={team2Medal}
                    onChange={(e) => {
                      setIsTeam2MedalValid(true);
                      setTeam2Medal(e.target.value);
                    }}
                  >
                    <option value={'none'}>ไม่มีเหรียญรางวัล</option>
                    <option value={'gold'}>ทอง</option>
                    <option value={'silver'}>เงิน</option>
                    <option value={'bronze'}>ทองแดง</option>
                  </Select>
                </Box>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button bg={'#373737'} color={'white'} mr={3} onClick={onClose}>
              ยกเลิก
            </Button>
            <Button
              bg={'#00BC66'}
              color={'white'}
              onClick={async () => {
                if (isHaveMedal && (team1Medal === '' || team2Medal === '')) {
                  if (team1Medal === '') {
                    setIsTeam1MedalValid(false);
                  }
                  if (team2Medal === '') {
                    setIsTeam2MedalValid(false);
                  }
                  return;
                }
                await handleConfirm(
                  id,
                  data.Team_Match_TID1ToTeam.Sport!.name,
                  winner,
                  isHaveMedal,
                  data.Team_Match_TID1ToTeam.Institute,
                  team1Medal,
                  data.Team_Match_TID2ToTeam.Institute,
                  team2Medal
                );
                onClose();
              }}
            >
              ยืนยัน
            </Button>
          </ModalFooter>
        </ModalContent>
      ) : (
        <ModalContent fontFamily={'Noto sans thai'}>
          <ModalHeader>ไม่สามารถยืนยันผลการแข่งขัน</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={'flex'} flexDir={'column'}>
              คุณไม่มีสิทธิ์ในการยืนยันผลการแข่งขัน
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button bg={'#373737'} color={'white'} mr={3} onClick={onClose}>
              ปิด
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ConfirmModal;
