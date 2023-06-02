import React, { useState } from "react";
import { Grid, GridItem, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";

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

const BingoGrid = ({ cartonesPintados, salientes, onCartonesGenerados, numeroActual, disponibles, cartonesSeleccionados, cambiarClaseCarton }) => {
  const [isOpen, setIsOpen] = useState(false);

  const generarCartones = () => {
    onCartonesGenerados(cartonesSeleccionados);

    setIsOpen(false);
  };

  return (
    <main>
      <Center mt={130}>
        <Button onClick={() => setIsOpen(true)}>Seleccionar Cartones</Button>
      </Center>
  
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Elije tus números!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(10, 1fr)" gap={6} className="cartones" flexWrap="wrap" display="flex">
              {cartonesPintados.map((cartonPintado, index1) => (
                <GridItem
                  w="160px"
                  h="100px"
                  bg={cartonesSeleccionados.includes(cartonPintado) ? "green.500" : "rgb(37, 2, 105)"}
                  key={index1}
                  className="carton"
                  onClick={() => {cambiarClaseCarton()}
                  }
                >
                  {cartonPintado.map((num, index) => (
                    <p key={index} className={(() => {
                      if (num === numeroActual || !disponibles.includes(num) || salientes.includes(num)) {
                        return "truee";
                      } else {
                        return "false";
                      }
                    })()}>
                      {num}
                    </p>
                  ))}
                </GridItem>
              ))}
            </Grid>
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
              Cerrar
            </Button>
            <Button variant="ghost" onClick={generarCartones}>
              Generar Cartones
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  
      <Grid templateColumns="repeat(10, 1fr)" gap={6} className="cartones" flexWrap="wrap" display="flex">
  {cartonesSeleccionados.map((carton, index) => (
    <GridItem
      w="160px"
      h="100px"
      bg="grey.500"
      key={index}
      className={carton.clase}
      onClick={() => cambiarClaseCarton(index)}
    >
      {carton.map((num, numIndex) => (
        <p key={numIndex} className={`casilla ${carton.clase}`}>
          {num.numero}
        </p>
      ))}
    </GridItem>
  ))}
</Grid>

    </main>
  );
  
};

export default BingoGrid;
