import { FC, useState } from 'react';
import { RoundsType } from '../model/rounds';
import {
  Box,
  Text,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { editRound } from '@/api/Result';

type EditRoundModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: RoundsType;
  teamAName: string;
  teamBName: string;
  setRounds: React.Dispatch<React.SetStateAction<RoundsType[]>>;
};

const EditRoundModal: FC<EditRoundModalProps> = ({
  isOpen,
  onClose,
  data,
  teamAName,
  teamBName,
  setRounds,
}) => {
  const [teamAScore, setTeamAScore] = useState<number>(data.T1_Score);
  const [teamBScore, setTeamBScore] = useState<number>(data.T2_Score);

  const handleEditRound = async () => {
    await editRound(data.id, teamAScore, teamBScore);
    setRounds((prev) => {
      const index = prev.findIndex((round: RoundsType) => round.id === data.id);
      prev[index].T1_Score = teamAScore;
      prev[index].T2_Score = teamBScore;
      return prev;
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent fontFamily={'Noto sans thai'} w={['80%', '40%', '40%']}>
        <ModalHeader>แก้ไขรอบการแข่งขัน</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={'flex'} flexDir={'column'}>
            <Box w={'100%'} display={'flex'} flexDir={'column'}>
              <Text color={'#F05A29'} fontWeight={'bold'} fontSize={['1.5rem']}>
                {teamAName}
              </Text>
              <Box w={'100%'} display={'flex'} justifyContent={'space-around'}>
                <Button onClick={() => setTeamAScore((prev) => prev - 3)}>- 3</Button>
                <Button onClick={() => setTeamAScore((prev) => prev - 1)}>- 1</Button>
                <Input
                  w={['4rem']}
                  value={teamAScore}
                  color={'black'}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (input === '') {
                      setTeamAScore(0);
                      return;
                    }
                    if (/^\d+$/.test(input)) {
                      setTeamAScore(parseInt(input));
                    }
                  }}
                />

                <Button onClick={() => setTeamAScore((prev) => prev + 1)}>+ 1</Button>
                <Button onClick={() => setTeamAScore((prev) => prev + 3)}>+ 3</Button>
              </Box>
            </Box>
            <Box>
              <Text color={'#F05A29'} fontWeight={'bold'} fontSize={['1.5rem']}>
                {teamBName}
              </Text>
              <Box w={'100%'} display={'flex'} justifyContent={'space-around'}>
                <Button onClick={() => setTeamBScore((prev) => prev - 3)}>- 3</Button>
                <Button onClick={() => setTeamBScore((prev) => prev - 1)}>- 1</Button>
                <Input
                  w={['4rem']}
                  value={teamBScore}
                  color={'black'}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (input === '') {
                      setTeamBScore(0);
                      return;
                    }
                    if (/^\d+$/.test(input)) {
                      setTeamBScore(parseInt(input));
                    }
                  }}
                />
                <Button onClick={() => setTeamBScore((prev) => prev + 1)}>+ 1</Button>
                <Button onClick={() => setTeamBScore((prev) => prev + 3)}>+ 3</Button>
              </Box>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={'#373737'}
            color={'white'}
            mr={3}
            onClick={() => {
              setTeamAScore(data.T1_Score);
              setTeamBScore(data.T2_Score);
              onClose();
            }}
          >
            ยกเลิก
          </Button>
          <Button
            bg={'#00BC66'}
            color={'white'}
            onClick={async () => {
              await handleEditRound();
              onClose();
            }}
          >
            แก้ไข
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditRoundModal;
