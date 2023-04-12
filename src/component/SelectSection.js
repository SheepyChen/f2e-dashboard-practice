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
  CircularProgress,
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import { isEmpty, uniq, head } from "lodash";
import Chart from "./Chart";

function SelectSection(props) {
  const { theme } = props;
  const [groupedByCityData, setGroupedByCityData] = useState({});
  const [data, setData] = useState({});
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});

  const [year, setYear] = useState("110");
  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

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

  const submitDisabled = !county || !district;
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
    navigate(`/${year}/${county}/${district}`);
  };

  const fetchPost = async () => {
    const response = await fetch(
      `https://government-data.onrender.com/${year}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const governmentData = await response.json();
    setData(governmentData);
    //先依照縣市分類
    const groupedByCity = governmentData.result.records.reduce((acc, obj) => {
      const city = obj.site_id.slice(0, 3);
      if (acc[city]) {
        acc[city].push(obj.site_id);
      } else {
        acc[city] = [obj.site_id];
      }
      return acc;
    }, {});
    setGroupedByCityData(groupedByCity);
    setLoading(false);
  };
  useEffect(() => {
    fetchPost();
  }, [year]);
  useEffect(() => {
    const [, year, countyParam, districtParam] = decodeURIComponent(
      location.pathname
    ).split("/");
    //網址有string也可查詢
    if (countyParam && districtParam && year) {
      fetchPost();
      setCounty(countyParam);
      setDistrict(districtParam);
      setSubmit(true);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(data) && submit) {
      //找到對應的市區data再加總
      const districtDataArr = data.result.records.filter(
        (item) => item.site_id === `${county}${district}`
      );
      const result = {};
      for (const obj of districtDataArr) {
        for (const [key, value] of Object.entries(obj)) {
          result[key] = (result[key] || 0) + parseInt(value);
        }
      }
      //組生成chart所需的data
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

  return (
    <Box
      sx={{
        padding: { sm: "0px 143.5px 0px 292.5px" },
      }}
    >
      <Typography
        fontSize={{ xs: "25px", lg: "32px" }}
        fontWeight={400}
        fontFamily="Noto Sans TC"
        padding="16px 0"
      >
        人口數、戶數按戶別及性別統計
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            height: "120px",
            width: "100%",
            margin: "0 auto",
            padding: "30px 0",
          }}
        >
          <Box
            sx={{
              padding: "40px 0",
              display: { lg: "inline", xs: "inline-flex" },
              flexDirection: { xs: "column" },
              alignItems: { xs: "flex-start" },
            }}
          >
            <FormControl
              sx={{
                margin: "8px",
              }}
            >
              <InputLabel
                id="select-year"
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  padding: "0 4px",
                }}
              >
                年份
              </InputLabel>
              <Select
                labelId="select-year"
                value={year}
                sx={{
                  width: "73px",
                  height: "40px",
                }}
                onChange={handleYearChange}
                label="年份"
              >
                <MenuItem value={109}>109</MenuItem>
                <MenuItem value={110}>110</MenuItem>
                <MenuItem value={111}>111</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ margin: "8px" }}>
              <InputLabel
                id="select-county"
                shrink={true}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  padding: "0 4px",
                }}
              >
                縣/市
              </InputLabel>
              <Select
                labelId="select-county"
                value={county}
                sx={{
                  width: { xs: "343px", lg: "165px" },
                  height: "40px",
                }}
                onChange={handleCountyChange}
                label="縣/市"
                displayEmpty
              >
                <MenuItem disabled value="" key="countyDefault">
                  <em>請選擇 縣/市</em>
                </MenuItem>
                {Object.values(groupedByCityData)
                  .map((item) => head(item).slice(0, 3))
                  .filter((item) => item !== "區域別")
                  .map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>

              {/* <Autocomplete
                labelId="select-county"
                size="small"
                value={county ? county : "請選擇縣/市"}
                disablePortal
                sx={{
                  width: { xs: "343px", lg: "165px" },
                  fontSize: "14px",
                }}
                options={Object.values(groupedByCityData)
                  .map((item) => head(item).slice(0, 3))
                  .filter((item) => item !== "區域別")}
                onChange={handleCountyChange}
                renderInput={(params) => <TextField {...params} label="" />}
              /> */}
            </FormControl>
            <FormControl sx={{ margin: "8px" }}>
              <InputLabel
                id="select-district"
                shrink={true}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  padding: "0 4px",
                }}
              >
                區
              </InputLabel>
              <Select
                labelId="select-district"
                displayEmpty
                disabled={!county}
                label="區"
                value={district}
                sx={{
                  width: { xs: "343px", lg: "165px" },
                  height: "40px",
                }}
                onChange={handleDistrictChange}
              >
                <MenuItem disabled value="">
                  <em>請先選擇 縣/市</em>
                </MenuItem>
                {uniq(groupedByCityData[county])
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
              disabled={submitDisabled}
              sx={{
                width: { xs: "343px", lg: "83px" },
                height: "36.5px",
                margin: "8px",
                color: submitDisabled
                  ? "rgba(0, 0, 0, 0.26)"
                  : theme.palette.secondary.light,
                borderRadius: "4px",
                "&:hover": {
                  bgcolor: theme.palette.secondary.main,
                },
                bgcolor: submitDisabled
                  ? "rgba(0, 0, 0, 0.12)"
                  : theme.palette.secondary.main,
              }}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
      )}
      <Box sx={{ height: { xs: "200px", lg: "0px" } }}></Box>
      {!loading && (
        <Chart
          submit={submit}
          pieData={pieData}
          barData={barData}
          title={`${year}年 ${county} ${district}`}
        />
      )}
    </Box>
  );
}

export default SelectSection;
