import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Account from '../../components/Account/Account';

interface iHome {
  onLogout: () => void;
}

const Home: React.FC<iHome> = ({ onLogout }) => {
  return (
    <Box sx={{ textAlign: 'center', padding: '2em' }}>
      <Typography variant="h4" sx={{ marginBottom: "1em" }}>
        Bienvenido al Cajero Automático
      </Typography>
      <Account/>
      <Button variant="contained" onClick={onLogout} sx={{ marginBottom: "1em" }}>
        Salir
      </Button>
    </Box>
  );
};

export default Home;