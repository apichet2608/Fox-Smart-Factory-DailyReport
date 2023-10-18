import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import { format, subDays } from "date-fns";
import { formatdatewithtime } from "../../utils/formatdate";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import DoubleBarChart from "./components/Barchart";
import TableMaxPack from "./components/TableMaxPack";
import TablePackTime from "./components/TablePackTime";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

export default function HoldingTimeSummary() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0, // breakpoint xs
        sm: 600, // breakpoint sm
        md: 960, // breakpoint md
        lg: 1280, // breakpoint lg
        xl: 1900, // breakpoint xl
      },
    },
  });

  const [distinctselect_product, setdistinctselect_product] = useState([]);
  const [product, setproduct] = useState({ product_name: "ALL" });

  const [distinctselect_station, setdistinctselect_station] = useState([]);
  const [station, setstation] = useState({
    sendresultdetails_station_type: "ALL",
  });

  const [DataTableAPI, setDataTableAPI] = useState([]);

  // #####################################################################  DATE Start-Stop ###############################################################################
  const currentDate = new Date().toISOString().slice(0, 10);
  const [yesterday, setYesterdayText] = useState("");
  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedYesterday = yesterday.toISOString().split("T")[0];
    setYesterdayText(formattedYesterday);
  }, []);
  const [startDate, setStartDate] = useState(
    format(subDays(new Date(), 1), "yyyy-MM-dd")
  );
  const [stopDate, setStopDate] = useState(format(new Date(), "yyyy-MM-dd"));
  // #####################################################################  FETCHING API ###############################################################################

  const fetchdistinctproduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_foxsystem_daily_report_bylot
        }/distinct_station?startdate=${startDate}&stopdate=${stopDate}`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setdistinctselect_station(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchdistinctproduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_foxsystem_summary_holdingtime
        }/distinct_product?test_station=${
          test_station.test_station
        }&startdate=${startDate}&stopdate=${stopDate}`
      );
      const jsonData = await response.json();

      setdistinctselect_product(jsonData);
      console.log(jsonData);
      console.log("select-product");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // #####################################################################  HANDLE #####################################################################################
  const handleStopDateChange = (event) => {
    const newStopDate = event.target.value;
    const stopDate = new Date(newStopDate);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const stopDateTimestamp = format(stopDate, "yyyy-MM-dd");

    setStopDate(stopDateTimestamp);
    console.log(stopDateTimestamp);
  };
  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    const startDate = new Date(newStartDate);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const startDateTimestamp = format(startDate, "yyyy-MM-dd");

    setStartDate(startDateTimestamp);
    console.log(startDateTimestamp);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Main open={open}> */}
      {/* <Main open={open}> */}
      {/* <CssBaseline /> */}
      {/* <Container className="custom-container"> */}
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            <TextField
              size="small"
              id="start-date"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Item>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            <TextField
              size="small"
              id="stop-date"
              label="Stop Date"
              type="date"
              value={stopDate}
              onChange={handleStopDateChange}
              sx={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Item>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              //   sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Item>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              //   sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Item>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
      </Grid>

      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Item>
          <DoubleBarChart />
        </Item>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}></Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Item>
          <TableMaxPack />
        </Item>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <Item>
          <TablePackTime />
        </Item>
      </Grid>

      {/* </Container> */}
      {/* </Main> */}
    </ThemeProvider>
  );
}
