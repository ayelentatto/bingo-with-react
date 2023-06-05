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
  const [isOpenLine, setIsOpenLine] = useState(false);

  const [seleccionados, setSeleccionados] = useState([]);
  const [lineaPintada, setLineaPintada] = useState(false);
  const [alertaMostrada, setAlertaMostrada] = useState(false);
  const cartonesRefs = useRef([]); // Referencias a los elementos de cartones

  useEffect(() => {
    const verificarPremios = () => {
      seleccionados.forEach((carton, index) => {
        const primerosNumeros = carton.slice(0, 5);
        const todosPintados = primerosNumeros.every((num) => {
          const pElement = cartonesRefs.current[index] && cartonesRefs.current[index][num - 1]; // Verifica si la referencia existe antes de acceder al elemento de párrafo
      
        });

        if (todosPintados) {
          setLineaPintada(true);
          setAlertaMostrada(true);
        }
      });
    };

    const actualizarClases = () => {
      seleccionados.forEach((carton, index) => {
        const pElements = cartonesRefs.current[index]; // Obtiene los elementos de párrafo del cartón correspondiente
        console.log(pElements)
        pElements.forEach((p) => {
          const num = parseInt(p.textContent);
          const isPintado = num === numeroActual || !disponibles.includes(num) || salientes.includes(num) ;
          p.className = isPintado ? "casilla pintada" : "casilla";
          console.log(p)
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

  

  

  useEffect(() => {
    if (lineaPintada) {
      // Mostrar la alerta cuando se completa una línea
      setIsOpenLine(true);
    }
  }, [lineaPintada]);

  return (
    <main>
      <Center mt={130}>
        <Box>
          {lineaPintada && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              ¡Línea Pintada!
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
                {carton.map((num, index) => (
                  <p
                    key={index}
                    className={(() => {
                      if (num === numeroActual || !disponibles.includes(num) || salientes.includes(num)) {
                        return "truee";
                      } else {
                        return "false";
                      }
                    })()}
                  >
                    {num}
                  </p>
                ))}
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
            {carton.map((num, index) => (
              <p
                key={num}
                className={
                  salientes.includes(num)
                    ? "numero pintado"
                    : "numero"
                }
              >
                {num}
              </p>
            ))}
          </GridItem>
        ))}
      </Grid>
    </main>
  );
};

export default BingoGrid;
