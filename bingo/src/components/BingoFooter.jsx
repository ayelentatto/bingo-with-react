// BingoFooter.jsx
import React from "react";
import { GridItem, Button } from "@chakra-ui/react";

const BingoFooter = ({ startGame }) => {
  return (
    <GridItem pl="2" bg="blue.300" area={"footer"}>
      <Button colorScheme="cyan" onClick={startGame}>
        Start Game
      </Button>
    </GridItem>
  );
};

export default BingoFooter;
