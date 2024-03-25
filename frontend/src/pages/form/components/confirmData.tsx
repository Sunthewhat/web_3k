import { FC } from 'react';
import { TFormData } from '../types';
import { Box, Text } from '@chakra-ui/react';
import { getTitleName } from '../functions';

const ConfirmData: FC<{
  data: TFormData[];
  isHavePants: boolean;
  setIsCanContinue: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, isHavePants }) => {
  return (
    <Box
      mt={'3vh'}
      fontFamily={'Noto sans thai'}
      w={'100%'}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'start'}
      alignItems={'center'}
    >
      <Box backgroundColor={'white'} w={'fit-content'} borderRadius={'10px'} mt={'3vh'}>
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
        mt={'3vh'}
        w={'90%'}
        bg={'white'}
        borderRadius={'20px'}
        p={5}
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
        overflowY={'auto'}
        maxHeight={'600px'}
      >
        {data.map((formData: TFormData, index: number) => {
          return (
            <Box key={index} w={'100%'} mb={'2vh'}>
              <Text fontSize={20} fontWeight={'bold'} color={'#034AB6'}>
                {getTitleName(formData)}
              </Text>
              <Box border={'1px'} borderColor={'black'} borderRadius={'10px'} p={3}>
                <Box display={'flex'}>
                  <Text mr={'2'}>ชื่อ :</Text>
                  {formData.prefix === '' || formData.name === '' ? (
                    <Text fontSize={16} fontWeight={'regular'} color={'red'}>
                      ไม่พบข้อมูล
                    </Text>
                  ) : (
                    <Text fontSize={16} fontWeight={'regular'}>
                      {formData.prefix === 'อื่นๆ' || formData.prefix === 'ไม่ระบุ'
                        ? ''
                        : formData.prefix}{' '}
                      {formData.name}
                    </Text>
                  )}
                </Box>
                {formData.role !== 'นักกีฬา' && (
                  <Box display={'flex'}>
                    <Text mr={'2'}>เบอร์โทรศัพท์ :</Text>
                    {formData.phone === '' ? (
                      <Text fontSize={16} fontWeight={'regular'} color={'red'}>
                        ไม่พบข้อมูล
                      </Text>
                    ) : (
                      <Text fontSize={16} fontWeight={'regular'}>
                        {formData.phone}
                      </Text>
                    )}
                  </Box>
                )}
                {formData.role !== 'ผู้กรอกข้อมูล' && (
                  <Box display={'flex'}>
                    <Text mr={'2'}>ไซส์เสื้อ :</Text>
                    {formData.shirt === '' ? (
                      <Text fontSize={16} fontWeight={'regular'} color={'red'}>
                        ไม่พบข้อมูล
                      </Text>
                    ) : (
                      <Text fontSize={16} fontWeight={'regular'}>
                        {formData.shirt}
                      </Text>
                    )}
                  </Box>
                )}
                {isHavePants && formData.role === 'นักกีฬา' && (
                  <Box display={'flex'}>
                    <Text mr={'2'}>ไซส์กางเกง :</Text>
                    {formData.pants === '' ? (
                      <Text fontSize={16} fontWeight={'regular'} color={'red'}>
                        ไม่พบข้อมูล
                      </Text>
                    ) : (
                      <Text fontSize={16} fontWeight={'regular'}>
                        {formData.pants}
                      </Text>
                    )}
                  </Box>
                )}
                {formData.role === 'นักกีฬา' && (
                  <Box display={'flex'}>
                    <Text mr={'2'}>เลขนักศึกษา :</Text>
                    {formData.studentId === '' ? (
                      <Text fontSize={16} fontWeight={'regular'} color={'red'}>
                        ไม่พบข้อมูล
                      </Text>
                    ) : (
                      <Text fontSize={16} fontWeight={'regular'}>
                        {formData.studentId}
                      </Text>
                    )}
                  </Box>
                )}
                {formData.role !== 'ผู้กรอกข้อมูล' && (
                  <Box display={'flex'}>
                    <Text mr={'2'}>อาหารที่แพ้ :</Text>
                    {formData.allergies === '' ? (
                      <Text fontSize={16} fontWeight={'regular'} color={'red'}>
                        ไม่พบข้อมูล
                      </Text>
                    ) : (
                      <Text fontSize={16} fontWeight={'regular'}>
                        {formData.allergies}
                      </Text>
                    )}
                  </Box>
                )}
                {formData.role === 'ผู้กรอกข้อมูล' && (
                  <Box display={'flex'}>
                    <Text mr={'2'}>Email :</Text>
                    {formData.email === '' ? (
                      <Text fontSize={16} fontWeight={'regular'} color={'red'}>
                        ไม่พบข้อมูล
                      </Text>
                    ) : (
                      <Text fontSize={16} fontWeight={'regular'}>
                        {formData.email}
                      </Text>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ConfirmData;
