import React , { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const DrawerCardboards = ({ isOpen, onClose, cartones}) => {
  const [seleccionados, setSeleccionados] = useState([]);


  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="xl">
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
                    setSeleccionados(seleccionados.filter((cartonnSel) => cartonnSel !== carton));
                  } else {
                    setSeleccionados([...seleccionados, carton]);
                  }
                }}
              >
                {carton}
              </GridItem>
            ))}
          </Grid>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Aceptar
          </Button>
          <Button colorScheme="blue">New cardboards</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerCardboards;
