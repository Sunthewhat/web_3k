import { Box, Button, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import { FC } from 'react';

const ShirtModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const size: string[] = ['S', 'M', 'L', 'XL', '3L', '4L', '6L', '8L'];
  const chest: number[] = [38, 40, 42, 44, 46, 48, 52, 56];
  const length: number[] = [26.75, 27.25, 28.25, 28.25, 28.75, 28.75, 31.25, 31.25];
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        w={'90%'}
        backgroundColor={'#034AB6'}
        p={'4%'}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'space-around'}
        alignItems={'center'}
        fontFamily={'Noto Sans Thai'}
      >
        <Box
          w={'100%'}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'start'}
          alignItems={'center'}
          p={'4vh'}
          pb={0}
          borderWidth={'1px'}
          borderRadius={'10px'}
          borderColor={'white'}
        >
          <Text fontSize={'32'} color={'white'} fontWeight={'medium'}>
            ไซส์เสื้อ
          </Text>
          <Box w={'100%'}>
            <Text color={'white'} textAlign={'end'}>
              นิ้ว / inch
            </Text>
          </Box>
          <Box
            display={'flex'}
            flexDir={'row'}
            color={'white'}
            justifyContent={'space-around'}
            w={'100%'}
          >
            <Box
              display={'flex'}
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize={16} fontWeight={'bold'}>
                ขนาด
              </Text>
              {size.map((text: string, index: number) => {
                return (
                  <Text key={index} fontSize={20}>
                    {text}
                  </Text>
                );
              })}
            </Box>
            <Box
              display={'flex'}
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize={16} fontWeight={'bold'}>
                รอบอก
              </Text>
              {chest.map((text: number, index: number) => {
                return (
                  <Text key={index} fontSize={20}>
                    {text}
                  </Text>
                );
              })}
            </Box>
            <Box
              display={'flex'}
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text fontSize={16} fontWeight={'bold'}>
                ความยาว
              </Text>
              {length.map((text: number, index: number) => {
                return (
                  <Text key={index} fontSize={20}>
                    {text}
                  </Text>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Button
          mt={'3vh'}
          backgroundColor={'#F7941F'}
          borderRadius={'20px'}
          w={'50%'}
          color={'white'}
          onClick={onClose}
          fontSize={24}
          fontWeight={'regular'}
        >
          ปิด
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default ShirtModal;
