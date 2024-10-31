import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import NumericKeypad from '../../components/NumericKeypad/NumericKeypad';
import { useSnackbar } from 'notistack';
import ATMImage from "../../assets/images/ATM.png";

interface AccountProps {
  onLogout: () => void;
}

const Home: React.FC<AccountProps> = ({ onLogout }) => {
  const [saldo, setSaldo] = useState<number>(0);
  const [monto, setMonto] = useState<string>("");
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (token) {
      const storedBalance = localStorage.getItem(`saldo_${token}`);
      if (storedBalance) {
        setSaldo(Number(storedBalance));
      }
    }
  }, [token]);

  const updateSaldoInLocalStorage = (newSaldo: number) => {
    if (token) {
      localStorage.setItem(`saldo_${token}`, newSaldo.toString());
    }
  };

  const getATMImage = () => {
    return ATMImage;
  };

  const handleDeposit = () => {
    const newSaldo = saldo + Number(monto);
    setSaldo(newSaldo);
    updateSaldoInLocalStorage(newSaldo);
    setMonto("");
  };

  const handleWithdraw = () => {
    if (Number(monto) > saldo) {
      enqueueSnackbar("No hay suficiente saldo!", { variant: "error" });
      return;
    }
    const newSaldo = saldo - Number(monto);
    setSaldo(newSaldo);
    updateSaldoInLocalStorage(newSaldo);
    setMonto("");
  };

  const handleKeyPress = (number: string) => {
    if (monto.length < 10) {
      setMonto((prevMonto) => prevMonto + number);
    }
  };

  return (
    <Box
      sx={{
        // border: "1px solid red",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "110vh",
        padding: "1em",
        boxSizing: "border-box",
        background: "#1C1C2C"
      }}

    >
      <Box>
        <img src={getATMImage()} alt="LogoCajeroATM" width={150} height={150} />
      </Box>
      <Typography
        variant="h4"
        sx={{ color: "#CCCDD1", marginBottom: '1em' }}
      >
        Bienvenido a la interfaz de su cajero automatico
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: "#CCCDD1", marginBottom: '1em' }}
      >
        Saldo: ${saldo.toFixed(2)}
      </Typography>
      <label
        htmlFor="monto-input"
        style={{
          color: "#CCCDD1",
          fontSize: "1em",
          marginBottom: "0.3em"
        }}
      >
        Ingrese el monto
      </label>
      <input
        id='monto-input'
        type="text"
        value={monto}
        readOnly
        style={{
          marginBottom: "1em",
          padding: "0.5em",
          fontSize: "1.2em",
          textAlign: "center",
          width: "100px"
        }}
      />
      <Box sx={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
        <Button
          variant="contained"
          onClick={handleDeposit}
          sx={{
            background: "#26273B",
            color: "#CCCDD1",
            "&:hover": {
              backgroundColor: "#1C1C2C"
            }
          }}
        >
          Depositar
        </Button>
        <Button
          variant="contained"
          onClick={handleWithdraw}
          sx={{
            background: "#26273B",
            color: "#CCCDD1",
            "&:hover": {
              backgroundColor: "#1C1C2C"
            }
          }}
        >
          Retirar
        </Button>
      </Box>
      <NumericKeypad
        onKeyPress={handleKeyPress}
        onClear={() => { setMonto('') }}
        onDelete={() => setMonto((prev) => prev.slice(0, -1))}
      />
      <Button
        variant="contained"
        onClick={onLogout}
        sx={{
          marginTop: "2em",
          background: "#26273B",
          color: "#CCCDD1",
          "&:hover": {
            backgroundColor: "#1C1C2C"
          }
        }}
      >
        Salir
      </Button>
    </Box>
  );
};

export default Home;