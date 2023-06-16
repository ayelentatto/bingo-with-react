import React, { useState, useEffect, useRef } from "react";
import Speak from "../BotVoice";
import LineAlert from "./LineAlert";
import {
  Grid,
  GridItem,
  Center,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";


const BingoGrid = ({ cartones, numeroActual, disponibles, salientes, startGame }) => {

  //Abrir Drawer right: *Comienza en estado false(Cerrado)* *Se abre con el boton 'Seleccionar Cartones'*
  const [isOpen, setIsOpen] = useState(false);
  //En 'SELECCIONADOS' se almacenarán todos los cartones que el usuario seleccione en el 'Drawer'
  const [seleccionados, setSeleccionados] = useState([]);
  //Alertas de 'El juego comenzará..', 'ultimos segundos para elejir cartones..', 'primera linea completa...', 'segunda linea completa..', 'Bingo!!'
  const [gameStartAnnounced, setGameStartAnnounced] = useState(false);
  const [gameStartAnnounced1, setGameStartAnnounced1] = useState(false);
  //Alert: 'primera linea completa...', 'segunda linea completa..', 'Bingo!!'
  const [lineaPintada, setLineaPintada] = useState(false);
  const [segundaLineaPintada, setSegundaLineaPintada] = useState(false);
  const [cartonPintado, setCartonPintado] = useState(false);

  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);

  const [juegoEmpezado, setJuegoEmpezado] = useState(false); // desactiva el Drawer

  const cartonesRefs = useRef([]);// Referencia a los cartones

  const [contadorInicial, setContadorInicial] = useState(25); //Cuenta regresiva ocmienzo del juego
  
  useEffect(() => {
    
    const verificarPremios = () => {
      const primerosCincoIndices = [0, 3, 6, 9, 12];
      const segundosCincoIndices = [1, 4, 7, 10, 13];
      const tercerosCincoIndices = [2, 5, 8, 11, 14];

      seleccionados.forEach((carton, index) => {
        const pElement = cartonesRefs.current[index];
        const primerosCincoPintados = primerosCincoIndices.every((idx) => {
          return pElement[idx].className === "casilla pintada";
        });

        const segundosCincoPintados = segundosCincoIndices.every((idx) => {
          return pElement[idx].className === "casilla pintada";
        });

        const tercerosCincoPintados = tercerosCincoIndices.every((idx) => {
          return pElement[idx].className === "casilla pintada";
        });

        if (
          (primerosCincoPintados || segundosCincoPintados || tercerosCincoPintados) &&
          !alert1
        ) {
          Speak("primera linea completa, felicidades");
          setAlert1(true);
          setLineaPintada(true);
          setInterval(() => {
            setLineaPintada(false);

          }, 1000);

        }

        if (
          (primerosCincoPintados && segundosCincoPintados) && !alert2 ||
          (segundosCincoPintados && tercerosCincoPintados) && !alert2 ||
          (primerosCincoPintados && tercerosCincoPintados) && !alert2
        ) {
          Speak("Segunda Linea!!! felicidades!")

          setAlert2(true);
          setSegundaLineaPintada(true);
          setInterval(() => {
            setSegundaLineaPintada(false);
          }, 1000);
        }
       

        if (
          primerosCincoPintados &&
          segundosCincoPintados &&
          tercerosCincoPintados &&
          !alert3
        ) {
          Speak("BINGO!!! ¡Felicidades al ganador!");

          setAlert3(true);
          setCartonPintado(true);
          setInterval(() => {
            setCartonPintado(false);
          }, 2000);
        }
      });
    };

    const actualizarClases = () => {
      seleccionados.forEach((carton, index) => {
        const pElements = cartonesRefs.current[index];
        pElements.forEach((p) => {
          const num = parseInt(p.textContent);
          const isPintado =
            num === numeroActual || !disponibles.includes(num) || salientes.includes(num);
          p.className = isPintado ? "casilla pintada" : "casilla";
        });
      });
    };
    const intervalI = setInterval(() => {
      setContadorInicial((prevContador) => prevContador - 1);
      
      if (contadorInicial <= 0) {
        clearInterval(intervalI);
        setIsOpen(false);
        if(!juegoEmpezado){
          startGame();
          setJuegoEmpezado(true);
        }
      }
      
      
      
    }, 1000);

    if (contadorInicial <= 0) {      
      clearInterval(intervalI);
      setIsOpen(false);
      if(!juegoEmpezado){
        startGame();
        setJuegoEmpezado(true);
      }
    }
    if(contadorInicial == 20 && !gameStartAnnounced){
      Speak("Últimos segundos para seleccionar cartones");
      setGameStartAnnounced(true);
      //tengo que agregar una variable ede bcontrol
    }
    if(contadorInicial == 4 && !gameStartAnnounced1){
      Speak("El juego va a comenzar, buena suerte a todos los jugadores!")
      setGameStartAnnounced1(true);
    }
    
    
    

    const interval = setInterval(() => {
      actualizarClases();
      verificarPremios();
      
      
    }, 10);

    return () => {
      clearInterval(interval);
      clearInterval(intervalI);

    };
  }, [seleccionados, numeroActual, disponibles, salientes, contadorInicial, alert1, alert2,alert3]);

  

  return (
    <main>

<Grid templateColumns='repeat(3, 1fr)' gap={1}>
  <GridItem w='203%' h='10' bgGradient="linear(to-r, #000000, #9f94ea)" color='#7d74bf' >
  {contadorInicial > 0 ? (
      <p >El juego comenzará en: {contadorInicial} segundos</p>
    ) : (
      <p>Partida en curso</p>
    )}
  </GridItem>
  <GridItem w='52%' h='10' bg='#160e0f' >
  <Center >
      <Button colorScheme='#160e0f' onClick={() => setIsOpen(true)}>Seleccionar Cartones</Button>
    </Center>
  </GridItem>
  <GridItem w='100%' h='10' bgGradient="linear(to-r, #9f94ea , #000000)">
  <LineAlert show={lineaPintada} message="¡Primer línea Pintada!" />
    <LineAlert show={segundaLineaPintada} message="¡Segunda línea Pintada!" />
    <LineAlert show={cartonPintado} message="¡Bingo!" />
  </GridItem>
  </Grid>
      

      

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Elije tus números!`}</DrawerHeader>
          <DrawerBody>
            <p>El juego comenzará en: {contadorInicial} segundos</p>
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
                    if (contadorInicial === 0) {
                      return; // No hacer nada si el contador inicial es 0
                    }
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
            <Button variant="outline" mr={3} onClick={() => setIsOpen(false)}>
              Aceptar
            </Button>
            <Button colorScheme="blue">New cardboards</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div  >
        {seleccionados.length}
        <Grid templateColumns="repeat(10, 1fr)" gap={6} className="cartones" flexDirection="row-reverse" display="flex" style= {{ overflowY: "auto" }}>
        {seleccionados.map((carton, index1) => (
          <GridItem
            w="160px"
            h="100px"
            bg="rgb(37, 2, 105)"
            key={index1}
            className="carton"
            id={`carton-${index1 + 1}`}
            flexWrap="wrap"
            flexDirection="column-reverse"
            ref={(el) => (cartonesRefs.current[index1] = el?.querySelectorAll("p"))}
          >
            {carton}
          </GridItem>
        ))}
      </Grid>
      
      </div>
      
    </main>
  );
};

export default BingoGrid;
