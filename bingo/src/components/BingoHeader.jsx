// BingoHeader.jsx
import React from "react";
import { Badge, Flex } from "@chakra-ui/react";

const BingoHeader = ({ salientes }) => {
  return (
    <header>
      <Flex flexWrap="wrap">
        {[...new Set(salientes)].map((num) => (
          <Badge
            key={num}
            borderRadius="full"
            px="2"
            mr="2"
            bg="purple.500"
            color="white"
          >
            {num}
          </Badge>
        ))}
      </Flex>
    </header>
  );
};

export default BingoHeader;
