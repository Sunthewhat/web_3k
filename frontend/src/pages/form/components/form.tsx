import { Box, Text, Select, Input, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { TFormData, TFormType, TSportSex, TSportTeamType, TSportType } from '../types';
import { MdInfoOutline } from 'react-icons/md';
import ShirtModal from './shirtModal';
import { header as headerFunc } from '../functions';
import PantsModal from './pantsModal';

const FormComponent: FC<{
  formPattern: TFormType[];
  formType: TFormType;
  sport?: TSportType;
  playerNumber: number;
  teamType?: TSportTeamType;
  sex?: TSportSex;
  onDataChange: (formData: TFormData, index: number) => void;
  index: number;
  data: TFormData;
  isDataFiller: boolean;
  totalPage: number;
}> = ({
  formPattern,
  formType,
  sport,
  playerNumber,
  teamType,
  sex,
  onDataChange,
  index,
  data,
  isDataFiller,
  totalPage,
}) => {
  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0]);
  const datas: TFormData = data;
  // const [datas, setDatas] = useState<TFormData>(data);

  const handleDataChange = (key: string, value: string) => {
    if (formType === 'athlete type1' || formType === 'athlete type2') {
      datas['number'] = playerNumber.toString();
    }

    if (key === 'studentId' || key === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (key === 'phone' && value.length > 10) {
        datas[key as keyof TFormData] = numericValue.slice(0, 10);
      } else {
        datas[key as keyof TFormData] = numericValue;
      }
    } else {
      datas[key as keyof TFormData] = value;
    }

    onDataChange(datas, index);
  };

  const { isOpen: isOpenShirt, onOpen: onOpenShirt, onClose: onCloseShirt } = useDisclosure();
  const { isOpen: isOpenPants, onOpen: onOpenPants, onClose: onClosePants } = useDisclosure();

  const header: string = headerFunc(
    index,
    formPattern,
    formType,
    sport,
    teamType,
    sex,
    playerNumber,
  );
  const isStaffForm: boolean = formType !== 'athlete type1' && formType !== 'athlete type2';
  const isType1 = formType === 'athlete type1';
  const isType2 = formType === 'athlete type2';

  // if (formType === 'athlete type1' || formType === 'athlete type2') {
  //   datas['number'] = playerNumber.toString();
  //   onDataChange(datas, index);
  // }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Box fontFamily={'Noto Sans Thai'} h={'100%'}>
      <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
      >
        <Box backgroundColor={'white'} w={'fit-content'} borderRadius={'10px'} mt={'5vh'}>
          <Text
            textColor={'#F05A29'}
            fontSize={'24'}
            fontWeight={'semibold'}
            textAlign={'center'}
            mx={'15vw'}
            my={'0.5vh'}
          >
            ข้อมูลสมาชิก
          </Text>
        </Box>
        <Box
          backgroundColor={'white'}
          w={'90%'}
          mt={'2vh'}
          borderRadius={'10px'}
          p={3}
          minH={windowSize[1] > windowSize[0] ? '75vh' : '70vh'}
          h={'fit-content'}
          display={'flex'}
          flexDir={'column'}
          justifyContent={'space-between'}
        >
          <Box>
            <Text
              textColor={'#034AB6'}
              fontSize={'20'}
              fontWeight={'bold'}
              textAlign={'center'}
              mt={'5vh'}
            >
              {header}
            </Text>
            <Box
              display={'flex'}
              flexDir={'row'}
              mt={'2vh'}
              justifyContent={'space-around'}
              alignItems={'center'}
              w={'100%'}
            >
              <Box display={'flex'} flexDir={'column'} justifyContent={'start'} w={'50%'}>
                <Text fontSize={'12'} color={'#898989'}>
                  คำนำหน้า
                </Text>
                <Select
                  placeholder="คำนำหน้า"
                  value={data.prefix}
                  h={'50px'}
                  color={data?.prefix == '' ? '#898989' : 'black'}
                  borderColor={'#898989'}
                  onChange={(e) => {
                    handleDataChange('prefix', e.target.value);
                  }}
                >
                  {/* นาย นาง นางสาว อื่นๆ ไม่ระบุ  */}
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                  <option value="ไม่ระบุ">ไม่ระบุ</option>
                </Select>
              </Box>
              {isStaffForm && (
                <Box
                  display={'flex'}
                  flexDir={'column'}
                  justifyContent={'start'}
                  ml={'2vw'}
                  w={'50%'}
                >
                  <Text fontSize={'12'} color={'#898989'}>
                    ตำแหน่ง
                  </Text>
                  <Input
                    color={data?.role == '' ? '#898989' : 'black'}
                    placeholder={header}
                    variant="outline"
                    isDisabled={true}
                    w={'100%'}
                    h={'50px'}
                    borderColor={'#898989'}
                    onChange={(e) => {
                      handleDataChange('role', e.target.value);
                    }}
                  />
                </Box>
              )}
              {isType1 && (
                <Box
                  display={'flex'}
                  flexDir={'column'}
                  justifyContent={'start'}
                  ml={'2vw'}
                  w={'50%'}
                >
                  <Text fontSize={'12'} color={'#898989'}>
                    หมายเลขผู้เล่น
                  </Text>
                  <Input
                    color={'#898989'}
                    placeholder={playerNumber?.toString()}
                    variant="outline"
                    isDisabled={true}
                    w={'100%'}
                    h={'50px'}
                    borderColor={'#898989'}
                    onChange={(e) => {
                      handleDataChange('position', e.target.value);
                    }}
                  />
                </Box>
              )}
              {isType2 && (
                <Box
                  display={'flex'}
                  flexDir={'column'}
                  justifyContent={'start'}
                  ml={'2vw'}
                  w={'50%'}
                >
                  <Text fontSize={'12'} color={'#898989'}>
                    ลำดับสมาชิก
                  </Text>
                  <Input
                    color={'#898989'}
                    placeholder={playerNumber?.toString()}
                    variant="outline"
                    isDisabled={true}
                    w={'100%'}
                    h={'50px'}
                    borderColor={'#898989'}
                  />
                </Box>
              )}
            </Box>
            <Box display={'flex'} flexDir={'column'} mt={'2vh'} justifyContent={'start'}>
              <Text fontSize={'12'} color={'#898989'}>
                ชื่อ - นามสกุล
              </Text>
              <Input
                color={data?.name == '' ? '#898989' : 'black'}
                placeholder="ชื่อ นามสกุล"
                value={data?.name}
                variant="outline"
                w={'100%'}
                h={'50px'}
                borderColor={'#898989'}
                onChange={(e) => {
                  handleDataChange('name', e.target.value);
                }}
              />
            </Box>
            {isStaffForm && (
              <Box display={'flex'} flexDir={'column'} mt={'2vh'} justifyContent={'start'}>
                <Text fontSize={'12'} color={'#898989'}>
                  เบอร์โทรศัพท์
                </Text>
                <Input
                  color={data?.phone == '' ? '#898989' : 'black'}
                  placeholder="เบอร์โทรศัพท์"
                  value={data?.phone}
                  variant="outline"
                  w={'100%'}
                  h={'50px'}
                  borderColor={'#898989'}
                  onChange={(e) => {
                    handleDataChange('phone', e.target.value);
                  }}
                />
              </Box>
            )}
            {!isDataFiller && (
              <Box
                display={'flex'}
                flexDir={'column'}
                mt={'2vh'}
                justifyContent={'start'}
                w={'100%'}
              >
                <Text fontSize={'12'} color={'#898989'}>
                  ไซส์เสื้อ
                </Text>
                <Box
                  display={'flex'}
                  flexDir={'row'}
                  justifyContent={'start'}
                  alignItems={'center'}
                >
                  <Select
                    placeholder="ไซส์เสื้อ"
                    value={data?.shirt}
                    h={'50px'}
                    color={data?.shirt == '' ? '#898989' : 'black'}
                    borderColor={'#898989'}
                    mr={'1vw'}
                    onChange={(e) => {
                      handleDataChange('shirt', e.target.value);
                    }}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="3L">3L</option>
                    <option value="4L">4L</option>
                    <option value="6L">6L</option>
                    <option value="8L">8L</option>
                  </Select>
                  <Box onClick={onOpenShirt}>
                    <MdInfoOutline size={'30px'} />
                  </Box>
                </Box>
              </Box>
            )}
            {isType1 && (
              <Box
                display={'flex'}
                flexDir={'column'}
                mt={'2vh'}
                justifyContent={'start'}
                w={'100%'}
              >
                <Text fontSize={'12'} color={'#898989'}>
                  ไซส์กางเกง
                </Text>
                <Box
                  display={'flex'}
                  flexDir={'row'}
                  justifyContent={'start'}
                  alignItems={'center'}
                >
                  <Select
                    placeholder="ไซส์กางเกง"
                    value={data?.pants}
                    h={'50px'}
                    color={data?.pants == '' ? '#898989' : 'black'}
                    borderColor={'#898989'}
                    mr={'1vw'}
                    onChange={(e) => {
                      handleDataChange('pants', e.target.value);
                    }}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="3L">3L</option>
                    <option value="4L">4L</option>
                  </Select>
                  <Box onClick={onOpenPants}>
                    <MdInfoOutline size={'30px'} />
                  </Box>
                </Box>
              </Box>
            )}
            {!isDataFiller && (
              <Box display={'flex'} flexDir={'column'} mt={'2vh'} justifyContent={'start'}>
                <Text fontSize={'12'} color={'#898989'}>
                  อาหารที่แพ้
                </Text>
                <Input
                  color={data?.allergies == '' ? '#898989' : 'black'}
                  placeholder="อาหารที่แพ้ (ไม่มีใส่ - )"
                  value={data?.allergies}
                  variant="outline"
                  w={'100%'}
                  h={'50px'}
                  borderColor={'#898989'}
                  onChange={(e) => {
                    handleDataChange('allergies', e.target.value);
                  }}
                />
              </Box>
            )}
            {isDataFiller && (
              <Box display={'flex'} flexDir={'column'} mt={'2vh'} justifyContent={'start'}>
                <Text fontSize={'12'} color={'#898989'}>
                  Email
                </Text>
                <Input
                  color={data?.allergies == '' ? '#898989' : 'black'}
                  placeholder="Email"
                  value={data?.email}
                  variant="outline"
                  w={'100%'}
                  h={'50px'}
                  borderColor={'#898989'}
                  onChange={(e) => {
                    handleDataChange('email', e.target.value);
                  }}
                />
              </Box>
            )}
            {(!isStaffForm || formType === 'datafiller') && (
              <Box display={'flex'} flexDir={'column'} mt={'2vh'} justifyContent={'start'}>
                <Text fontSize={'12'} color={'#898989'}>
                  เลขนักศึกษา
                </Text>
                <Input
                  color={data?.studentId == '' ? '#898989' : 'black'}
                  placeholder="เลขนักศึกษา"
                  value={data?.studentId}
                  variant="outline"
                  w={'100%'}
                  h={'50px'}
                  borderColor={'#898989'}
                  onChange={(e) => {
                    handleDataChange('studentId', e.target.value);
                  }}
                />
              </Box>
            )}
          </Box>
          <Box w={'100%'} justifyContent={'end'} display={'flex'} flexDir={'row'}>
            <Text color={'black'}>
              ({index + 1} จาก {totalPage})
            </Text>
          </Box>
        </Box>
        <ShirtModal isOpen={isOpenShirt} onClose={onCloseShirt} />
        <PantsModal isOpen={isOpenPants} onClose={onClosePants} />
      </Box>
    </Box>
  );
};

export default FormComponent;
