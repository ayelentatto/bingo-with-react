import React from 'react';
import { Alert , AlertIcon , Box } from "@chakra-ui/react";

const LineAlert = ({ show, message }) => {
    return (
      <Box>
        {show && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            {message}
          </Alert>
        )}
      </Box>
    );
};

export default LineAlert;

