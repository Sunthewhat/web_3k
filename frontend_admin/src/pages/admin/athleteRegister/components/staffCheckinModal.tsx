import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Staff } from '../model/match';
import { registerStaff } from '@/api/AthleteRegister';

type StaffCheckInModalProps = {
  isOpen: boolean;
  onClose: () => void;
  staffData: Staff | undefined;
};

const StaffCheckInModal: FC<StaffCheckInModalProps> = ({ isOpen, onClose, staffData }) => {
  const { isOpen: isResOpen, onOpen: onResOpen, onClose: onResClose } = useDisclosure();
  const [result, setResult] = useState('');
  if (!staffData) return null;
  const handleRegister = async () => {
    const response = await registerStaff(staffData.Id);
    setResult(response);
    onResOpen();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={'90dvw'}>
        <ModalHeader>ตรวจสอบการลงทะเบียน</ModalHeader>
        <ModalHeader>ชื่อ: {staffData.Prefix + staffData.Name}</ModalHeader>
        <ModalHeader>ตำแหน่ง: {staffData.Position}</ModalHeader>
        <ModalHeader>ID: {staffData.Id}</ModalHeader>
        <ModalFooter gap={2}>
          <Button colorScheme="orange" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button colorScheme="green" onClick={handleRegister}>
            ลงทะเบียน
          </Button>
        </ModalFooter>
        <Modal isOpen={isResOpen} onClose={onResClose} isCentered>
          <ModalOverlay />
          <ModalContent maxW={'95%'}>
            <ModalHeader textAlign={'center'}>{result}</ModalHeader>
            <ModalFooter justifyContent={'center'}>
              <Button
                colorScheme="orange"
                onClick={() => {
                  onResClose();
                  onClose();
                }}
              >
                ปิด
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ModalContent>
    </Modal>
  );
};

export default StaffCheckInModal;
