import React, { useEffect, useState } from "react";
import "./Bingo.scss";
import { numbers } from "../../shared/numbers";
import { phrases } from "../../shared/phrases";

const Bingo = () => {

  const [carton, setCarton] = useState([]);
  const [cartonPintado, setCartonPintado] = useState([]);
  const [disponibles, setDisponibles] = useState(numbers);
  const [salientes, setSalientes] = useState([]);
  const [numerosTableroPintados, setNumerosTableroPintados] = useState([]);

  
  const startGame = () => {
    // Generar el cartón
    const nums = [];
    while (nums.length < 15) {
      const randomNumber = disponibles[Math.floor(Math.random() * disponibles.length)];
      if (!nums.includes(randomNumber)) {
        nums.push(randomNumber);
      }
    }
    setCarton(nums);
  
    
    // Empezar a sacar números aleatorios
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * disponibles.length);
      const randomNumber = disponibles[randomIndex];
    
      // Actualizar números salientes
      setSalientes(prevSalientes => [...prevSalientes, randomNumber]);
      speakPhrase(randomNumber);
      // Actualizar números disponibles
      setDisponibles(prevDisponibles => prevDisponibles.filter(num => num !== randomNumber));
    
      const newCartonPintado = carton.map(num => {
        if (randomNumber !== num) {
          return <p className="casilla pintada">{num}</p>;
        } else {
          return <p className="casilla">{num}</p>;
        }
      });
      setCartonPintado(newCartonPintado);

      
    }, 2000);
    
  };
  
  const speakPhrase = (number) => {
    const phrase = phrases[number];
    if (phrase) {
      const utterance = new SpeechSynthesisUtterance(phrase);
      speechSynthesis.speak(utterance);
    }
  };
 
  useEffect(() => {
    
  }, [disponibles, carton, salientes, cartonPintado]);
  

  
  return (
    <div>
      
      <h1>Número actual: {salientes.length > 0 ? salientes[salientes.length - 1] : null}</h1>
      <button onClick={startGame}>Start Game</button>
      <div className="d-block">
        <h2>Números disponibles:</h2>
        <p>{disponibles.join(', ')}</p>
      </div>
      <div className="d-block">
        <h2>Números salientes: </h2>
        <p>{[...new Set(salientes)].join(', ')}</p>
      </div>
      <div className="allNums">
        {numbers.map((num) => (
          <p key={num} className={salientes.includes(num) || numerosTableroPintados.includes(num) ? 'tablero pintado' : 'tablero'}>{num}</p>
        ))}
      </div>
      <div className="cartoon">
        {carton.map((num)=>(
          <p key={num} className={salientes.includes(num) || numerosTableroPintados.includes(num) ? 'casilla pintada' : 'tablero'}>{num}</p>
        ))}
      </div>
    </div>
  );
  
};


export default Bingo;