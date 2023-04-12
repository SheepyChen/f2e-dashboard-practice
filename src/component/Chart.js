import React, { Fragment } from "react";
import PropTypes from "prop-types";
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
import { Button, Typography, Divider, Box } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import { isEmpty } from "lodash";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart(props) {
  const { submit, pieData, barData, title } = props;
  const barOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: "數量",
        },
      },
      x: {
        title: {
          display: true,
          text: "型態",
        },
      },
    },
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
    <Fragment>
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
      {submit && (
        <Fragment>
          <Typography
            fontSize="32px"
            fontWeight={400}
            fontFamily="Noto Sans TC"
            padding="16px 0"
          >
            {title}
          </Typography>

          {!isEmpty(barData) && submit && (
            <Box
              sx={{
                margin: "0 auto",
                paddingBottom: "48px",
              }}
            >
              <Bar data={barData} options={barOptions} />
            </Box>
          )}
          {!isEmpty(barData) && submit && (
            <Box
              sx={{
                width: "80%",
                margin: "0 auto",
              }}
            >
              <Pie data={pieData} options={pieOptions} />
            </Box>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

Chart.defaultProps = {
  submit: false,
  pieData: {},
  barData: {},
  title: "",
};

Chart.propTypes = {
  submit: PropTypes.bool,
  pieData: PropTypes.object,
  barData: PropTypes.object,
  title: PropTypes.string,
};

export default Chart;
