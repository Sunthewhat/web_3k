import React from 'react';

import { Button } from '@chakra-ui/react';

import { SchedulesViewType } from '../../types/shared';

interface CustomTabProps {
  isActive: boolean;
  handleViewType: (type: SchedulesViewType) => void;
  type: SchedulesViewType;
  label: string;
}

function CustomTabComponent({ isActive, handleViewType, type, label }: Readonly<CustomTabProps>) {
  return (
    <Button
      my={3}
      bg={isActive ? 'brand.200' : 'none'}
      onClick={() => handleViewType(type)}
      color="white"
      fontWeight="800"
      fontSize="18px"
      borderRadius="12px"
      _hover={{ bg: 'brand.300' }}
    >
      {label}
    </Button>
  );
}

const CustomTab = React.memo(CustomTabComponent);
CustomTab.displayName = 'CustomTab';

export default CustomTab;
