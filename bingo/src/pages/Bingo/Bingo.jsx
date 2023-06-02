import React, { useEffect, useState } from "react";
import "./Bingo.scss";
import { numbers, tablero } from "../../shared/numbers";
import { phrases } from "../../shared/phrases";
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
  const [cartonesPintados, setCartonesPintados] = useState([]);
  const [salientes, setSalientes] = useState([]);
  const [numerosTableroPintados, setNumerosTableroPintados] = useState([]);
  const [numeroActual, setNumeroActual] = useState(null);
  const [tableroN, setTablero] = useState(tablero);

  const [cartones, setCartones] = useState([]);
  const [disponibles, setDisponibles] = useState(numbers);
  const [cartonesSeleccionados, setCartonesSeleccionados] = useState(cartonesPintados);

  const cambiarClaseCarton = (cartonIndex) => {
    // Lógica para cambiar la clase del cartón seleccionado
    // Puedes modificar el estado de cartonesSeleccionados aquí
    if (cartonesSeleccionados.includes(cartonIndex)) {
      // Si el cartón ya está seleccionado, se elimina de los cartones seleccionados
      setCartonesSeleccionados(cartonesSeleccionados.filter((carton) => carton !== cartonIndex));
    } else {
      // Si el cartón no está seleccionado, se agrega a los cartones seleccionados
      setCartonesSeleccionados([...cartonesSeleccionados, cartonIndex]);
    }
  };
  const cambiarClaseNumCarton = (cartonIndex) => {
    // Lógica para cambiar la clase del cartón seleccionado
    // Puedes modificar el estado de cartonesSeleccionados aquí
    const cartonesActualizados = cartonesSeleccionados.map((carton, index) => {
      if (index === cartonIndex) {
        const numerosActualizados = carton.map((num) => {
          const isPintado = salientes.includes(num);
          if (isPintado && !numerosTableroPintados.includes(num)) {
            // Si el número está pintado en el tablero y no está en la lista de números pintados del cartón
            return { numero: num, clase: "pintada" };
          }
          return { numero: num, clase: "iiiBingoJsx" };
        });
        return numerosActualizados;
      }
      return carton;
    });
  
    setCartonesSeleccionados(cartonesActualizados);
  };

  const newCartones = [];

  const generarCartones = () => {
    const disponibles = [...salientes];
    while (newCartones.length < 6) {
      newCartones.push(generarNumsCarton(disponibles));
    }
    setCartonesPintados(newCartones.map((carton) => carton.map((num) => num)));
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
      const newCartonesPintados = cartonesPintados.map((carton) => {
        const newCartonPintado = carton.map((num) => {
          const isPintado = salientes.includes(num);
          if (isPintado && !numerosTableroPintados.includes(num)) {
            setNumerosTableroPintados((prevNumerosTableroPintados) => [
              ...prevNumerosTableroPintados,
              num,
            ]);
          }
          return <p className={`casilla ${isPintado ? "pintada" : "iiiBingoJsx"}`}>{num}</p>;
        });
        return newCartonPintado;
      });
      setCartonesPintados(newCartonesPintados);
      disponibles.splice(randomIndex, 1);
    }, 2000);
  };

  const numeroString = (numeroActual) => {
    const stringNumber = numeroActual.toString();
    return <p>{stringNumber}</p>;
  };

  useEffect(() => {
    const newCartones = [];
    while (newCartones.length < 10) {
      newCartones.push(generarNumsCarton(numbers));
    }
    setCartonesPintados(newCartones.map((carton) => carton.map((num) => <p className="casilla">{num}</p>)));
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
          numerosTableroPintados={numerosTableroPintados}
          numeroActual={numeroActual} // Asegúrate de tener esta línea
          numeroString={numeroString}
        />
      </GridItem>
      <GridItem bg="gray.900" area={"main"}>
        <BingoGrid
          cartonesPintados={cartonesPintados}
          salientes={salientes}
          numeroActual={numeroActual} // Asegúrate de tener esta línea
          disponibles={disponibles}
          onCartonesGenerados={setCartonesPintados}
          cartonesSeleccionados={cartonesSeleccionados} 
          cambiarClaseCarton={cambiarClaseCarton}
          cambiarClaseNumCarton={cambiarClaseNumCarton}
        />
      </GridItem>
      <GridItem pl="2" bg="gray.700" area={"footer"}>
        <BingoFooter startGame={startGame} />
      </GridItem>
    </Grid>
  );
};

export default Bingo;
