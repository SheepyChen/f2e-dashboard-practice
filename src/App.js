import "./index.css";
import React from "react";
import { Typography, Box } from "@mui/material";
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
      light: "#FFFFFF",
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
              bgcolor: theme.palette.secondary.main,
              width: "100%",
              height: "48px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                color: theme.palette.secondary.light,
                padding: "10px 16px",
              }}
            >
              <Typography fontSize="16px" fontWeight={700} fontFamily="Ubuntu">
                LOGO
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "10px 16px",
              }}
            >
              <Box
                sx={{
                  color: theme.palette.secondary.light,
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "7px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <SettingsOutlinedIcon sx={{ width: "16px", height: "16px" }} />
              </Box>
            </Box>
          </Box>
        </header>
        <Box
          sx={{
            position: "absolute",
            top: "300px",
            left: "5%",
            transform: "translate(-50%, +50%) rotate(90deg)",
            display: "inline-block",
            width: "971px",
            height: "149px",
            background:
              "linear-gradient(to right,  #E60000, #FFCC00, #007F00, #0000CC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: {
              xs: "0.12",
              sm: "0.5",
              lg: "1",
            },
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          <Typography
            fontSize="200px"
            fontWeight={700}
            fontFamily="Ubuntu"
            lineHeight="74.4%"
          >
            TAIWAN
          </Typography>
        </Box>
        <SelectSection theme={theme} />
      </ThemeProvider>
    </Box>
  );
}

export default App;
