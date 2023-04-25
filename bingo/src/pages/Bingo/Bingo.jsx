
import React, { useEffect, useState } from "react";
import "./Bingo.scss";
import { numbers } from "../../shared/numbers";
import { phrases } from "../../shared/phrases";
import { Box, Grid, GridItem, Button, ButtonGroup, Center, Square, Circle, Badge, Flex, SimpleGrid } from '@chakra-ui/react';


const generarNumsCarton = (disponibles) => {
  const nums = [];
  while (nums.length < 15) {
    const randomNumber = disponibles[Math.floor(Math.random() * disponibles.length)];
    if (!nums.includes(randomNumber)) {
      nums.push(randomNumber);
    }
  }
  return nums;
};

const speakPhrase = (number) => {
  const phrase = phrases[number];
  if (phrase) {
    const utterance = new SpeechSynthesisUtterance(phrase);
    speechSynthesis.speak(utterance);
  }
};

const Bingo = () => {
  const [cartones, setCartones] = useState([]);
  const [cartonesPintados, setCartonesPintados] = useState([]);
  const [disponibles, setDisponibles] = useState(numbers);
  const [salientes, setSalientes] = useState([]);
  const [numerosTableroPintados, setNumerosTableroPintados] = useState([]);
  const [numeroActual, setNumeroActual] = useState(null);
  const usedNumbers = new Set([...salientes, numeroActual]);
  const [count, setCount] = useState(0);

  const startGame = () => {
    const newCartones = [];
    while (newCartones.length < 10) {
      newCartones.push(generarNumsCarton(disponibles));
    }
    setCartones(newCartones);

    setInterval(() => {
      const newAvailableNumbers = disponibles.filter(num => num !== numeroActual);
      setDisponibles(newAvailableNumbers);
      const randomNumber = newAvailableNumbers[Math.floor(Math.random() * newAvailableNumbers.length)];

      setNumeroActual(randomNumber);
      setSalientes((prevSalientes) => [...prevSalientes, randomNumber]);
      speakPhrase(randomNumber);
      setDisponibles((prevDisponibles) => prevDisponibles.filter((num) => num !== randomNumber));
      setCount(count + 1);
      const newCartonesPintados = newCartones.map((carton) => {
        const newCartonPintado = carton.map((num) => {
          const isPintado = salientes.includes(num);
          if (isPintado && !numerosTableroPintados.includes(num)) {
            setNumerosTableroPintados((prevNumerosTableroPintados) => [
              ...prevNumerosTableroPintados,
              num,
            ]);
          }
          return <p className={`casilla ${isPintado ? "pintada" : ""}`}>{num}</p>;
        });
        return newCartonPintado;
      });
      setCartonesPintados(newCartonesPintados);
    }, 2000);
  };

  useEffect(() => {}, [disponibles, cartones, salientes, cartonesPintados]);

  return (
    <Grid 
      templateAreas={`"header header"
                          "nav main"
                          "nav footer"`}
      gridTemplateRows={'80px 1fr 100px'}
      gridTemplateColumns={'330px 1fr'}
      h='500px'
      gap='1'
      color='blackAlpha.900'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='gray.600' area={'header'}>
      <Flex flexWrap='wrap'>
          {[...new Set(salientes)].map((num) => (
          <Badge key={num} borderRadius="full" px="2" mr="2" bg="purple.500" color="white">
            {num}
          </Badge>
           ))}
        </Flex>
      </GridItem>
      <GridItem pl='2' bg='gray.800' area={'nav'}>
        <Box mt='30px' borderRadius='lg' border='3px solid green'>
          <div className="allNums">
            {numbers.map((num) => (
              <p
                key={num}
                className={
                  salientes.includes(num) || numerosTableroPintados.includes(num)
                    ? 'tablero pintado'
                    : 'tablero'
                  }
              >
                {num}
              </p>
            ))}
          </div>
          
        </Box>
        <SimpleGrid columns={2} spacing={0}>
        
        <Box bg='gray.800' height='120px'>
          <Center mt='10px'>
          <Circle size='80px' bg='purple.700' color='white'>
            <p className="numeroActual">{numeroActual}</p>
          </Circle>
          </Center>
          <Center mt='5px'>
          <Box color='aliceblue'>string</Box>

          </Center>
        
        </Box>
        <Box bg='gray.800' height='80px'>
          <Center mt='30px' mr='20px' color='white' size='50px'>
            <p className="countt">{count} - 90</p>
          </Center>
        </Box>
        </SimpleGrid>
        
      </GridItem>
      <GridItem pl='2' bg='gray.700' area={'main'} >
        <Grid templateColumns='repeat(10, 1fr)' gap={6} className="cartones" flexWrap='wrap' display='flex'>
          {cartonesPintados.map((cartonPintado, index1)=>(
            <GridItem w='160px' h='100px' bg='rgb(37, 2, 105)' key={index1} className="carton">
            {cartonPintado.map((num, index) => (
          <p
            key={index}
            className={
            salientes.includes(num.props.children) || num.props.className === 'casilla pintada'
              ? 'casilla pintada'
              : 'casilla'
            }
          >
          {num}
          </p>
         ))}
          </GridItem>

          ))}
          
        </Grid>
      
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'footer'}>
      <Button colorScheme='cyan' onClick={startGame} >Start Game</Button>
      </GridItem>
    </Grid>
  );
}

export default Bingo;