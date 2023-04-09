import "./index.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { isEmpty, uniq, head } from "lodash";

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
  const [data, setData] = useState([]);
  const [year, setYear] = useState("110");
  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");
  const [groupedByCity, setGroupedByCity] = useState({});

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleCountyChange = (event) => {
    setCounty(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };
  const fetchPost = async () => {
    const response = await fetch("/api");
    console.log(response);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const governmentData = await response.json();
    setData(governmentData);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (!isEmpty(data)) {
      const groupedByCity = data.result.records.reduce((acc, obj) => {
        const city = obj.site_id.slice(0, 3);
        if (acc[city]) {
          acc[city].push(obj.site_id);
        } else {
          acc[city] = [obj.site_id];
        }
        return acc;
      }, {});
      setGroupedByCity(groupedByCity);
      // const countyOption = Object.values(groupedByCity).map((item) =>
      //   head(item).slice(0, 3)
      // );
      // const districtOption = uniq(groupedByCity[countyOption[1]]).map((item) =>
      //   item.replace([countyOption[1]], "")
      // );

      // const lidataArr = governmentData.result.records.filter(
      //   (item) => item.site_id === "新北市萬里區"
      // );
      // const result = {};
      // for (const obj of lidataArr) {
      //   for (const [key, value] of Object.entries(obj)) {
      //     result[key] = (result[key] || 0) + parseInt(value);
      //   }
      // }
    }
  }, [data]);

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
                height: "10vh",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              X
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
        <Box
          sx={{
            bgcolor: "#651FF2",

            padding: "0px 143.5px 0px 292.5px",
          }}
        >
          <Typography
            fontSize="32px"
            fontWeight={400}
            fontFamily="Noto Sans TC"
            padding="16px 0"
          >
            人口數、戶數按戶別及性別統計
          </Typography>

          <Box
            sx={{
              bgcolor: "#EEEFFF",
              height: "120px",
              width: "100%",
              padding: "40px 0",
            }}
          >
            <FormControl>
              <InputLabel id="select-year">年份</InputLabel>
              <Select
                labelId="select-year"
                value={year}
                sx={{ zIndex: "100", width: "73px", height: "40px" }}
                onChange={handleYearChange}
                label="年份"
              >
                <MenuItem value={110}>110</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="select-county" shrink={true}>
                縣/市
              </InputLabel>
              <Select
                labelId="select-county"
                value={county}
                sx={{ zIndex: "100", width: "165px", height: "40px" }}
                onChange={handleCountyChange}
                label="縣/市"
                displayEmpty
              >
                <MenuItem disabled value="" key="countyDefault">
                  <em>請選擇 縣/市</em>
                </MenuItem>
                {Object.values(groupedByCity)
                  .map((item) => head(item).slice(0, 3))
                  .map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="select-district" shrink={true}>
                區
              </InputLabel>
              <Select
                labelId="select-district"
                displayEmpty
                label="區"
                value={district}
                sx={{ zIndex: "100", width: "165px", height: "40px" }}
                onChange={handleDistrictChange}
              >
                <MenuItem disabled value="">
                  <em>請先選擇 縣/市</em>
                </MenuItem>
                {uniq(groupedByCity[county])
                  .map((item) => item.replace([county], ""))
                  .map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              // onClick={}
              sx={{
                zIndex: "100",
                width: "83px",
                height: "36.5px",
                bgcolor: "#651FFF",
                color: "#FFFFFF",
              }}
            >
              SUBMIT
            </Button>
          </Box>

          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "#B388FF",
              },
            }}
          >
            <Button
              variant="outlined"
              // onClick={}
              sx={{
                zIndex: "100",
                width: "78px",
                height: "32px",
                borderRadius: "16px",
              }}
            >
              SUBMIT
            </Button>
          </Divider>
        </Box>
        <footer>
          <div class="container"></div>
        </footer>
      </ThemeProvider>
    </Box>
  );
}

export default App;
