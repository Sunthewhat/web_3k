import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { FC } from 'react';

const ContentEditModal: FC<{
  isEditOpen: boolean;
  onEditClose: () => void;
  handleEdit: (id: number) => void;
  selectingId: number;
  editingContent: string;
  setEditingContent: (value: string) => void;
}> = ({ isEditOpen, onEditClose, handleEdit, selectingId, editingContent, setEditingContent }) => {
  return (
    <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered>
      <ModalOverlay />
      <ModalContent p={'5%'} w={'90%'} fontFamily={'Noto sans thai'}>
        <ModalHeader>
          <Text textAlign={'center'}>แก้ไขประกาศ</Text>
        </ModalHeader>
        <ModalCloseButton />
        <Box>
          <Textarea
            minH={'60vh'}
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
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
            onClick={() => {
              onEditClose();
              handleEdit(selectingId);
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
            onClick={onEditClose}
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

export default ContentEditModal;
