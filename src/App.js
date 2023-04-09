import "./index.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useNavigate, useLocation } from "react-router-dom";
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

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const [submit, setSubmit] = useState(false);
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});
  const [year, setYear] = useState("110");
  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");
  const [groupedByCity, setGroupedByCity] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
    navigate(`/${county}/${district}`);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleCountyChange = (event) => {
    setCounty(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSubmit(false);
    setDistrict(event.target.value);
  };
  const fetchPost = async () => {
    const response = await fetch("/api");

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const governmentData = await response.json();
    setData(governmentData);
    const groupedByCity = governmentData.result.records.reduce((acc, obj) => {
      const city = obj.site_id.slice(0, 3);
      if (acc[city]) {
        acc[city].push(obj.site_id);
      } else {
        acc[city] = [obj.site_id];
      }
      return acc;
    }, {});
    setGroupedByCity(groupedByCity);
  };

  useEffect(() => {
    fetchPost();
    const [, countyParam, districtParam] = decodeURIComponent(
      location.pathname
    ).split("/");
    if (countyParam.length === 3 && districtParam.length === 3) {
      setCounty(countyParam);
      setDistrict(districtParam);
      setSubmit(true);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(data) && submit) {
      const lidataArr = data.result.records.filter(
        (item) => item.site_id === `${county}${district}`
      );
      const result = {};
      for (const obj of lidataArr) {
        for (const [key, value] of Object.entries(obj)) {
          result[key] = (result[key] || 0) + parseInt(value);
        }
      }

      const barData = {
        labels: ["共同生活", "獨立生活"],
        datasets: [
          {
            label: "男",
            data: [result.household_ordinary_m, result.household_single_m],
            backgroundColor: theme.palette.secondary.main,
          },
          {
            label: "女",
            data: [result.household_ordinary_f, result.household_single_f],
            backgroundColor: theme.palette.primary.main,
          },
        ],
      };
      setBarData(barData);
      const pieData = {
        labels: ["共同生活", "獨立生活"],
        datasets: [
          {
            label: "",
            data: [
              result.household_ordinary_total,
              result.household_single_total,
            ],
            backgroundColor: [
              theme.palette.secondary.main,
              theme.palette.primary.main,
            ],

            borderWidth: 1,
          },
        ],
      };
      setPieData(pieData);
    }
  }, [data, submit]);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "人口數統計",
      },
    },
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "戶數統計",
      },
    },
  };
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
              onClick={handleSubmit}
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
              sx={{
                zIndex: "100",
                width: "78px",
                height: "32px",
                borderRadius: "16px",
              }}
            >
              搜尋結果
            </Button>
          </Divider>
          {!isEmpty(barData) && submit && (
            <Bar data={barData} options={barOptions} />
          )}
          {!isEmpty(barData) && submit && (
            <Pie data={pieData} options={pieOptions} height={200} />
          )}
        </Box>
        <footer>
          <div class="container"></div>
        </footer>
      </ThemeProvider>
    </Box>
  );
}

export default App;
