/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useState } from 'react';
import './formPage.css';
import FormComponent from './components/form';
import { TFormData, TFormType, TSportSex, TSportTeamType, TSportType } from './types';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFormTypeArrays, initData } from './functions';
import ConfirmData from './components/confirmData';
import ContinueModal from './components/continueModal';
import RecheckModal from './components/recheckModal';
import { sendForm } from './api/sendForm';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';

const FormPageComponent: FC = () => {
  const navigate = useNavigate();
  const {
    isOpen: isContinueOpen,
    onOpen: onContinueOpen,
    onClose: onContinueClose,
  } = useDisclosure();
  const {
    isOpen: isIncompleteOpen,
    onOpen: onIncompleteOpen,
    onClose: onIncompleteClose,
  } = useDisclosure();
  const { isOpen: isLoading, onOpen: onLoadingStart, onClose: onLoadingDone } = useDisclosure();
  const params = useParams<{
    institute: string;
    sportType: string;
    teamType: string;
    sex: string;
  }>();
  const sportTypeParam: string | undefined =
    params.sportType === 'e-sport' ? 'esport' : params.sportType;
  const teamTypeParam: string | undefined = params.teamType;
  const sexParam: string | undefined = params.sex;
  const university: string | undefined = params.institute;
  if (
    sportTypeParam === undefined ||
    teamTypeParam === undefined ||
    sexParam === undefined ||
    university === undefined
  )
    navigate('/select_sport');
  const formPattern = [
    'datafiller' as TFormType,
    ...getFormTypeArrays(sportTypeParam as TSportType, teamTypeParam as TSportTeamType),
    'confirm' as TFormType,
  ];
  const confirmIndex = formPattern.length - 1;
  const [pageNo, setPageNo] = useState<number>(0);
  let playerIndex: number = 0;
  const handleSubmit = () => {
    if (isCanContinue) {
      onContinueOpen();
      return;
    }
    onIncompleteOpen();
  };
  const handleBack = () => {
    navigate('/select_sport');
  };

  const handleConfirm = async () => {
    onLoadingStart();
    await sendForm(data);
    onLoadingDone();
    onContinueClose();
    navigate('/complete-regist');
  };
  const init = () => {
    const data: TFormData[] = [];
    for (let i = 0; i < formPattern.length - 1; i++) {
      data.push(
        initData(
          formPattern[i],
          university!,
          sportTypeParam as TSportType,
          teamTypeParam as TSportTeamType,
          sexParam as TSportSex,
        ),
      );
    }
    return data;
  };
  const [data, setData] = useState<TFormData[]>(init());
  const fetchIsCancontinue = () => {
    data.map((data: TFormData, index: number) => {
      if (data.role === '') {
        setIsCanContinue(false);
        return;
      }
      if (index === formPattern.length - 2 && sportTypeParam === 'esport') {
        return;
      }
      if (data.role === 'นักกีฬา') {
        if (formPattern.includes('athlete type1')) {
          if (
            data.prefix === '' ||
            data.name === '' ||
            data.shirt === '' ||
            data.pants === '' ||
            data.studentId === ''
          ) {
            setIsCanContinue(false);
            return;
          }
        } else {
          if (
            data.prefix === '' ||
            data.name === '' ||
            data.shirt === '' ||
            data.studentId === ''
          ) {
            setIsCanContinue(false);
            return;
          }
        }
      } else {
        if (data.prefix === '' || data.name === '' || data.phone === '' || data.shirt === '') {
          setIsCanContinue(false);
          return;
        }
      }
      setIsCanContinue(true);
    });
  };
  const handleFormDataChange = (index: number, formData: TFormData) => {
    setData((prev) => {
      const newData = [...prev];
      newData[index] = formData;
      return newData;
    });
  };

  const isHavePants = formPattern.includes('athlete type1');
  const [isCanContinue, setIsCanContinue] = useState<boolean>(false);

  useEffect(() => {
    fetchIsCancontinue();
  }, [data]);

  return (
    <Box className="background" display={'flex'} flexDir={'column'} justifyContent={'space-between'}>
      {formPattern.map((formType: TFormType, index: number) => {
        if ((formType === 'athlete type1' || formType === 'athlete type2') && playerIndex == 0)
          playerIndex = index;
        if (index !== pageNo) return null;
        if (formType === 'confirm') {
          return (
            <ConfirmData
              key={index}
              data={data}
              isHavePants={isHavePants}
              setIsCanContinue={setIsCanContinue}
            />
          );
        }
        return (
          <FormComponent
            key={index}
            formPattern={formPattern}
            formType={formType}
            sport={sportTypeParam as TSportType}
            playerNumber={index - playerIndex + 1}
            sex={sexParam as TSportSex}
            teamType={teamTypeParam as TSportTeamType}
            index={index}
            data={data[index]}
            onDataChange={(formData: TFormData) => handleFormDataChange(index, formData)}
            isDataFiller={formType === 'datafiller'}
            totalPage={formPattern.length-1}
          />
        );
      })}
      <Box
        w={'100%'}
        display={'flex'}
        flexDir={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={'5vh'}
        fontFamily={'Noto sans thai'}
      >
        <Button
          // pos={'fixed'}
          // bottom={'2%'}
          left={'5%'}
          backgroundColor={'#F7941F !important'}
          color={'white'}
          size="lg"
          borderRadius="100px"
          maxW={'200px'}
          onClick={() => {
            if (pageNo === 0) {
              handleBack();
              return;
            }
            setPageNo((prev) => {
              return prev - 1;
            });
          }}
          w={'40%'}
          leftIcon={<SlArrowLeft />}
        >
          ย้อนกลับ
        </Button>
        <Button
          // pos={'fixed'}
          // bottom={'2%'}
          right={'5%'}
          maxW={'200px'}
          onClick={() => {
            if (pageNo === formPattern.length - 1) {
              handleSubmit();
              return;
            }
            setPageNo((prev) => {
              return prev + 1;
            });
          }}
          backgroundColor={confirmIndex === pageNo ? '#00BC66 !important' : '#F7941F !important'}
          color={'white'}
          size="lg"
          borderRadius="100px"
          w={'40%'}
          rightIcon={<SlArrowRight />}
        >
          ถัดไป
        </Button>
      </Box>
      <ContinueModal
        isOpen={isContinueOpen}
        onClose={onContinueClose}
        handleConfirm={handleConfirm}
        isLoading={isLoading}
      />
      <RecheckModal isOpen={isIncompleteOpen} onClose={onIncompleteClose} />
    </Box>
  );
};

const FormPage = memo(FormPageComponent);
FormPage.displayName = 'FormPage';

export default FormPage;
