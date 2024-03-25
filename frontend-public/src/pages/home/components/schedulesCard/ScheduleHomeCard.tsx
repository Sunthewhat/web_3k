import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface ScheduleHomeCardProps {
  label: string;
  children: React.ReactNode;
}

function ScheduleHomeCardComponent({ label, children }: ScheduleHomeCardProps) {
  return (
    <Box bgColor={'white'} border="12px solid #034AB6" p={4} rounded={16} borderRadius={32}>
      <Text
        fontSize={'2xl'}
        fontWeight={600}
        marginTop="-40px"
        bgColor="#034AB6"
        w="fit-content"
        borderRadius={16}
        px={4}
        py={2}
        color="white"
      >
        {label}
      </Text>
      {children}
    </Box>
  );
}

const ScheduleHomeCard = React.memo(ScheduleHomeCardComponent);
ScheduleHomeCard.displayName = 'ScheduleHomeCard';

export default ScheduleHomeCard;
