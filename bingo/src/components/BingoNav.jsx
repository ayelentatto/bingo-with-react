// BingoNav.jsx
import React from "react";
import { Box, SimpleGrid, Circle } from "@chakra-ui/react";

const BingoNav = ({
  tableroN,
  salientes,
  numerosTableroPintados,
  numeroActual,
  numeroString,
}) => {
  return (
    <nav>
      <Box mt="30px" borderRadius="lg" border="3px solid green">
        <div className="allNums">
          {tableroN.map((num) => (
            <p
              key={num}
              className={
                salientes.includes(num) || numerosTableroPintados.includes(num)
                  ? "tablero pintado"
                  : "tablero"
              }
            >
              {num}
            </p>
          ))}
        </div>
      </Box>
      <SimpleGrid columns={2} spacing={0}>
        <Box bg="gray.800" height="120px">
          <Circle size="80px" bg="purple.700" color="white">
            <p className="numeroActual">{numeroActual}</p>
          </Circle>
          <Box color="tomato">{numeroString}</Box>
        </Box>
        <Box bg="gray.800" height="80px">
          <Box mt="30px" mr="20px" color="white" size="50px">
            <p className="countt">
              {salientes.length} - 90
            </p>
          </Box>
        </Box>
      </SimpleGrid>
    </nav>
  );
};

export default BingoNav;
