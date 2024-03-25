import { createAnnouncement } from '@/api/Announcement';
import {
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Box,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { IAnnouncement } from './announcementContainer';

const NewAnnouncementModal: FC<{
  isNewOpen: boolean;
  onNewClose: () => void;
  setAnnouncement: any;
}> = ({ isNewOpen, onNewClose, setAnnouncement }) => {
  const [editingContent, setEditingContent] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  return (
    <Modal isOpen={isNewOpen} onClose={onNewClose} isCentered>
      <ModalOverlay />
      <ModalContent p={'5%'} minW={'90vw'} fontFamily={'Noto sans thai'}>
        <ModalHeader>
          <Text textAlign={'center'}>เพิ่มประกาศ</Text>
        </ModalHeader>
        <Box display={'flex'} w={'100%'} justifyContent={'center'}>
          {isVisible ? <IoMdEye size={'4vh'} /> : <IoMdEyeOff size={'4vh'} />}
        </Box>
        <ModalCloseButton />
        <Box>
          <FormControl>
            <FormLabel>เนื้อหา</FormLabel>
            <Textarea
              minH={'40vh'}
              value={editingContent}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length <= 500 || e.nativeEvent.type === 'deleteContentBackward') {
                  setEditingContent(inputValue);
                }
              }}
            />
          </FormControl>
        </Box>
        <Box w={'100%'} display={'flex'} justifyContent={'space-between'}>
          <Box mt={'2vh'} display={'flex'}>
            <Switch
              defaultChecked
              onChange={(e) => {
                setIsVisible(e.target.checked);
              }}
            />
            <Text ml={'1vw'}>แสดง</Text>
          </Box>
          <Text>{editingContent.length} / 500</Text>
        </Box>
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
              const res = await createAnnouncement(editingContent, isVisible);
              setEditingContent('');
              setIsVisible(true);
              setAnnouncement((prev: IAnnouncement[]) => [...prev, res]);
              onNewClose();
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
            onClick={onNewClose}
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

export default NewAnnouncementModal;
