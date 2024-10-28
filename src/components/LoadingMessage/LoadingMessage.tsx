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
            }}
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ marginTop: '1em' }}>
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingMessage;