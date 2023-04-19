import React, { useEffect, useState } from 'react';

import "./Bingo.scss";
import { numbers } from '../../shared/numbers';
import { sentences } from '../../shared/phrases';

const Bingo = () => {
    const numMod = [];
    
    const [numAl, setNumAl] = useState();
    
    useEffect(() => {
        for(let num of numbers){
            numMod.push(num);
        }

    }, []);

    const iniciar = () => {
        setInterval(() => {
            let poscAleat = Math.floor(Math.random() * numMod.length + 1);
            let numAleat = numMod[poscAleat];
            setNumAl(numAleat);
        }, 2000)

    }


    return (
    <div>
        <h2>{numAl}</h2>
        <button onClick={iniciar}>Iniciar Juego</button>
    </div>
    )
}

export default Bingo;