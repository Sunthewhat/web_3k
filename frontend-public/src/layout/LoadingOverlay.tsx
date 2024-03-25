import { Box, Spinner } from '@chakra-ui/react';

function LoadingOverlay() {
  return (
    <Box pos="fixed" zIndex={9999} width="100dvw" height="100dvw" bgColor="white" top="0" left="0">
      <Spinner
        size="xl"
        color="brand.200"
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    </Box>
  );
}

export default LoadingOverlay;
