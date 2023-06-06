import React, { useState, useEffect, useRef } from "react";
import {
  useBoolean,
  Alert,
  AlertIcon,
  Grid,
  GridItem,
  Center,
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const BingoGrid = ({ cartones, numeroActual, disponibles, salientes, nuevosCartones }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [seleccionados, setSeleccionados] = useState([]);
  const cartonesRefs = useRef([]); // Referencias a los elementos de cartones

  const [lineaPintada, setLineaPintada] = useState(false);
  const [segundaLineaPintada, setSegundaLineaPintada] = useState(false);
  const [cartonPintado, setCartonPintado] = useState(false);


  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);



  useEffect(() => {

    const verificarPremios = () => {
      const primerosCincoIndices = [0, 3, 6, 9, 12];
      const segundosCincoIndices = [1, 4, 7, 10, 13];
      const tercerosCincoIndices = [2, 5, 8, 11, 14];

      seleccionados.forEach((carton, index) => {
        const pElement = cartonesRefs.current[index]; // Verifica si la referencia existe antes de acceder al elemento de párrafo
        const primerosCincoPintados = primerosCincoIndices.every((idx) => {
          return pElement[idx].className === "casilla pintada";
        });
  
        const segundosCincoPintados = segundosCincoIndices.every((idx) => {
          return pElement[idx].className === "casilla pintada";
        });
  
        const tercerosCincoPintados = tercerosCincoIndices.every((idx) => {
          return pElement[idx].className === "casilla pintada";
        });
  
        if (primerosCincoPintados && !alert1 || segundosCincoPintados && !alert1 || tercerosCincoPintados && !alert1) {
          setAlert1(true);
          setLineaPintada(true);
          setInterval(() => {
            setLineaPintada(false)
          }, 5000);
        }
        // Nueva condición para "Dos líneas han sido pintadas"
        if ((primerosCincoPintados && segundosCincoPintados && !alert2) ||
            (segundosCincoPintados && tercerosCincoPintados && !alert2) ||
            (primerosCincoPintados && tercerosCincoPintados && !alert2)) {
          setAlert2(true);
          setSegundaLineaPintada(true);
          setInterval(() => {
            setSegundaLineaPintada(false)
          }, 5000);
        }

        // Nueva condición para "Tres líneas pintadas, ¡BINGO!"
        if (primerosCincoPintados && segundosCincoPintados && tercerosCincoPintados && !alert3) {
          setAlert3(true)
          setCartonPintado(true);
          setInterval(() => {
            setCartonPintado(false)
          }, 5000);
        }
      });
      
    };

    const actualizarClases = () => {
      seleccionados.forEach((carton, index) => {
        const pElements = cartonesRefs.current[index]; // Obtiene los elementos de párrafo del cartón correspondiente
        pElements.forEach((p) => {
          const num = parseInt(p.textContent);
          const isPintado = num === numeroActual || !disponibles.includes(num) || salientes.includes(num);
          p.className = isPintado ? "casilla pintada" : "casilla";
        });
      });
    };
    

    const interval = setInterval(() => {
      actualizarClases();
      verificarPremios();
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [seleccionados, numeroActual, disponibles, salientes]);


  return (
    <main>
      <Center mt={130}>
        <Box>
          {lineaPintada && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              ¡Primer línea Pintada!
            </Alert>
          )}
        </Box>
        <Box>
          {segundaLineaPintada && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              ¡Segunda línea Pintada!
            </Alert>
          )}
        </Box>
        <Box>
          {cartonPintado && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              ¡Bingo!
            </Alert>
          )}
        </Box>
        <Button onClick={() => setIsOpen(true)}>Seleccionar Cartones</Button>
      </Center>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Elije tus números!`}</DrawerHeader>
          <DrawerBody>
            <Grid templateColumns="repeat(10, 1fr)" gap={6} className="cartones" flexWrap="wrap" display="flex">
              {cartones.map((carton, index1) => (
                <GridItem
                w="160px"
                h="100px"
                bg={seleccionados.includes(carton) ? "green.500" : "rgb(37, 2, 105)"}
                key={index1}
                className="carton"
                flexDirection="column-reverse"
                flexWrap="wrap"
                onClick={() => {
                  if (seleccionados.includes(carton)) {
                    // Si el cartón ya está seleccionado, se elimina de los cartones seleccionados
                    setSeleccionados(seleccionados.filter((cartonnSel) => cartonnSel !== carton));
                  } else {
                    // Si el cartón no está seleccionado, se agrega a los cartones seleccionados
                    setSeleccionados([...seleccionados, carton]);
                  }
                }}
              >
                {carton}
              </GridItem>
              
              ))}
            </Grid>
            </DrawerBody>
            <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={() => setIsOpen(false)}>
              Aceptar
            </Button>
            <Button colorScheme='blue'>New cardboards</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Grid templateColumns="repeat(10, 1fr)" gap={6} className="cartones" flexDirection="row-reverse" display="flex">
        {seleccionados.map((carton, index1) => (
          <GridItem
            w="160px"
            h="100px"
            bg="rgb(37, 2, 105)"
            key={index1}
            className="carton"
            id={`carton-${index1 + 1}`}
            flexDirection="column-reverse"
            flexWrap="wrap"
            ref={(el) => (cartonesRefs.current[index1] = el?.querySelectorAll("p"))}
          >
            {carton}
          </GridItem>
        ))}
      </Grid>
    </main>
  );
};

export default BingoGrid;
