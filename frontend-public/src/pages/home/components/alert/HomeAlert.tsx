import React, { FC } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { IconSpeakerphone } from '@tabler/icons-react';
import { AnnouncementType } from '@/api/home';
import Carousel from 'react-multi-carousel';
import { MdOutlineClose } from 'react-icons/md';
import 'react-multi-carousel/lib/styles.css';

interface HomeAlertProps {
  announcementData: AnnouncementType;
}

const HomeAlertComponent: FC<HomeAlertProps> = ({ announcementData }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [isShowing, setIsShowing] = React.useState(true);

  if (!announcementData || announcementData.length === 0) {
    return null;
  }
  if (!Array.isArray(announcementData)) {
    return null;
  }
  if (announcementData.filter((item) => item.isShowing).length === 0) {
    return null;
  }
  if (!isShowing) return null;
  return (
    <Box mt={'3dvh'} w={'100dvw'} pos={'absolute'}>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={10000}
        transitionDuration={500}
        swipeable
        pauseOnHover
        arrows={false}
      >
        {announcementData
          ?.filter((item) => item.isShowing)
          .map((item) => {
            return (
              <Box
                w={'100dvw'}
                display={'flex'}
                flexDir={['column', 'column', 'column', 'row']}
                justifyContent={'space-between'}
                alignItems={'center'}
                pr={[0, 0, 0, 10, 10]}
              >
                <Box />
                <Box
                  w={['80dvw', '60dvw', '90dvw', '60dvw']}
                  p={1}
                  rounded={16}
                  bgColor="brand.200"
                  color="white"
                  borderColor={'white'}
                  border={'1px'}
                  mb={'3dvh'}
                  display={'flex'}
                  alignItems={'center'}
                  // justifyContent={'space-between'}
                  h={['15dvh', '15dvh', '15dvh', '15dvh', '15dvh']}
                >
                  <IconSpeakerphone size="3rem" style={{ minWidth: '3rem' }} />
                  <Box pl={4} h={'100%'} overflowY={'scroll'}>
                    <Text fontSize="large" fontWeight="bold">
                      ประกาศ!
                    </Text>
                    <Text fontWeight={200}>{item.content}</Text>
                    <Box
                      pos={'fixed'}
                      top={3}
                      right={14}
                      h={'100%'}
                      onClick={() => {
                        setIsShowing(false);
                      }}
                    >
                      <MdOutlineClose color="#FFFFFF" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Carousel>
    </Box>
  );
};

const HomeAlert = React.memo(HomeAlertComponent);
HomeAlert.displayName = 'HomeAlert';

export default HomeAlert;
