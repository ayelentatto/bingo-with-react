import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Realiza una solicitud POST al backend
      const response = await axios.post('/api/login', { username, password });
      console.log(response.data); // Maneja la respuesta exitosa
    } catch (error) {
      console.error(error); // Maneja el error
    }
  };

  return (
    <Box>
      <form onSubmit={handleLogin}>
        <FormControl>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit">Iniciar sesión</Button>
      </form>
    </Box>
  );
}
export default LoginForm;