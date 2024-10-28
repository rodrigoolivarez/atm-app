import { Box, Button, Typography, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NumericKeypad from '../../components/NumericKeypad/NumericKeypad';
import { useSnackbar } from 'notistack';

const Account: React.FC = () => {
    const [saldo, setSaldo] = useState<number>(0);
    const [monto, setMonto] = useState<string>("");
    const token = localStorage.getItem("token")
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (token) {
            const storedBalance = localStorage.getItem(`saldo_${token}`);
            if (storedBalance) {
                setSaldo(Number(storedBalance))
            }
        }
    }, [token]);

    const updateSaldoInLocalStorage = (newSaldo: number) => {
        if (token) {
            localStorage.setItem(`saldo_${token}`, newSaldo.toString());
        }
    };

    const handleDeposit = () => {
        const newSaldo = saldo + Number(monto);
        setSaldo(newSaldo);
        updateSaldoInLocalStorage(newSaldo)
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
                padding: '2em',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5">Saldo: ${saldo.toFixed(2)}</Typography>
            <TextField
                type="text"
                value={monto}
                aria-readonly
                label="Monto"
                variant="outlined"
                sx={{ marginBottom: '1em', marginTop: '1em', width: '200px' }}
            />
            <Box sx={{ display: 'flex', gap: '1em' }}>
                <Button variant="contained" onClick={handleDeposit}>
                    Depositar
                </Button>
                <Button variant="contained" onClick={handleWithdraw}>
                    Retirar
                </Button>
            </Box>
            <NumericKeypad
                onKeyPress={handleKeyPress}
                onClear={() => { setMonto('') }}
                onDelete={() => setMonto((prev) => prev.slice(0, -1))} />
        </Box>
    );
};

export default Account;