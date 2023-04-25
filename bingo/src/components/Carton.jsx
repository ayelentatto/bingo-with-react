import React from 'react';
import Bingo from '../pages/Bingo/Bingo';


  
const Carton = ({ carton, salientes, numerosTableroPintados }) => {
    return (
        <div className='carton'>
            {carton.map((num, index) => (
                <p
                key={index}
                className={
                    salientes.includes(num) || numerosTableroPintados.includes(num)
                    ? 'casilla pintada'
                    : 'casilla'

                }>{num}</p>
            ))}
        </div>
    );
};

export default Carton;

