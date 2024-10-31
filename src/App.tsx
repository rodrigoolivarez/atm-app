import { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { SnackbarProvider } from "notistack";
import { Box } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material";



// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#55A2FB",
//       main: "#1C1C2C",
//       contrastText: "#CCCDD1",
//     },
//   },
// });


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    // <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={3000}>
        <Box>
          {isLoggedIn ? (
            <Home onLogout={handleLogout} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Box>
      </SnackbarProvider>
    // </ThemeProvider>
  );
}

export default App;