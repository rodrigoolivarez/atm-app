import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface ErrorMessageProps {
    message: string;
    onRetry:()=> void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                color: 'red',
            }}
        >
            <Typography variant="h6">
                {message}
            </Typography>
            <Button variant="outlined" onClick={onRetry} sx={{ marginTop: '1em' }}>
                Volver a Intentarlo
            </Button>
        </Box>
    );
};

export default ErrorMessage;