/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  ChakraProvider,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { sportType } from './type';
import { DynamicButtons } from './components/dynamicButton';
import { getAvailability } from './api';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';

function SelectTypeComponent() {
  const navigate = useNavigate();

  let dataType: string;
  let dataGender: string;
  let dataTeam: string;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const handleNextButtonClick = () => {
    if (!dataType && !dataTeam && !dataGender) {
      onOpen();
    } else {
      handleSelectSport();
    }
  };

  const handleBackButtonClick = () => {
    const path = `/rule/${sportParams}`;
    navigate(path);
  };

  const instituteParam = useParams<{ institute: string }>().institute;
  const institute = instituteParam === undefined ? '' : instituteParam;
  const handleSelectSport = () => {
    const path = `/form/${institute}/${dataType.toLowerCase()}/${dataTeam.toLowerCase()}/${dataGender.toLowerCase()}`;
    navigate(path);
  };

  const sportParams = useParams<{ sport: string }>().sport;
  const sport = sportParams === undefined ? '' : sportParams;
  const curSport = sportType[sport];
  const [available, setAvailable] = React.useState<
    {
      id: number;
      sport: string;
      sex: string;
      type: string;
      institute: string;
      status: boolean;
    }[]
  >([]);

  const fetchAvailability = async () => {
    const data = await getAvailability(sport, institute);
    setAvailable(data);
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleButtonClick = (
    buttonIndex: number,
    innerIndex: number,
    gender: string[][],
    teamType: string[][],
  ) => {
    dataType = curSport.title;
    dataGender = gender[buttonIndex][innerIndex];
    dataTeam = teamType[buttonIndex][innerIndex];
  };

  return (
    <ChakraProvider>
      <Box
        w="100dvw"
        h="100dvh"
        pos="fixed"
        style={{ backgroundColor: '#373737' }}
        fontFamily="Noto Sans Thai"
      >
        <Stack direction="column" alignItems="center">
          <Box
            w="200dvw"
            h="60dvh"
            top="-12%"
            pos="fixed"
            borderRadius="50%"
            style={{ backgroundColor: 'white', boxShadow: '0px 30px 30px rgba(0, 0, 0, 0.30)' }}
          ></Box>
          <Flex justify="center">
            <Text color="Black" fontSize="4dvh" pos="absolute" mt="4dvh" as="b">
              {curSport.title}
            </Text>
          </Flex>
          <Image
            src={curSport.image.src}
            alt={curSport.image.alt}
            boxSize="30dvh"
            maxBlockSize="300px"
            objectFit="cover"
            pos="absolute"
            mt="12dvh"
            align="center"
          />
          <Box
            w="55dvw"
            maxW="250px"
            minH="10px"
            h="5dvh"
            pos="fixed"
            mt="50dvh"
            borderRadius="0.8dvh"
            boxShadow="lg"
            style={{ backgroundColor: '#F05A29' }}
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Text color="white" align="center" fontSize="2.5dvh" mt="1">
              โปรดเลือกประเภท
            </Text>
          </Box>
          <Stack direction="column" alignItems="center" mt="57dvh">
            <DynamicButtons
              handleButtonClick={handleButtonClick}
              buttonNames={curSport.sptype}
              gender={curSport.TSportSex}
              teamType={curSport.TSportTeamType}
              available={available}
            />
          </Stack>
          <Stack direction="row" gap="10%" mt="90dvh" pos="fixed">
            <Button
              pos={'fixed'}
              bottom={'2%'}
              left={'5%'}
              backgroundColor={'#F7941F'}
              color={'white'}
              size="lg"
              borderRadius="100px"
              onClick={handleBackButtonClick}
              w={'40%'}
              maxW={'200px'}
              leftIcon={<SlArrowLeft />}
            >
              ย้อนกลับ
            </Button>
            <Button
              pos={'fixed'}
              bottom={'2%'}
              right={'5%'}
              onClick={handleNextButtonClick}
              backgroundColor={'#F7941F'}
              color={'white'}
              size="lg"
              borderRadius="100px"
              w={'40%'}
              maxW={'200px'}
              rightIcon={<SlArrowRight />}
            >
              ถัดไป
            </Button>
          </Stack>
        </Stack>
        <Modal
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="scale"
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            alignItems="center"
            fontFamily="Noto Sans Thai"
            maxW="300px"
            mb="50dvh"
            backgroundColor="#034AB6"
            borderRadius="0.8dvh"
            textColor="white"
          >
            <ModalHeader>โปรดเลือกประเภท</ModalHeader>
            <ModalFooter>
              <Button
                onClick={onClose}
                w="30dvw"
                maxW="100px"
                h="30px"
                borderRadius="50"
                shadow="lg"
                backgroundColor="#F7941F"
                textColor="white"
              >
                ปิด
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

const SelectType = React.memo(SelectTypeComponent);
SelectType.displayName = 'SelectType';

export default SelectType;
