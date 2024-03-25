import { Box, Button, FormControl, Image, Input, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import Logo from '@/public/assets/3k_logo.png';
import Login from '@/api/Login';
import { useNavigate } from 'react-router-dom';

const LoginPage: FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState<boolean>(false);
  const [isUsernameNotExists, setIsUsernameNotExists] = useState<boolean>(false);
  const [isInternalError, setIsInternalError] = useState<boolean>(false);
  const [isEmptyUsername, setIsEmptyUsername] = useState<boolean>(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsEmptyPassword(false);
    setIsEmptyUsername(false);
    if (username === '') {
      setIsEmptyUsername(true);
      return;
    }
    if (password === '') {
      setIsEmptyPassword(true);
      return;
    }
    setIsPasswordIncorrect(false);
    setIsUsernameNotExists(false);
    const response = await Login(username, password);
    if (response.isSuccess) {
      navigate('/');
      window.location.reload();
    } else {
      if (response.error === "This username doesn't exist") {
        setIsUsernameNotExists(true);
      } else if (response.error === 'Password incorrect') {
        setIsPasswordIncorrect(true);
      } else {
        setIsInternalError(true);
      }
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowHeight, windowWidth]);

  return (
    <Box display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
      <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        pos={'fixed'}
      >
        <Box
          bg={'white'}
          width={windowWidth * 2}
          height={windowHeight * 2}
          pos={'fixed'}
          borderRadius={'50%'}
          top={-windowHeight * 1.5}
        />
        <Image src={Logo} pos={'fixed'} width={windowHeight * 0.3} top={windowHeight * 0.1} />
        <Text
          color={'white'}
          fontWeight={'semibold'}
          fontSize={'4.3dvh'}
          pos={'fixed'}
          top={windowHeight * 0.53}
        >
          Welcome Staff
        </Text>
        <FormControl
          isInvalid={isUsernameNotExists}
          pos={'fixed'}
          top={windowHeight * 0.6}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Input
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              setIsUsernameNotExists(false);
            }}
            h={windowHeight * 0.065}
            w={['70%', '50%', '30%']}
            bg={'white'}
            borderRadius={'50'}
            mt={'3dvh'}
            fontSize={windowHeight * 0.02}
          />
        </FormControl>
        <FormControl
          isInvalid={isPasswordIncorrect}
          pos={'fixed'}
          top={windowHeight * 0.7}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Input
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordIncorrect(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            type="password"
            h={windowHeight * 0.065}
            w={['70%', '50%', '30%']}
            bg={'white'}
            borderRadius={'50'}
            mt={'3dvh'}
            fontSize={windowHeight * 0.02}
          />
        </FormControl>
        <Button
          pos={'fixed'}
          bottom={windowHeight * 0.1}
          mt={'1em'}
          borderRadius={'50'}
          bg={'#00BC66 !important'}
          w={['25dvw', '15dvw', '15dvw']}
          h={'5dvh'}
        >
          <Text
            color={'white'}
            fontFamily={'Noto sans thai'}
            fontWeight={'bold'}
            fontSize={'2dvh'}
            px={'0.5em'}
            onClick={handleLogin}
          >
            ยืนยัน
          </Text>
        </Button>
        {isInternalError && (
          <Text
            color={'white'}
            fontSize={'1em'}
            fontWeight={'bold'}
            pos={'fixed'}
            bottom={windowHeight * 0.15}
          >
            Internal server error
          </Text>
        )}
        {isEmptyUsername && (
          <Text
            color={'white'}
            fontSize={'1em'}
            fontWeight={'bold'}
            pos={'fixed'}
            bottom={windowHeight * 0.15}
          >
            Please enter username
          </Text>
        )}
        {isEmptyPassword && (
          <Text
            color={'white'}
            fontSize={'1em'}
            fontWeight={'bold'}
            pos={'fixed'}
            bottom={windowHeight * 0.15}
          >
            Please enter password
          </Text>
        )}
        {isUsernameNotExists && (
          <Text
            color={'white'}
            fontSize={'1em'}
            fontWeight={'bold'}
            pos={'fixed'}
            bottom={windowHeight * 0.15}
          >
            This username doesn't exist
          </Text>
        )}
        {isPasswordIncorrect && (
          <Text
            color={'white'}
            fontSize={'1em'}
            fontWeight={'bold'}
            pos={'fixed'}
            bottom={windowHeight * 0.15}
          >
            Password incorrect
          </Text>
        )}
        <Box mt={'1em'} pos={'fixed'} bottom={['2em', '2em', '1.8em', '1.5em']}>
          <Text
            w={'100dvw'}
            textAlign={'center'}
            color={'white'}
            fontSize={windowHeight * 0.02}
            fontWeight={'bold'}
            // left={}
          >
            “Prosperity Bonds, Eternal Victories” .
          </Text>
        </Box>
        <Text
          w={'100dvw'}
          color={'white'}
          fontSize={windowHeight * 0.01}
          fontWeight={'bold'}
          textAlign={'center'}
          mt={'1em'}
          pos={'fixed'}
          bottom={['1em', '1.3em']}
        >
          © 2023 - 2024 School of Information Technology Student Association KMUTT <br /> and its
          affiliates. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default LoginPage;
