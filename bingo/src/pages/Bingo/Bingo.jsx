import React, { useEffect, useState } from "react";
import "./Bingo.scss";
import { numbers, tablero } from "../../components/numbers";
import { phrases } from "../../components/phrases";
import BingoGrid from "../../components/BingoGrid";
import BingoHeader from "../../components/BingoHeader";
import BingoNav from "../../components/BingoNav";
import BingoFooter from "../../components/BingoFooter";
import { Grid, GridItem, Button } from "@chakra-ui/react";

const generarNumsCarton = (disponibles) => {
  const nums = [];
  while (nums.length < 15) {
    const randomNumber = disponibles[Math.floor(Math.random() * disponibles.length)];
    if (!nums.includes(randomNumber)) {
      nums.push(randomNumber);
    }
  }
  nums.sort((a, b) => a - b); // Ordenar los números de menor a mayor
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
  const [cartones, setcartones] = useState([]); // cartones generados aleatoriamente, no son los seleccionados
  const [salientes, setSalientes] = useState([]); // lista de salientes
  const [numeroActual, setNumeroActual] = useState(null); //numero actual
  const [tableroN, setTablero] = useState(tablero); // literalmente es el tablero

  const [disponibles, setDisponibles] = useState(numbers);




  const newCartones = [];

  const generarCartones = () => {
    const disponibles = [...salientes];
    while (newCartones.length < 6) {
      newCartones.push(generarNumsCarton(disponibles));
    }
    setcartones(newCartones.map((carton) => carton.map((num) => num)));
  };
  const startGame = () => {
    setInterval(() => {
      const newAvailableNumbers = disponibles.filter((num) => num !== numeroActual);
      setDisponibles(newAvailableNumbers);
      const randomNumber = newAvailableNumbers[Math.floor(Math.random() * newAvailableNumbers.length)];
      const randomIndex = newAvailableNumbers.indexOf(randomNumber);

      setNumeroActual(randomNumber);
      setSalientes((prevSalientes) => [...prevSalientes, randomNumber]);
      speakPhrase(randomNumber);
      setDisponibles((prevDisponibles) => prevDisponibles.filter((num) => num !== randomNumber));
      const newcartones = cartones.map((carton) => {
        const newCartonPintado = carton.map((num) => {

          carton.map((num)=>{
            return <p
          key={num}
          className={
            salientes.includes(num) 
              ? "casilla"
              : "casilla"
          }
        >
          {num}
        </p>;
          })
          
        });
        return newCartonPintado;
      });
      setcartones(newcartones);
      disponibles.splice(randomIndex, 1);
    }, 200);
  };

  const numeroString = (numeroActual) => {
    const stringNumber = numeroActual.toString();
    return <p>{stringNumber}</p>;
  };



  const nuevosCartones = ()=>{
    const newCartones = [];
    while (newCartones.length < 12) {
      newCartones.push(generarNumsCarton(numbers));
      setcartones(newCartones.map((carton) => carton.map((num) => <p className="casilla">{num}</p>)));

    }

  }

  useEffect(() => {
   
    nuevosCartones();
    
  }, []);

  return (
    <Grid
      templateAreas={`"header header" "nav main" "nav footer"`}
      gridTemplateRows={"80px 1fr 100px"}
      gridTemplateColumns={"330px 1fr"}
      h="500px"
      gap="1"
      color="blackAlpha.900"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="gray.600" area={"header"}>
        <BingoHeader salientes={salientes} />
      </GridItem>
      <GridItem pl="2" bg="gray.800" area={"nav"}>
        <BingoNav
          tableroN={tableroN}
          salientes={salientes}
          numeroActual={numeroActual} // Asegúrate de tener esta línea
          numeroString={numeroString}
        />
      </GridItem>
      <GridItem bg="gray.900" area={"main"}>
        <BingoGrid
          disponibles={disponibles}
          salientes={salientes}
          cartones={cartones}
          nuevosCartones={nuevosCartones}
        />
      </GridItem>
      <GridItem pl="2" bg="gray.700" area={"footer"}>
        <BingoFooter startGame={startGame} />
      </GridItem>
    </Grid>
  );
};

export default Bingo;
