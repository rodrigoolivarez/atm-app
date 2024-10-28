import React from 'react';
import { Box, Button } from '@mui/material';
// import { useTheme } from '@emotion/react';

interface NumericKeypadProps {
  onKeyPress: (number: string) => void;
  onClear: () => void;
  onDelete: () => void;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ onKeyPress, onClear, onDelete }) => {
  // const theme = useTheme();

  const buttonActions: { [key: string]: () => void } = {
    'C': onClear,
    'DEL': onDelete
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1em",
        marginTop: "1em",
        width: "100%",
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'DEL'].map((num) => (
        <Button
          key={num}
          variant="contained"
          onClick={() => buttonActions[num] ? buttonActions[num]() : onKeyPress(num.toString())}
          sx={{
            color: "#CCCDD1",
            background: "#26273B",

          }}
        >
          {num}
        </Button>
      ))}
    </Box>
  );
};

export default NumericKeypad;