import { Box, Button, IconButton, Select, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { ResultListType } from '../model/resultList';
import { addRound, deleteRound, getRoundList, verifyResult } from '@/api/Result';
import AddRoundModal from './addRoundModal';
import { RoundsType } from '../model/rounds';
import { MdEdit } from 'react-icons/md';
import EditRoundModal from './editRoundModal';
import DeleteRoundModal from './deleteRoundModal';
import ConfirmModal from './confirmModal';

const DetailedContent: FC<{
  data: ResultListType;
  setResultList: React.Dispatch<React.SetStateAction<ResultListType[]>>;
}> = ({ data, setResultList }) => {
  const dateString = data.startTime!.toString().split('T')[0];
  const year = parseInt(dateString.split('-')[0]);
  const month = parseInt(dateString.split('-')[1]);
  const day = parseInt(dateString.split('-')[2]);
  const timeString = data.startTime.toString().split('T')[1].split('.')[0].slice(0, 5);
  const [rounds, setRounds] = useState<RoundsType[]>([]);
  const [selectedWinner, setSelectedWinner] = useState<string>(
    data.Result === null ? '' : data.Result
  );
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

  const handleAddRound = async () => {
    const newRound = await addRound(data.Id);
    setRounds((prev) => {
      return [...prev, newRound];
    });
  };

  const handleDeleteRound = async () => {
    const lastRoundIndex = rounds.length - 1;
    await deleteRound(rounds[lastRoundIndex].id);
    setRounds((prev) => {
      return prev.slice(0, lastRoundIndex);
    });
  };

  const handleVerify = async (
    id: number,
    sport: string,
    winner: string,
    isHaveMedal: boolean,
    team1: string,
    team1Medal: string,
    team2: string,
    team2Medal: string
  ) => {
    await verifyResult(id, sport, winner, isHaveMedal, team1, team1Medal, team2, team2Medal);
    setResultList((prev) => {
      return prev.map((result) => {
        if (result.Id === id) {
          const newResult = result;
          newResult.isVerify = true;
          return newResult;
        } else return result;
      });
    });
  };

  const fetchRounds = async () => {
    const response = await getRoundList(data.Id);
    setRounds(response);
  };

  useEffect(() => {
    fetchRounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box w={'100%'} display={'flex'} justifyContent={'center'}>
      <Box
        borderRadius={20}
        p={[4, 10, 10]}
        w={'97%'}
        bg={'#F05A29'}
        mb={'1vh'}
        color={'white'}
        fontWeight={'bold'}
      >
        <Box w={'100%'} display={'flex'} justifyContent={'space-between'}>
          <Box>
            <Text>
              {data.Team_Match_TID1ToTeam.Sport?.name +
                ' ' +
                data.Team_Match_TID1ToTeam.Sport?.gender +
                ' ' +
                data.Team_Match_TID1ToTeam.Sport?.type +
                (data.Description == null ? '' : ' ' + data.Description)}
            </Text>
            <Text>
              {'วันที่ ' +
                day +
                '/' +
                month +
                '/' +
                year +
                ' เวลา ' +
                timeString +
                ' สถานที่แข่ง ' +
                data.CompetitionRoom +
                ' ' +
                data.CompetitionInstitute}
            </Text>
            <Text>
              {data.Team_Match_TID1ToTeam.Institute +
                ' พบกับ ' +
                data.Team_Match_TID2ToTeam.Institute}
            </Text>
          </Box>
          {data.isVerify && (
            <Box
              color={'#00BC66'}
              p={3}
              h={'fit-content'}
              w={'fit-content'}
              borderRadius={10}
              bg={'white'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text>Verified By KMUTT Student Union</Text>
            </Box>
          )}
        </Box>
        <Box>
          {rounds.map((round, index) => {
            return (
              <Box
                key={index}
                display={'flex'}
                bg={'white'}
                justifyContent={'space-between'}
                mt={'1vh'}
                p={['1vh']}
                borderRadius={10}
              >
                <Box
                  display={'flex'}
                  w={['70%', '50%', '50%']}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Box
                    color={'#034AB6'}
                    display={'flex'}
                    flexDir={'column'}
                    alignItems={'center'}
                    ml={['1rem']}
                  >
                    <Text fontSize={['0.8rem', '1.1rem', '1.1rem']} fontWeight={'bold'}>
                      รอบ
                    </Text>
                    <Text fontSize={['1rem', '2rem', '2rem']} fontWeight={'bold'}>
                      {round.Round}
                    </Text>
                  </Box>
                  <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <Text color={'#F05A29'} fontSize={['0.7rem', '1.4rem', '1.4rem']}>
                      {data.Team_Match_TID1ToTeam.Institute}
                    </Text>
                    <Text color={'black'} fontSize={['0.8rem', '1.4rem', '1.4rem']}>
                      {round.T1_Score}
                    </Text>
                  </Box>
                  <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
                    <Text color={'#F05A29'} fontSize={['0.7rem', '1.4rem', '1.4rem']}>
                      {data.Team_Match_TID2ToTeam.Institute}
                    </Text>
                    <Text color={'black'} fontSize={['0.8rem', '1.4rem', '1.4rem']}>
                      {round.T2_Score}
                    </Text>
                  </Box>
                </Box>
                <Box
                  w={['10%']}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-around'}
                >
                  {!data.isVerify && (
                    <IconButton
                      aria-label="edit"
                      mr={[1, 0, 0]}
                      icon={<MdEdit size={'80%'} />}
                      bg={'white'}
                      onClick={onEditOpen}
                    />
                  )}
                </Box>
                <EditRoundModal
                  isOpen={isEditOpen}
                  onClose={onEditClose}
                  setRounds={setRounds}
                  data={round}
                  teamAName={data.Team_Match_TID1ToTeam.Institute}
                  teamBName={data.Team_Match_TID2ToTeam.Institute}
                />
              </Box>
            );
          })}
        </Box>
        {!data.isVerify && (
          <Box
            w={'100%'}
            mt={'4vh'}
            display={'flex'}
            flexDir={['column', 'row', 'row']}
            justifyContent={'space-evenly'}
            alignItems={'center'}
          >
            <Box />
            <Button onClick={onAddOpen}>เพิ่มรอบการแข่งขัน</Button>
            <Button mt={['1dvh', 0, 0]} onClick={onDeleteOpen}>
              ลบรอบการแข่งขัน
            </Button>
            <Box />
          </Box>
        )}
        <Box
          mt={'2vh'}
          display={'flex'}
          flexDir={'column'}
          w={['100%']}
          justifyContent={'space-between'}
        >
          <Text>ผู้ชนะ</Text>
          <Select
            isDisabled={data.isVerify}
            placeholder="สถาบัน"
            bg={'white'}
            color={'black'}
            w={['50%', '20%', '20%']}
            borderRadius={20}
            value={selectedWinner}
            onChange={(e) => {
              setSelectedWinner(e.target.value);
            }}
          >
            <option value={data.Team_Match_TID1ToTeam.Institute}>
              {data.Team_Match_TID1ToTeam.Institute}
            </option>
            <option value={data.Team_Match_TID2ToTeam.Institute}>
              {data.Team_Match_TID2ToTeam.Institute}
            </option>
            <option value={'draw'}>เสมอ</option>
          </Select>
        </Box>
        <Box w={'100%'} display={'flex'} justifyContent={'flex-end'}>
          <Button
            borderRadius={20}
            bg={!data.isVerify ? '#00BC66 !important' : '#00BC6670 !important'}
            w={['40%', '20%', '20%']}
            boxShadow={'0 5px 10px -3px #000000'}
            onClick={() => {
              if (data.isVerify) return;
              onConfirmOpen();
            }}
          >
            <Text color={'#FFFFFF'}>ยืนยันผล</Text>
          </Button>
        </Box>
      </Box>
      <AddRoundModal isOpen={isAddOpen} onClose={onAddClose} handleAddRound={handleAddRound} />
      <DeleteRoundModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        handleDeleteRound={handleDeleteRound}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        handleConfirm={handleVerify}
        id={data.Id}
        winner={selectedWinner}
        data={data}
      />
    </Box>
  );
};

export default DetailedContent;
