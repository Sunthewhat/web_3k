import { deleteAnnouncement } from '@/api/Announcement';
import {
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Box,
  Button,
} from '@chakra-ui/react';
import { FC } from 'react';

const DeleteAnnouncementModal: FC<{
  onClose: () => void;
  isOpen: boolean;
  selectingId: number;
  setAnnouncement: any;
}> = ({ onClose, isOpen, selectingId, setAnnouncement }) => {
  const handleDelete = async (id: number) => {
    await deleteAnnouncement(id);
    setAnnouncement((prev: any) => {
      return prev.filter((data: any) => data.announcementId !== id);
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={'5%'} w={['90%', '40%']} fontFamily={'Noto sans thai'}>
        <ModalHeader>
          <Text textAlign={'center'}>ยืนยันที่จะลบประกาศ</Text>
        </ModalHeader>
        <ModalCloseButton />
        <Box
          w={'100%'}
          display={'flex'}
          flexDir={'row-reverse'}
          justifyContent={'space-between'}
          mt={'5vh'}
        >
          <Button
            bg={'#00BC66 !important'}
            borderRadius={'50'}
            w={['30vw', '10vw']}
            h={'5vh'}
            ml={'2vw'}
            mt={'2vh'}
            onClick={async () => {
              await handleDelete(selectingId);
              onClose();
            }}
          >
            <Text
              color={'white'}
              fontFamily={'Noto sans thai'}
              fontWeight={'bold'}
              fontSize={'2vh'}
              px={'0.5em'}
            >
              ยืนยัน
            </Text>
          </Button>
          <Button
            bg={'#F7941F !important'}
            borderRadius={'50'}
            w={['30vw', '10vw']}
            h={'5vh'}
            ml={'2vw'}
            mt={'2vh'}
            onClick={onClose}
          >
            <Text
              color={'white'}
              fontFamily={'Noto sans thai'}
              fontWeight={'bold'}
              fontSize={'2vh'}
              px={'0.5em'}
            >
              ยกเลิก
            </Text>
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAnnouncementModal;
