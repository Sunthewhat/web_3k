import { Box, Button, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import { FC } from 'react';

const ContinueModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  isLoading: boolean;
}> = ({ isOpen, isLoading, onClose, handleConfirm }) => {
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
        {!isLoading && (
          <Box h={'100%'} display={'flex'} flexDir={'column'} justifyContent={'space-around'}>
            <Text color={'white'} fontSize={15} fontWeight={'semibold'}>
              กรุณาตรวจสอบข้อมูลก่อนยืนการส่ง
            </Text>
            <Box display={'flex'} justifyContent={'space-between'} color={'white'}>
              <Button
                w={'48%'}
                borderRadius={'20px'}
                bg={'#898989'}
                color={'white'}
                fontSize={15}
                onClick={onClose}
              >
                ตรวจสอบข้อมูล
              </Button>
              <Button
                w={'48%'}
                borderRadius={'20px'}
                bg={'#00BC66'}
                color={'white'}
                fontSize={15}
                onClick={handleConfirm}
              >
                ยืนยัน
              </Button>
            </Box>
          </Box>
        )}
        {isLoading && (
          <Box>
            <Text color={'white'} fontSize={25} fontWeight={'semibold'}>
              กำลังส่งข้อมูล
            </Text>
          </Box>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ContinueModal;
