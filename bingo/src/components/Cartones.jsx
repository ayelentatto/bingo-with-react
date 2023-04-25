import {React , useState} from 'react';
import { useControllableState, useBoolean, Grid, GridItem } from "@chakra-ui/react";

import { numbers } from '../shared/numbers';
import { useState } from "react";


const Cartones = () =>{
    const [allNumbers, setAllNumbers] = useState(numbers);
    const [cartones, setCartones] = useState([]);

    const generarNumsCarton = (allNumbers) => {
        const nums = [];
        while (nums.length < 15) {
          const randomNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)];
          if (!nums.includes(randomNumber)) {
            nums.push(randomNumber);
          }
        }
        return nums;
    };
    const newCartones = [];
    while (newCartones.length < 12) {
      newCartones.push(generarNumsCarton(allNumbers));
    }
    setCartones(newCartones);

    return (
        
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem w='100%' h='10' bg='blue.500' />
        <div className="cartones">
        {cartones.map((carton, index) => (
          <div key={index} className="carton">
            {carton.map((num) => (
              <p
                
              >
                {num}
              </p>
            ))}
          </div>
        ))}
      </div>

        <GridItem/>
        
        </Grid>
        
    );
};

export default Cartones;