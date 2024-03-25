import React from 'react';

import { Card, Image, keyframes, Text } from '@chakra-ui/react';

const mascotKeyframes = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '50%': {
    transform: 'rotate(8deg)',
  },
  '100%': {
    transform: 'rotate(0deg)',
  },
});

interface SportCardProps {
  name: string;
  image: string;
  isDesktop?: boolean;
  isNewLine?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

function SportCardComponent({
  name,
  image,
  isDesktop,
  isNewLine = false,
  isSelected,
  onClick,
}: Readonly<SportCardProps>) {
  return (
    <Card
      key={crypto.randomUUID()}
      rounded={12}
      style={{ backgroundColor: '#034AB6' }}
      p={2}
      maxW={isDesktop ? 'calc((100% / 5) - 2.4rem)' : undefined}
      mb={isDesktop ? 12 : undefined}
      ml={!isNewLine && isDesktop ? 12 : undefined}
      _hover={{
        transform: 'scale(1.1)',
      }}
      shadow={isSelected ? '5px 10px 4px 0px #F05A29' : undefined}
      cursor="pointer"
      onClick={onClick}
      transition={'transform 0.2s ease-in-out'}
    >
      <Image
        src={image}
        alt={name}
        animation={`${mascotKeyframes} 1.2s ease-in-out infinite`}
        draggable={false}
      />
      <Text textAlign="center" mt={4} color="white">
        {name}
      </Text>
    </Card>
  );
}

const SportCard = React.memo(SportCardComponent);
SportCard.displayName = 'SportCard';

export default SportCard;
