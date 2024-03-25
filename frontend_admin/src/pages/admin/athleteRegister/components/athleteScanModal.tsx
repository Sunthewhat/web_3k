import {
  Text,
  Box,
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FC } from 'react';
import { SportList } from './athleteSportModal';

type AthleteScanModalProps = {
  finalRef: React.MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
  windowWidth: number;
  athName: string;
  athId: string;
  athleteInstitute: string;
  athData: any;
  fetchCheckedIn: () => Promise<void>;
};

const AthleteScanModal: FC<AthleteScanModalProps> = ({
  athData,
  athId,
  athName,
  athleteInstitute,
  fetchCheckedIn,
  finalRef,
  isOpen,
  onClose,
  windowWidth,
}) => {
  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      size="xl"
      isCentered
      scrollBehavior={'inside'}
    >
      <ModalOverlay />
      <ModalContent
        alignItems="center"
        fontFamily="Noto Sans Thai"
        maxW="80dvw"
        mb="50dvh"
        backgroundColor="#373737"
        borderRadius="0.8dvh"
      >
        <ModalHeader textColor="white" fontSize={[windowWidth * 0.04, windowWidth * 0.02]}>
          ตรวจสอบการลงทะเบียน
        </ModalHeader>
        <ModalBody>
          <Grid templateColumns={'repeat(1, 70dvw)'} gap={6}>
            <Box
              w={'70dvw'}
              color={'black'}
              bg={'white'}
              px={'2dvw'}
              py={['2dvw', '1dvw']}
              borderRadius={['10', '20']}
              fontSize={['5dvh', '3dvh']}
              mb={'2'}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                pos={'relative'}
                fontSize={[windowWidth * 0.04, windowWidth * 0.02]}
              >
                <Grid templateColumns={['repeat(1, 60dvw)', 'repeat(2, 30dvw)']} gap={1}>
                  <Text textAlign={'center'}>ชื่อ : {athName}</Text>
                  <Text textAlign={'center'}>สถาบัน : {athleteInstitute}</Text>
                </Grid>
              </Box>
            </Box>
            <SportList
              athleteSports={athData}
              athId={athId}
              onClose={onClose}
              fetchCheckedIn={fetchCheckedIn}
            />
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            w="30dvw"
            maxW="200px"
            h="5dvh"
            borderRadius="50"
            shadow="lg"
            bg={'#E83F3F !important'}
            textColor="white"
            m={[1, 3]}
            fontSize={[windowWidth * 0.04, windowWidth * 0.012]}
          >
            ยกเลิก
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AthleteScanModal;
