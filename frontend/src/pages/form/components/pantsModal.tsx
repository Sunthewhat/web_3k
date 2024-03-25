import { Box, Button, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import { FC } from 'react';

const PantsModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const size: string[] = ['S', 'M', 'L', 'XL', '3L', '4L'];
  const waist: string[] = ['27-30', '30-33', '33-36', '36-39', '39-42', '42-45'];
  const bust: number[] = [42, 44, 46, 48, 50, 52];
  const length: number[] = [15, 16, 17, 18, 19, 20];
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
          justifyContent={'center'}
          alignItems={'center'}
          p={'2vh'}
          pb={0}
          borderWidth={'1px'}
          borderRadius={'10px'}
          borderColor={'white'}
        >
          <Text fontSize={'32'} color={'white'} fontWeight={'medium'}>
            ไซส์กางเกง
          </Text>
          <Box
            display={'flex'}
            flexDir={'row'}
            color={'white'}
            justifyContent={'space-between'}
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
                รอบเอว
              </Text>
              {waist.map((text: string, index: number) => {
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
                สะโพก
              </Text>
              {bust.map((text: number, index: number) => {
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
          <Box w={'100%'} mt={'4vh'}>
            <Text color={'white'} textAlign={'end'}>
              นิ้ว / inch
            </Text>
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

export default PantsModal;
