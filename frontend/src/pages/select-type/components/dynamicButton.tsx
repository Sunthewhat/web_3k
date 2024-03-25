import { Flex, Button } from '@chakra-ui/react';
import { ButtonListProps } from '../type';
import { useState } from 'react';

export const DynamicButtons: React.FC<ButtonListProps> = ({
  buttonNames,
  gender,
  teamType,
  handleButtonClick,
  available,
}) => {
  
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonState = (buttonName: string) => {
    if (clickedButton === buttonName) {
      setClickedButton(null);
    } else {
      setClickedButton(buttonName);
    }
  };

  return (
    <Flex direction="column" alignItems="center">
      {buttonNames.map((buttons, index) => (
        <Flex key={index}>
          {buttons.map((name: string, innerIndex: number) => {
            const availability = available.find(
              (item) =>
                item.sex === gender[index][innerIndex] && item.type === teamType[index][innerIndex],
            );
            const isAvailable = availability && !availability.status;
            return (
              <Button
                // isDisabled={!isAvailable}
                key={innerIndex}
                w="30dvw"
                maxW="170px"
                minH="10px"
                h="5dvh"
                borderRadius="50"
                shadow="lg"
                bg={clickedButton === name ? '#034AB6' : '#E9F2FF'}
                colorScheme={clickedButton === name ? '#034AB6' : '#E9F2FF'}
                textColor={clickedButton === name ? '#E9F2FF' : '#034AB6'}
                m="2dvh"
                fontSize="2dvh"
                onClick={() =>{handleButtonClick(index, innerIndex, gender, teamType); handleButtonState(name)}}
              >
                {name}
              </Button>
            );
          })}
        </Flex>
      ))}
    </Flex>
  );
};
