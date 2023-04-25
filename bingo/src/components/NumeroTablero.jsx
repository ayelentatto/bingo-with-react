import React from 'react';
import { numbers } from '../shared/numbers';

const NumeroTablero = ({numbers, salientes, numerosTableroPintados})=>{
    return (
        <div className='allNums'>
            {numbers.map((num)=>(
                <p
                key={num}
                className={salientes.includes(num) || numerosTableroPintados.includes(num)
                ? 'tablero pintado'
                : 'tablero'
            }
            >{num}</p>
            ))}
        </div>
    );
};

export default NumeroTablero;