import { Box, Button, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import { FC } from 'react';

const RecheckModal: FC<{ isOpen: boolean; onClose: () => void; }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        w={'70%'}
        backgroundColor={'#034AB6'}
        p={'2%'}
        h={'20%'}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'space-around'}
        alignItems={'center'}
        fontFamily={'Noto Sans Thai'}
      >
        <Box h={'100%'} display={'flex'} flexDir={'column'} justifyContent={'space-around'}>
          <Text color={'white'} fontSize={15} fontWeight={'semibold'}>
            กรุณากรอกข้อมูลให้ครบถ้วน
          </Text>
          <Box
            display={'flex'}
            flexDir={'column'}
            justifyContent={'space-between'}
            alignItems={'center'}
            color={'white'}
          >
            <Button
              w={'48%'}
              borderRadius={'20px'}
              bg={'#898989'}
              color={'white'}
              fontSize={15}
              onClick={onClose}
            >
              ปิด
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default RecheckModal;
