import "./index.css";
import React from "react";
import { Button, Typography, Box } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SelectSection from "./component/SelectSection";

const theme = createTheme({
  typography: {
    fontFamily: ["Ubuntu", "Noto Sans TC"].join(","),
  },
  palette: {
    primary: {
      main: "#B388FF",
    },
    secondary: {
      main: "#651FFF",
    },
  },
});

function App() {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <ThemeProvider theme={theme}>
        <header>
          <Box
            sx={{
              bgcolor: "#651FFF",
              width: "100%",
              height: "48px",
            }}
          >
            <Box
              sx={{
                color: "rgb(255, 255, 255)",
                position: "absolute",
                top: "15px",
                left: "16px",
              }}
            >
              <Typography fontSize="16px" fontWeight={700} fontFamily="Ubuntu">
                LOGO
              </Typography>
            </Box>
            <Box
              sx={{
                color: "rgb(255, 255, 255)",
                position: "absolute",
                top: "4px",
                right: "24px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "4px",
              }}
            >
              <SettingsOutlinedIcon />
            </Box>
          </Box>
        </header>
        <Box
          sx={{
            position: "absolute",
            top: "56px",
            left: "5%",
            transform: "translate(-50%, +80%) rotate(90deg)",
            display: "inline-block",
            borderRadius: 2,
            background: "linear-gradient(to right, #FF4E50, #F9D423, #1ABC9C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <Typography fontSize="200px" fontWeight={700} fontFamily="Ubuntu">
            TAIWAN
          </Typography>
        </Box>
        <SelectSection theme={theme} />
        <footer>
          <div class="container"></div>
        </footer>
      </ThemeProvider>
    </Box>
  );
}

export default App;
