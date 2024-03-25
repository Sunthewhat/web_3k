import Torch from '../../assets/image/torch.png';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function completeRegist() {
  return (
    <Box
    display= {"flex"}
    justifyContent= {"center"}
    alignItems= {"center"}
    flexDirection={"column"}
    height={"100dvh"}
    width={"100dvw"}>

      <Box
      display= {"flex"}
      justifyContent= {"center"}
      alignItems= {"center"}
      maxW={"300px"}
      maxH={"50vh"}
      >
        <Box
        display={"flex"}
        flexDirection={"column"}
        backgroundColor={"white"}
        borderRadius={"20px"}
        margin={"20px"}>
          <Image
            src={Torch}
            alt={Torch}
            padding={"50px 50px 20px 50px"}
          />
          <Text
          textAlign={"center"}
          padding={"10px 0px 50px 0px"}
          color={"#F05A29"}
          fontWeight={"700"}>
            ลงทะเบียนสำเร็จ !
          </Text>
          
        </Box>
      </Box>
        <Button
              backgroundColor={'#F7941F'}
              color={'white'}
              size="lg"
              borderRadius="100px"
              as={Link}
              to="/"
              padding={"0px 50px"}
            >
              ปิด
        </Button>
    </Box> 
  );
}

export default completeRegist;
