import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import "./DrawerCardboards.scss";

const DrawerCardboards = ({ cartones }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpenDrawer} colorScheme="blue">
        Ver cartones
      </Button>
      {isOpen && (
        <div className="drawer-cardboards">
          <Box>
            <Button onClick={handleCloseDrawer} colorScheme="blue">
              Cerrar
            </Button>
          </Box>
          {cartones.map((carton, index) => (
            <div key={index} className="carton-drawer">
              {carton.map((num) => (
                <p key={num}>{num}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DrawerCardboards;
