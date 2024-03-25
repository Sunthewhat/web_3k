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
} from '@chakra-ui/react';
import { FC } from 'react';

type AddRoundModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleAddRound: () => Promise<void>;
};

const AddRoundModal: FC<AddRoundModalProps> = ({ isOpen, onClose, handleAddRound }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent fontFamily={'Noto sans thai'} w={['80%', '40%', '40%']}>
        <ModalHeader>เพิ่มรอบการแข่งขัน</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={'flex'} flexDir={'column'}>
            ยืนยันการเพิ่มรอบการแข่งขัน
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
              await handleAddRound();
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

export default AddRoundModal;
