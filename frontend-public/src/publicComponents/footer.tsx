import { Grid, GridItem, Image, Flex, Hide, Text, IconButton } from '@chakra-ui/react';
// import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import pic3K from '../public/assets/3k_logo.png';
import union from '../public/assets/logo_union.png';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Box } from '@chakra-ui/react';

function Footer() {
  const excludePaths = ['/login', '/testing'];
  const location = useLocation();
  const currentPath = location.pathname;
  const shouldShowNavbar = !excludePaths.includes(currentPath);

  if (!shouldShowNavbar) return null;

  return (
    <Box
      minH={[`40dvh`, `50dvh`]}
      w={'100dvw'}
      maxW={'100dvw'}
      // mt={'10dvh'}
      h={'auto'}
      pos={'relative'}
      bottom={'-10'}
      bg={'white'}
      fontFamily={'Noto sans thai'}
    >
      <Box
        p={4}
        fontSize={{ base: '10px', md: '13px', lg: '15px' }}
        textAlign="center"
        backgroundColor={'orange'}
        w={'100%'}
      >
        {/* ©2023 - 2024 School of Information Technology Student Association KMUTT <br /> and its
        affiliates. All rights reserved. */}
      </Box>
      <Grid
        maxW={`100dvw`}
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'400px 1fr'}
        h={['auto', '200px']}
        gap="12"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={'nav'}>
          <Flex direction="row" justifyContent="center">
            <Image
              src={pic3K}
              width={['82px', '119px']}
              height={['87px', '127px']}
              marginRight={'20px'}
              marginTop={'20px'}
            />
            <Image src={union} width={['120px', '160px']} height={['101px', '134px']} />
          </Flex>
        </GridItem>
        <GridItem pl="2" area={'main'} backgroundColor={''}>
          <Hide below="md">
            <Box
              fontSize={{ base: '10px', md: '20px', lg: '15px' }}
              marginTop={'-15px'}
              mb={'10px'}
            >
              การแข่งขันฟุตบอลประเพณีชิงถ้วยพระราชทานฯ และกีฬา 3 พระจอมเกล้า ครั้งที่ 15
            </Box>
            <Text>
              <Text>องค์การนักศึกษามหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</Text>
              <Text>อาคารพระจอมเกล้าราชานุสรณ์ 190 ปี มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</Text>
              <Text> 126 ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140</Text>
              <Text> โทรศัพท์ : 0 2470 8000 โทรสาร : 0 2427 9860</Text>
              <Box display={'flex'} flexDir={'column'} alignItems={''}>
                ติดต่อเรา
                <Box display={'flex'}>
                  <IconButton
                    bg={'none'}
                    aria-label="Facebook"
                    onClick={() => {
                      window.open('https://www.facebook.com/3kgames', '_blank');
                    }}
                  >
                    <FaFacebook size={20} color="#231F20" />
                  </IconButton>
                  <IconButton
                    bg={'none'}
                    aria-label="Instagram"
                    onClick={() => {
                      window.open(
                        'https://www.instagram.com/kmuttstudentunion_official?utm_source=ig_web_button_share_sheet&igshid=1x1j9t1j0b3jw',
                        '_blank'
                      );
                    }}
                  >
                    <FaInstagram size={20} color="#231F20" />
                  </IconButton>
                </Box>
              </Box>
            </Text>
          </Hide>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Footer;
