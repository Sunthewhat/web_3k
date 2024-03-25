import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';

const VisibilityModal: FC<{
  isVisOpen: boolean;
  onVisClose: () => void;
  handleVisibility: (id: number) => void;
  selectingId: number;
}> = ({ isVisOpen, onVisClose, handleVisibility, selectingId }) => {
  return (
    <Modal isOpen={isVisOpen} onClose={onVisClose} isCentered>
      <ModalOverlay />
      <ModalContent p={'5%'} w={['90%', '40%']} fontFamily={'Noto sans thai'}>
        <ModalHeader>
          <Text textAlign={'center'}>ยืนยันที่จะเปลี่ยนการมองเห็น</Text>
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
            onClick={() => {
              onVisClose();
              handleVisibility(selectingId);
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
            onClick={onVisClose}
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

export default VisibilityModal;
