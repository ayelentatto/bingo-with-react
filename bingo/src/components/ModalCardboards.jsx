import React, { useEffect, useState } from 'react';
import { numbers } from "./numbers";

import {
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Grid,
  GridItem
} from "@chakra-ui/react";

const DrawerCardboards = ({ cartones , nuevosCartones }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const [cardboards, setCardboards] = useState([]);

  const nums = [];
    const newCartones = [];

    const generarNumsCarton = (numbers) => {
        while (nums.length < 15) {
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        if (!nums.includes(randomNumber)) {
            nums.push(randomNumber);
        }
        }
        nums.sort((a, b) => a - b); // Ordenar los números de menor a mayor
        return nums;
    };

    const generarCartones = (numbers) => {
        while (newCartones.length < 8) {
          newCartones.push(generarNumsCarton(numbers));
        }
        setCardboards(newCartones.map((carton) => carton.map((num) => num)));
    };
    useEffect(()=>{

    }, [seleccionados])
    generarCartones(numbers)

  return (
    <Grid>
      <Button onClick={() => setIsOpen(true)}>Seleccionar Cartones</Button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton />
          <DrawerHeader>{`Elije tus números!`}</DrawerHeader>
          <DrawerBody>
            <Grid templateColumns="repeat(10, 1fr)" gap={6} className="cartones" flexWrap="wrap" display="flex">
              {cardboards.map((carton, index1) => (
                <GridItem
                  w="160px"
                  h="100px"
                  bg={seleccionados.includes(carton) ? "green.500" : "rgb(37, 2, 105)" }
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
                      className='casilla'
                    >
                      {num}
                    </p>
                  ))}
                </GridItem>
              ))}
            </Grid>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={() => setIsOpen(false)}>
              Aceptar
            </Button>
            <Button colorScheme="blue">New cardboards</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Grid>
  );
}

export default DrawerCardboards;
