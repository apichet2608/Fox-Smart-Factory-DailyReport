import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Text from "@mui/material/Paper";
import TrackTable from "./components/track_Table";
import { format, subDays } from "date-fns";

import LoadingPage from "../PageLoading/loading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Holding_track() {
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

  const [distinct_product, setdistinct_product] = useState([]);
  const [select_product, setselect_product] = useState({ product_name: "ALL" });

  const [distinct_lot, setdistinct_lot] = useState([]);
  const [select_lot, setselect_lot] = useState({ lot_no: "ALL" });

  const [distinct_packing, setdistinct_packing] = useState([]);
  const [select_packing, setselect_packing] = useState({
    packing_group: "ALL",
  });

  const [DataAPItable, setDataAPItable] = useState([]);

  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [stopDate, setStopDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [isTableLoad, setisTableLoad] = useState(false);

  const [isProductLoad, setisProductLoad] = useState(false);
  const [isLotLoad, setisLotLoad] = useState(false);
  const [isPackingLoad, setisPackingLoad] = useState(false);

  const fetchTableData = async () => {
    try {
      // Create a new URLSearchParams object to construct the query string
      const params = new URLSearchParams();
      params.append("startdate", startDate);
      params.append("stopdate", stopDate);
      params.append("select_product", select_product.product_name);
      params.append("select_lot", select_lot.lot_no);
      params.append("select_packing", select_packing.packing_group);

      const url = `${import.meta.env.VITE_IP_API}${
        import.meta.env.VITE_Table_foxsystem_holding_time
      }/Start_StopDate?${params.toString()}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log("TRACK TABLE");
      console.log(jsonData);

      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setDataAPItable(jsonData);
        setisTableLoad(false);
      } else {
        console.log("No data available.");
        setDataAPItable([]);
        setisTableLoad(false);
      }
    } catch (error) {
      setDataAPItable([]);
      setisTableLoad(false);

      // console.error("Error fetching data:", error);
    }
  };

  const fetch_product = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_foxsystem_holding_time
        }/distinct_product?startdate=${startDate}&stopdate=${stopDate}`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("PRODUCT");
      setdistinct_product(jsonData);
      setisProductLoad(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setdistinct_product([]);
      setisProductLoad(false);
    }
  };

  const fetch_lot = async () => {
    try {
      setisLotLoad(true);
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_foxsystem_holding_time
        }/distinct_lot`,
        {
          params: {
            select_product: select_product.product_name,
            startdate: startDate,
            stopdate: stopDate,
          },
        }
      );
      const jsonData = response.data;
      console.log("LOT NO");
      console.log(jsonData);
      setdistinct_lot(jsonData);
      setisLotLoad(false);
      // if (Array.isArray(jsonData) && jsonData.length > 0) {
      // setdistinct_lot(jsonData);
      // setisLotLoad(false);
      // } else {
      //   console.log("No data available.");
      //   setdistinct_lot([]);
      //   setisLotLoad(false);
      // }
    } catch (error) {
      setdistinct_lot([]);
      setisLotLoad(false);
      //   console.error("Error fetching data:", error);
    }
  };

  const fetch_packing = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_foxsystem_holding_time
        }/distinct_packing`,
        {
          params: {
            select_product: select_product.product_name,
            select_lot: select_lot.lot_no,
            startdate: startDate,
            stopdate: stopDate,
          },
        }
      );
      const jsonData = response.data;
      console.log("LOT NO");
      console.log(jsonData);
      setdistinct_packing(jsonData);
      setisPackingLoad(false);
    } catch (error) {
      setdistinct_packing([]);
      setisPackingLoad(false);
      //   console.error("Error fetching data:", error);
    }
  };

  const handlePrdChange = (event, newvalue) => {
    setselect_lot({ lot_no: "ALL" });
    setselect_packing({ packing_group: "ALL" });
    if (newvalue === null) {
      setselect_product({ product_name: "ALL" });
    } else {
      setselect_product(newvalue);
    }
  };

  const handleLotChange = (event, newvalue) => {
    setselect_packing({ packing_group: "ALL" });
    if (newvalue === null) {
      setselect_lot({ lot_no: "ALL" });
    } else {
      setselect_lot(newvalue);
    }
  };

  const handlePackingChange = (event, newvalue) => {
    if (newvalue === null) {
      setselect_packing({ packing_group: "ALL" });
    } else {
      setselect_packing(newvalue);
    }
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    const startDate = new Date(newStartDate);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const startDateTimestamp = format(startDate, "yyyy-MM-dd");

    setStartDate(startDateTimestamp);
    console.log(startDateTimestamp);
  };
  const handleStopDateChange = (event) => {
    const newStopDate = event.target.value;
    const stopDate = new Date(newStopDate);

    // แปลงเป็น timestamp ตามรูปแบบที่ต้องการ
    const stopDateTimestamp = format(stopDate, "yyyy-MM-dd");

    setStopDate(stopDateTimestamp);
    console.log(stopDateTimestamp);
  };

  useEffect(() => {
    // fetch_product();
    // fetch_lot();
    // fetch_packing();
    if (
      select_product &&
      select_lot &&
      select_packing &&
      startDate &&
      stopDate
    ) {
      setisTableLoad(true);
      fetchTableData();
    }
    console.log("Done");
  }, [select_product, select_lot, select_packing, startDate, stopDate]);

  useEffect(() => {
    fetch_product();
    fetch_lot();
    fetch_packing();
    fetchTableData();
    console.log("Done");
  }, []);

  useEffect(() => {
    if (select_product && select_product.product_name !== "") {
      fetch_lot();
    }

    console.log("Done");
  }, [select_product]);

  useEffect(() => {
    if (select_lot && select_lot.lot_no !== "") {
      fetch_packing();
    }
    console.log("Done");
  }, [select_lot]);

  useEffect(() => {
    if (startDate && stopDate) {
      setisProductLoad(true);
      fetch_product();
      fetch_lot();
      fetch_packing();
    }
    console.log("Done");
  }, [startDate, stopDate]);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            {/* <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              {isProductLoad ? (
                <div>Loading data...</div>
              ) : distinct_product && distinct_product.length > 0 ? (
                <Item>
                  <Autocomplete
                    size="small"
                    disablePortal
                    options={distinct_product}
                    getOptionLabel={(option) =>
                      option && option.product_name ? option.product_name : ""
                    }
                    value={select_product}
                    onChange={handlePrdChange}
                    style={{ width: "100%", display: "inline-block" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Product" />
                    )}
                  />
                </Item>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                  }}
                >
                  <Typography variant="h6" component="h6">
                    No data...
                  </Typography>
                </div>
              )}
            </Grid> */}
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
              <Item sx={{ height: 55 }}>
                <Autocomplete
                  size="small"
                  disablePortal
                  disabled={isProductLoad}
                  options={
                    isProductLoad ? ["Loading data.."] : distinct_product
                  }
                  getOptionLabel={(option) =>
                    option && option.product_name ? option.product_name : ""
                  }
                  value={select_product}
                  onChange={handlePrdChange}
                  style={{ width: "100%", display: "inline-block" }}
                  renderInput={(params) => (
                    <div>
                      {isProductLoad ? (
                        <Box
                          sx={{
                            mt: 1,
                            ml: 1,

                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress size="25px" />
                          &nbsp; &nbsp; Loading...
                        </Box>
                      ) : (
                        <TextField {...params} label="Product" />
                      )}
                    </div>
                  )}
                />
              </Item>
            </Grid>

            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Item sx={{ height: 55 }}>
                <Autocomplete
                  size="small"
                  disablePortal
                  disabled={isLotLoad}
                  options={isLotLoad ? ["Loading data.."] : distinct_lot}
                  getOptionLabel={(option) =>
                    option && option.lot_no ? option.lot_no : ""
                  }
                  value={select_lot}
                  onChange={handleLotChange}
                  style={{ width: "100%", display: "inline-block" }}
                  renderInput={(params) => (
                    <div>
                      {isLotLoad ? (
                        <Box
                          sx={{
                            mt: 1,
                            ml: 1,

                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress size="25px" />
                          &nbsp; &nbsp; Loading...
                        </Box>
                      ) : (
                        <TextField {...params} label="Lot No." />
                      )}
                    </div>
                  )}
                />
              </Item>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Item sx={{ height: 55 }}>
                <Autocomplete
                  size="small"
                  disablePortal
                  disabled={isPackingLoad}
                  options={
                    isPackingLoad ? ["Loading data.."] : distinct_packing
                  }
                  getOptionLabel={(option) =>
                    option && option.packing_group ? option.packing_group : ""
                  }
                  value={select_packing}
                  onChange={handlePackingChange}
                  style={{ width: "100%", display: "inline-block" }}
                  renderInput={(params) => (
                    <div>
                      {isLotLoad ? (
                        <Box
                          sx={{
                            mt: 1,
                            ml: 1,

                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress size="25px" />
                          &nbsp; &nbsp; Loading...
                        </Box>
                      ) : (
                        <TextField {...params} label="Packing Group" />
                      )}
                    </div>
                  )}
                />
              </Item>
            </Grid>

            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {isTableLoad ? (
                <div>
                  <LoadingPage />
                </div>
              ) : DataAPItable && DataAPItable.length > 0 ? (
                <Item>
                  <TrackTable datafromAPI_track={DataAPItable} />
                </Item>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                  }}
                >
                  <Typography variant="h6" component="h6">
                    No data
                  </Typography>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
