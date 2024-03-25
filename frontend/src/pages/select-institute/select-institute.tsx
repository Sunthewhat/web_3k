import React from 'react';
import { useNavigate } from 'react-router-dom';

import DesktopHomePageBackground from '@/assets/images/desktop-homepage-background.png';
import SelectInstituteBackground from '@/assets/images/select-institute-background.png';
import Torch from '@/assets/images/torch-middle.png';
import { allInstitute } from '@/constants/all-institute';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserData, setInstitute } from '@/redux/reducer/userDataSlice';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { SlArrowRight } from 'react-icons/sl';

function SelectInstituteComponent() {
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const [selectedInstitute, setSelectedInstitute] = React.useState<
    (typeof allInstitute)[number] | null
  >(userData.institute ?? null);

  const handleSelectInstitute = React.useCallback((institute: (typeof allInstitute)[number]) => {
    setSelectedInstitute(institute);
  }, []);

  const renderInstitute = React.useMemo(() => {
    return allInstitute.map((item) => {
      const isSelectInstitute = selectedInstitute === item;
      return (
        <Button
          key={item}
          fontSize={{ base: 20, md: 24 }}
          fontWeight={800}
          py={3}
          borderRadius={32}
          width="100%"
          height="auto"
          color={isSelectInstitute ? 'white' : 'brand.200'}
          bgColor={isSelectInstitute ? 'brand.200 !important' : 'white'}
          onClick={() => handleSelectInstitute(item)}
        >
          {item}
        </Button>
      );
    });
  }, [handleSelectInstitute, selectedInstitute]);

  const handleSubmitInstitute = () => {
    if (selectedInstitute) {
      return new Promise<void>((resolve, reject) => {
        try {
          dispatch(setInstitute(selectedInstitute));
          resolve();
          navigate('/select_sport');
        } catch (error) {
          reject(error);
        }
      });
    }
    return Promise.resolve();
  };

  return (
    <Box
      w="100dvw"
      h="100dvh"
      bgImage={{ base: SelectInstituteBackground, md: DesktopHomePageBackground }}
      bgPos="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      pt={'10vh'}
    >
      <Flex flexDir="column" alignItems="center" top={{ base: '10%', lg: '0' }}>
        <Text
          fontSize={24}
          fontWeight={600}
          color="white"
          bgColor="brand.200"
          px={6}
          py={1}
          borderRadius={8}
        >
          โปรดเลือกสถาบัน
        </Text>
        <Image
          src={Torch}
          alt="3K Logo"
          width={500}
          height={500}
          maxW={{ base: '70dvw', md: '30dvw', lg: '25dvw' }}
          marginBottom={{ md: '24px' }}
          h="auto"
          order={{ md: -1 }}
        />
        <Flex
          flexDir="column"
          justifyContent={'center'}
          alignItems={'center'}
          width={500}
          maxWidth={{ base: '70dvw', md: '50dvw' }}
          mt="4dvh"
          gap="4dvh"
        >
          {renderInstitute}
          <Box display={'flex'} flex={'row'} justifyContent={'space-between'}>
            <Button
              size="lg"
              borderRadius="100px"
              bg={'brand.100 !important'}
              color="white"
              fontSize={{ base: 18, md: 24 }}
              w="40%"
              px={12}
              onClick={() => {
                navigate('/');
              }}
              leftIcon={<SlArrowRight style={{ transform: 'rotate(180deg)' }} />}
            >
              ย้อนกลับ
            </Button>
            <Button
              size="lg"
              borderRadius="100px"
              bg={selectedInstitute === null ? '#898989 !important' : 'brand.100 !important'}
              color="white"
              fontSize={{ base: 18, md: 24 }}
              w="40%"
              px={12}
              onClick={() => {
                if (selectedInstitute !== null) {
                  handleSubmitInstitute();
                }
              }}
              rightIcon={<SlArrowRight />}
            >
              ถัดไป
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

const SelectInstitute = React.memo(SelectInstituteComponent);
SelectInstitute.displayName = 'SelectInstitute';

export default SelectInstitute;
