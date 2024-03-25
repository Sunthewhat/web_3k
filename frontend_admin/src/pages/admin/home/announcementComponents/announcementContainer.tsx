import { editContent, getAnnouncement, setVisibility } from '@/api/Announcement';
import { Box, Button, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { IoMdAddCircle, IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { MdCampaign, MdEdit, MdDelete } from 'react-icons/md';
import VisibilityModal from './visibilityModal';
import ContentEditModal from './contentEditModal';
import NewAnnouncementModal from './newAnnounceModal';
import DeleteAnnouncementModal from './deleteAnnouncementModal';

export type IAnnouncement = {
  announcementId: number;
  content: string;
  createdTime: Date;
  isShowing: boolean;
  userId: number;
  User: {
    name: string;
  };
};

type AnnouncementContainerProps = {
  windowHeight: number;
  windowWidth: number;
};

const AnnouncementContainer: FC<AnnouncementContainerProps> = ({ windowWidth }) => {
  const [announcement, setAnnouncement] = useState<IAnnouncement[]>([]);
  const { isOpen: isVisOpen, onOpen: onVisOpen, onClose: onVisClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectingId, setSelectingId] = useState<number>(0);
  const [editingContent, setEditingContent] = useState<string>('');

  const fetchAnnouncement = async () => {
    const res = await getAnnouncement();
    setAnnouncement(res);
  };

  const handleVisibility = async (id: number) => {
    const value = !announcement.find((announce) => announce.announcementId === id)?.isShowing;
    setAnnouncement((prev) => {
      return prev.map((announce) => {
        if (announce.announcementId === id) {
          announce.isShowing = value;
        }
        return announce;
      });
    });
    await setVisibility(id, value);
  };

  const handleEdit = async (id: number) => {
    const value = editingContent;
    setAnnouncement((prev) => {
      return prev.map((data) => {
        if (data.announcementId === id) {
          const newData = data;
          newData.content = value;
          return newData;
        } else return data;
      });
    });
    await editContent(id, value);
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  return (
    <Box
      mt={'10vh'}
      w={'100%'}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      fontFamily={'Noto sans thai'}
      fontWeight={'bold'}
    >
      <Box w={'100%'} pl={'8dvw'}>
        <Box
          color={'white'}
          bg={'#373737'}
          px={'5vw'}
          py={'2vw'}
          w={['40%', '20%']}
          borderRadius={'20'}
        >
          <Text
            textAlign={'center'}
            fontSize={[windowWidth * 0.05, windowWidth * 0.03, windowWidth * 0.017]}
          >
            ประกาศ
          </Text>
        </Box>
      </Box>
      <Box w={'85%'} bg={'white'} minH={'5vw'} mt={'4vw'} borderRadius={20} px={'2vw'}>
        {announcement.length === 0 && (
          <Box my={'3vh'}>
            <Text fontWeight={'semibold'} textAlign={'center'}>
              ยังไม่มีการประกาศในขณะนี้
            </Text>
          </Box>
        )}
        {announcement.length !== 0 &&
          announcement.map((announce: IAnnouncement, index: number) => {
            const date = new Date(announce.createdTime);
            const dateStr = date.toLocaleDateString('th-TH');
            const time = date.toLocaleTimeString('th-TH');
            return (
              <Box key={index}>
                <Box
                  display={'flex'}
                  my={windowWidth * 0.05}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  <Box h={'100%'} w={[0, '10%', '10%']}>
                    <MdCampaign size={windowWidth * 0.05} />
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                    w={['100%', '90%', '90%']}
                    flexDir={['column', 'row', 'row']}
                  >
                    <Box w={['80%', '70%', '65%']}>
                      <Text
                        textAlign={'center'}
                        fontWeight={'350'}
                        fontSize={[windowWidth * 0.025, windowWidth * 0.02, windowWidth * 0.015]}
                      >
                        {announce.content}
                      </Text>
                    </Box>
                    <Box
                      display={'flex'}
                      flexDir={['row', 'column', 'row']}
                      justifyContent={'space-between'}
                      w={['50%', '20%', '25%']}
                    >
                      <Box>
                        <IconButton
                          my={'1'}
                          bg={'white'}
                          aria-label="Change Visibility"
                          icon={
                            announce.isShowing ? (
                              <IoMdEye size={windowWidth * 0.05} />
                            ) : (
                              <IoMdEyeOff size={windowWidth * 0.05} />
                            )
                          }
                          onClick={() => {
                            onVisOpen();
                            setSelectingId(announce.announcementId);
                          }}
                        />
                      </Box>
                      <Box>
                        <IconButton
                          my={'1'}
                          bg={'white'}
                          aria-label="Edit"
                          icon={<MdEdit size={windowWidth * 0.05} />}
                          onClick={() => {
                            onEditOpen();
                            setSelectingId(announce.announcementId);
                            setEditingContent(announce.content);
                          }}
                        />
                      </Box>
                      <Box>
                        <IconButton
                          my={'1'}
                          bg={'white'}
                          aria-label="Delete"
                          icon={<MdDelete size={windowWidth * 0.05} />}
                          onClick={() => {
                            onDeleteOpen();
                            setSelectingId(announce.announcementId);
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box w={'100%'}>
                  <Text
                    ml={'10%'}
                    textAlign={'left'}
                    fontWeight={'150'}
                    fontSize={[windowWidth * 0.025, windowWidth * 0.02, windowWidth * 0.015]}
                  >
                    สร้างโดย : {announce.User.name} เมื่อ : {dateStr} เวลา : {time}
                  </Text>
                </Box>
                {announcement.length - 1 !== index && (
                  <Box w={'100%'} display={'flex'} justifyContent={'center'}>
                    <Box
                      mt={'2vh'}
                      w={'90%'}
                      h={'1px'}
                      border={'1px'}
                      borderColor={'#B7ADAD'}
                    ></Box>
                  </Box>
                )}
              </Box>
            );
          })}
      </Box>
      <Box w={'85%'} display={'flex'} justifyContent={'end'} mt={'3vw'}>
        <Button
          fontWeight={'bold'}
          color={'white'}
          bg={'#F7941F !important'}
          borderRadius={20}
          w={['40dvw', '40dvw', '20dvw', '20dvw', '15dvw']}
          h={['10dvw', '8dvh', '4dvh', '4dvh', '5dvh']}
          boxShadow={'0 5px 10px -3px #000000'}
          leftIcon={<IoMdAddCircle width={'10%'} color="white" />}
          onClick={onNewOpen}
        >
          สร้างประกาศใหม่
        </Button>
      </Box>
      <VisibilityModal
        handleVisibility={handleVisibility}
        isVisOpen={isVisOpen}
        onVisClose={onVisClose}
        selectingId={selectingId}
      />
      <ContentEditModal
        handleEdit={handleEdit}
        isEditOpen={isEditOpen}
        onEditClose={onEditClose}
        selectingId={selectingId}
        editingContent={editingContent}
        setEditingContent={setEditingContent}
      />
      <NewAnnouncementModal
        isNewOpen={isNewOpen}
        onNewClose={onNewClose}
        setAnnouncement={setAnnouncement}
      />
      <DeleteAnnouncementModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        selectingId={selectingId}
        setAnnouncement={setAnnouncement}
      />
    </Box>
  );
};

export default AnnouncementContainer;
