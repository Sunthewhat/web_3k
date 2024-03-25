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

type DeleteRoundModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteRound: () => Promise<void>;
};

const DeleteRoundModal: FC<DeleteRoundModalProps> = ({ isOpen, onClose, handleDeleteRound }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent fontFamily={'Noto sans thai'} w={['80%', '40%', '40%']}>
        <ModalHeader>ลบรอบการแข่งขัน</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={'flex'} flexDir={'column'}>
            ยืนยันการลบรอบการแข่งขัน
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button bg={'#373737'} color={'white'} mr={3} onClick={onClose}>
            ยกเลิก
          </Button>
          <Button
            bg={'#F05A29'}
            color={'white'}
            onClick={async () => {
              await handleDeleteRound();
              onClose();
            }}
          >
            ลบ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteRoundModal;
