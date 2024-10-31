import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingMessageProps {
    message: string;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ message }) => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor:'#1C1C2C',
                color:'#CCCDD1'
            }}
        >
            <CircularProgress sx={{color : '#CCCDD1'}}/>
            <Typography variant="h6" sx={{ marginTop: '1em', color:'#CCCDD1' }}>
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingMessage;