// BingoNav.jsx
import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Circle } from "@chakra-ui/react";
//instale : 1:numeros-a-letras ,numeral, toWords



const BingoNav = ({
  tableroN,
  salientes,
  numeroActual
}) => {

   
  return (
    <nav>
      <SimpleGrid columns={2} spacing={0} mt="15px">
        <Box bg="#598084" height="120px">
          <Circle size="80px" bg="purple.700" color="white">
            <p className="numeroActual">{numeroActual}</p>
          </Circle>
        </Box>
        <Box bg="#598084" height="80px">
          <Box mt="30px" mr="20px" color="white" size="50px">
            <p className="countt">
              {salientes.length <= 90 ? salientes.length : 90} - 90
            </p>
          </Box>
        </Box>
      </SimpleGrid>
      <Box mt="15px" mb="20px" borderRadius="lg" border="3px solid green">
        <div className="allNums">
          {tableroN.map((num) => (
            <p
              key={num}
              className={
                salientes.includes(num) 
                  ? "tablero pintado"
                  : "tablero"
              }
            >
              {num}
            </p>
          ))}
        </div>
      </Box>
      
    </nav>
  );
};

export default BingoNav;
