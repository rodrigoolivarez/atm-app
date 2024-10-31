import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import NumericKeypad from '../../components/NumericKeypad/NumericKeypad';
import AtmIcon from '@mui/icons-material/Atm';
import ATMImage from "../../assets/images/ATM.png";

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [pin, setPin] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const existingToken = localStorage.getItem("token");
        if (!existingToken) {
            localStorage.setItem("token", "simulated-token");
        }
    }, []);

    const getATMImage = () => {
        return ATMImage;
    };

    const handleKeyPress = (number: string) => {
        if (pin.length < 6) {
            setPin(prevPin => prevPin + number);
        }
    };


    const handleLogin = () => {
        setLoading(true);
        setErrorMessage(null);
        const token = localStorage.getItem("token");
        const validPin = "123456";
        
        setTimeout(() => {
            if (pin === validPin && token) {
                onLogin();
                setPin('');
            } else {
                setErrorMessage("Pin incorrecto o no hay token!");
            }
            setLoading(false);
        }, 1000);
    };

    const handleRetry = () => {
        setErrorMessage(null);
        setPin('');
    };

    if (loading) {
        return <LoadingMessage message="Cargando..." />;
    }

    if (errorMessage) {
        return <ErrorMessage message={errorMessage} onRetry={handleRetry} />;
    }



    return (
        <Box
            sx={{
                // border: "1px solid red",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                padding: "1em",
                boxSizing: "border-box",
                background: "#1C1C2C"
            }}
        >
            <Box>
                <img src={getATMImage()} alt="LogoCajeroATM" width={150} height={150} />
            </Box>
            <Typography variant="h4" sx={{ marginBottom: "1em", color: "#CCCDD1" }} >
                Bienvenido a su cajero automatico <AtmIcon />
            </Typography>
            <input
                type="password"
                value={pin}
                readOnly
                style={{
                    marginBottom: "1em",
                    padding: "0.5em",
                    fontSize: "1.2em",
                    textAlign: "center",
                    width: "100px"
                }}
            />
            <Button
                variant="contained"
                onClick={handleLogin}
                disabled={loading || pin.length < 6}
                sx={{
                    marginBottom: "1em",
                    background: "#26273B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",


                }}
                endIcon={<AtmIcon />}
            >
                Ingresar
            </Button>
            <NumericKeypad
                onKeyPress={handleKeyPress}
                onClear={() => setPin('')}
                onDelete={() => setPin((prev) => prev.slice(0, -1))}
            />
        </Box>
    );
};

export default Login;