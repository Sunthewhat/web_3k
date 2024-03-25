//import { Box, Flex, Text, Title , Button} from "@mantine/core";
import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';
import React from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { selectUserData } from '@/redux/reducer/userDataSlice';
import { sportRule } from './data';
import { FaRegFilePdf } from 'react-icons/fa';

function RuleComponent() {
  const navigate = useNavigate();
  const sportParam: string | undefined = useParams<{ sport: string }>().sport;
  const instituteData = useAppSelector(selectUserData).institute;

  if (sportParam === undefined || instituteData === null) {
    navigate('/');
    return;
  }
  const sport: string = sportParam === 'E-sport' ? 'Esport' : sportParam || '';
  const institute: string = instituteData;

  //const sport = 'basketball';
  const currentSportRule = sportRule[sport] || {};

  const handleViewPdf = () => {
    const sportParse = sport;
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/timeTable/${sportParse}.pdf`);
  };

  return (
    <Box
      w="100dvw"
      h="150dvh"
      pos="fixed"
      style={{
        backgroundColor: '#373737',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Box
        w="200dvw"
        h="40%"
        left="-50%"
        pos="fixed"
        style={{
          backgroundColor: 'white',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderRadius: '0px 0px 100% 100%',
          boxShadow: '0px 30px 30px rgba(0, 0, 0, 0.50)',
        }}
      >
        <Flex
          direction="column"
          align="center"
          gap="6"
          fontWeight={'700'}
          fontSize={'200%'}
          style={{ margin: '20px 0px 0px 0px' }}
        >
          <Text>{currentSportRule.title}</Text>
        </Flex>
        <Box>
          <Image
            src={currentSportRule.image.src}
            alt={currentSportRule.image.alt}
            height={'25%'}
            maxW="2000px"
            maxH="2000px"
            marginTop={'10px'}
            pos="fixed"
            left="50%"
            style={{ transform: 'translateX(-50%)' }}
            top="10%"
          />
        </Box>
      </Box>

      <Flex
        direction="column"
        pos="fixed"
        left="50%"
        style={{ transform: 'translateX(-50%)', margin: '0px 0px 0px 0px', maxWidth: '90%' }}
        top="42%"
        w="max-content"
        align="center"
        gap="4"
        maxH="55%"
      >
        <Text
          color="white"
          fontWeight="700"
          style={{
            backgroundColor: '#F05A29',
            padding: '10px 30px ',
            borderRadius: '15px',
            fontSize: '120%',
          }}
        >
          กติกาการรับสมัคร
        </Text>
        <Box bg="white" p="20px" maxH="35dvh" style={{ overflow: 'auto' }} textAlign={'left'}>
          <Box w={'100%'} display={'flex'} flexDir={'row'} justifyContent={'end'}>
            <Button
              size={'sm'}
              bg={'#E4E4E4'}
              color={'black'}
              rightIcon={<FaRegFilePdf />}
              onClick={handleViewPdf}
            >
              ดูไฟล์ตารางการแข่งขัน
            </Button>
          </Box>
          <Flex direction="column">
            <Text fontWeight={currentSportRule.component.fw}>
              {currentSportRule.component.text}
            </Text>
            <Text color={currentSportRule.team.color} fontWeight={currentSportRule.team.fw}>
              {currentSportRule.team.text}
            </Text>
            {currentSportRule.detail.map((detail, index) => (
              <Text key={index}>{detail.text}</Text>
            ))}

            {currentSportRule.caution.length > 0 && (
              <>
                {currentSportRule.caution.map((caution, index) => (
                  <Text key={index}>{caution.text}</Text>
                ))}
              </>
            )}
            <Text fontWeight={currentSportRule.informationTitle.fw}>
              {currentSportRule.informationTitle.text}
            </Text>
            <Text>{currentSportRule.information.text}</Text>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Button
          left={'5%'}
          pos={'fixed'}
          bottom={'2%'}
          backgroundColor={'#F7941F'}
          color={'white'}
          size="lg"
          borderRadius="100px"
          as={Link}
          to="/select_sport"
          w={'40%'}
          maxW={'200px'}
          leftIcon={<SlArrowLeft />}
        >
          ย้อนกลับ
        </Button>
        <Button
          right={'5%'}
          pos={'fixed'}
          bottom={'2%'}
          onClick={() => navigate(`/select-Type/${institute}/${sport}`)}
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
      </Box>
    </Box>
  );
}

const Rule = React.memo(RuleComponent);
Rule.displayName = 'Rule';

export default Rule;
