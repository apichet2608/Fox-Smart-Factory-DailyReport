import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Plot1 from "./Components/plot5";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import axios from "axios";
import Button from "@mui/material/Button";
import Papa from "papaparse";
import { format, addMilliseconds } from "date-fns";
import { Card, CardContent, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  Sparklines,
  SparklinesBars,
  SparklinesReferenceLine,
  SparklinesText,
} from "react-sparklines";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import TodayIcon from "@mui/icons-material/Today";
const SummaryKpiCard = ({ data, title }) => {
  const sortedData = Object.entries(data).sort(
    ([, a], [, b]) => b.total_count - a.total_count
  );

  const totalCount = sortedData.reduce(
    (totalCount, [, value]) => totalCount + (value.total_count || 0),
    0
  );

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          {/* <Sparklines data={sortedData.map(([, value]) => value.total_count)}>
            <SparklinesBars style={{ fill: "#80d8ff", barWidth: 15 }} />
          </Sparklines> */}
          <Typography variant="h6" component="div">
            <TodayIcon /> {title}
          </Typography>
          <Typography variant="h5" component="div">
            Summary:{" "}
            <Chip
              label={totalCount}
              color="primary"
              style={{ fontSize: "1rem" }}
            ></Chip>
          </Typography>
          <Divider />
        </CardContent>
        <CardContent>
          {/* <Stack direction="row" spacing={0.5}> */}
          {sortedData.map(([key, value]) => (
            <Div key={key}>
              <KpiCard
                label={value.sendresultdetails_station_type}
                value={value.total_count}
              />
              <Divider />
            </Div>
          ))}
          {/* </Stack> */}
        </CardContent>
      </Card>
    </List>
  );
};

const KpiCard = ({ label, value }) => {
  return (
    <Typography
      variant="h6"
      component="div"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <ArrowRightTwoToneIcon />
        {label}
      </div>
      <Chip
        label={value}
        color="primary"
        // variant="outlined"
        style={{ fontSize: "1rem" }} // Adjust the font size as needed
      />
    </Typography>
  );
};

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const QuantitySelect = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [datamainapi, setDatamainapi] = useState(null);
  const [datamainapi2, setDatamainapi2] = useState(null);

  const [startDate, setStartDate] = React.useState(null);
  const [stopDate, setStopDate] = React.useState(null);
  const [distinctProduct, setdistinctProduct] = useState([]);
  const [maxAccumulateDataByProcess, setMaxAccumulateByProcess] = useState([]);

  const [selectedStation, setSelectedStation] = useState(null);
  const [distinctStation, setdistinctStation] = useState([]);

  const [datamaininfotoday, setDatamaininfotoday] = useState(null);
  const [datamaininfoyesterday, setDatamaininfoyesterday] = useState(null);

  const handleExportCSV = () => {
    if (datamainapi.length > 0) {
      const csvDay = Papa.unparse(datamainapi);
      const csvBlob = new Blob([csvDay], {
        type: "text/csv;charset=utf-8;",
      });
      const csvURLDay = window.URL.createObjectURL(csvBlob);

      const currentTimestamp = new Date();
      const formattedTimestamp = format(
        currentTimestamp,
        "yyyy-MM-dd HH-mm-ss-SSS"
      );
      const fileName = `foxsystem_Posting_${formattedTimestamp}.csv`;

      const tempLinkDay = document.createElement("a");
      tempLinkDay.href = csvURLDay;
      tempLinkDay.setAttribute("download", "Hr" + "-" + fileName);
      tempLinkDay.click();
    }
    if (datamainapi2.length > 0) {
      const csvDay = Papa.unparse(datamainapi2);
      const csvBlob = new Blob([csvDay], {
        type: "text/csv;charset=utf-8;",
      });
      const csvURLDay = window.URL.createObjectURL(csvBlob);

      const currentTimestamp = new Date();
      const formattedTimestamp = format(
        currentTimestamp,
        "yyyy-MM-dd HH-mm-ss-SSS"
      );
      const fileName = `foxsystem_Posting_${formattedTimestamp}.csv`;

      const tempLinkDay = document.createElement("a");
      tempLinkDay.href = csvURLDay;
      tempLinkDay.setAttribute("download", "Day" + "-" + fileName);
      tempLinkDay.click();
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    console.log(event.target.value);
  };

  const handleStopDateChange = (event) => {
    setStopDate(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    // Fetch distinct processes from API
    const fetchdistinctProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_post_by_hr
          }/distinct-product`
        );
        const data = await response.json();
        setdistinctProduct(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching distinct processes:", error);
      }
    };

    fetchdistinctProduct();
  }, []);

  useEffect(() => {
    // Fetch distinct processes from API

    if (selectedProduct !== null) {
      const fetchdistinctStation = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_IP_API_OLD}${
              import.meta.env.VITE_foxsystem_post_by_hr
            }/distinct-station?product=${
              selectedProduct.sendresultdetails_product
            }`
          );
          const data = await response.json();

          // Push 'ALL' to the data array
          const distinctData = [
            ...data,
            { sendresultdetails_station_type: "ALL" },
          ];

          setdistinctStation(distinctData);
          console.log(distinctData);
          console.log(data);
        } catch (error) {
          console.log("Error fetching distinct processes:", error);
        }
      };

      fetchdistinctStation();
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct) {
      // Call API here with selectedProcess and selectedProduct
      // Update datamainapi state with the fetched data
      const fetchData = async () => {
        try {
          let apiUrl = `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_post_by_hr
          }/plot-hr`;
          let params = {
            startdate: startDate,
            stopdate: stopDate,
            product: selectedProduct.sendresultdetails_product,
            station: selectedStation.sendresultdetails_station_type,
          };

          if (selectedStation.sendresultdetails_station_type === "ALL") {
            apiUrl = `${import.meta.env.VITE_IP_API_OLD}${
              import.meta.env.VITE_foxsystem_post_by_hr
            }/plot-all`;
            // Remove 'station' parameter
            delete params.station;
          }

          const response = await axios.get(apiUrl, {
            params,
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = response.data;
          console.log(data);
          setDatamainapi(data);
        } catch (error) {
          console.log("Error fetching data from API:", error);
        }
      };
      const fetchData2 = async () => {
        try {
          let apiUrl = `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_post_by_day
          }/plot-day`;
          let params = {
            startdate: startDate,
            stopdate: stopDate,
            product: selectedProduct.sendresultdetails_product,
            station: selectedStation.sendresultdetails_station_type,
          };

          if (selectedStation.sendresultdetails_station_type === "ALL") {
            apiUrl = `${import.meta.env.VITE_IP_API_OLD}${
              import.meta.env.VITE_foxsystem_post_by_day
            }/plot-all`;
            // Remove 'station' parameter
            delete params.station;
          }

          const response = await axios.get(apiUrl, {
            params,
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = response.data;
          console.log(data);
          setDatamainapi2(data);
        } catch (error) {
          console.log("Error fetching data from API:", error);
        }
      };

      const fetchDatainfoyesterday = async () => {
        try {
          let apiUrl = `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_post_by_day
          }/info-fix-yesterday`;
          let params = {
            product: selectedProduct.sendresultdetails_product,
            station: selectedStation.sendresultdetails_station_type,
          };

          if (selectedStation.sendresultdetails_station_type === "ALL") {
            apiUrl = `${import.meta.env.VITE_IP_API_OLD}${
              import.meta.env.VITE_foxsystem_post_by_day
            }/info-all-yesterday`;
            // Remove 'station' parameter
            delete params.station;
          }

          const response = await axios.get(apiUrl, {
            params,
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = response.data;
          console.log(data);
          setDatamaininfoyesterday(data);
        } catch (error) {
          console.log("Error fetching data from API:", error);
        }
      };

      const fetchDatainfotoday = async () => {
        try {
          let apiUrl = `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_post_by_day
          }/info-fix-today`;
          let params = {
            product: selectedProduct.sendresultdetails_product,
            station: selectedStation.sendresultdetails_station_type,
          };

          if (selectedStation.sendresultdetails_station_type === "ALL") {
            apiUrl = `${import.meta.env.VITE_IP_API_OLD}${
              import.meta.env.VITE_foxsystem_post_by_day
            }/info-all-today`;
            // Remove 'station' parameter
            delete params.station;
          }

          const response = await axios.get(apiUrl, {
            params,
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = response.data;
          console.log(data);
          setDatamaininfotoday(data);
        } catch (error) {
          console.log("Error fetching data from API:", error);
        }
      };

      fetchData();
      fetchData2();
      fetchDatainfotoday();
      fetchDatainfoyesterday();
    }
  }, [selectedProduct, selectedStation, startDate, stopDate]);

  useEffect(() => {
    const currentDate = new Date(); // วันปัจจุบัน
    const startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // เริ่มต้น start date - 7 วัน
    // const formattedStartDate = startDate.toISOString().split("T")[0]; // รูปแบบ 'YYYY-MM-DD'
    const formattedStartDate = currentDate.toISOString().split("T")[0]; // รูปแบบ 'YYYY-MM-DD'
    const formattedStopDate = currentDate.toISOString().split("T")[0]; // รูปแบบ 'YYYY-MM-DD'

    setStartDate(formattedStartDate);
    setStopDate(formattedStopDate);
  }, []);

  useEffect(() => {
    if (datamainapi) {
      // เรียกใช้ฟังก์ชัน getLatestAndMax เพื่อรับข้อมูลล่าสุดและค่า accumulate มากสุดตาม process
      const { latestByProcess, maxAccumulateByProcess } =
        getLatestAndMax(datamainapi);

      console.log(latestByProcess); // ข้อมูลล่าสุดตาม process
      setMaxAccumulateByProcess(maxAccumulateByProcess);
      console.log(maxAccumulateByProcess); // ค่า accumulate มากสุดตาม process
    }
  }, [datamainapi]);
  // เพิ่มฟังก์ชัน getLatestAndMax ที่คุณได้ให้
  function getLatestAndMax(data) {
    // สร้างออบเจ็กต์เพื่อเก็บข้อมูลล่าสุดตาม process
    const latestByProcess = {};
    // สร้างออบเจ็กต์เพื่อเก็บค่า accumulate ที่มากสุดตาม process
    const maxAccumulateByProcess = {};

    // วนลูปตามข้อมูล
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const sendresultdetails_station_type =
        item.sendresultdetails_station_type;

      // ตรวจสอบว่ามี process นี้ในออบเจ็กต์หรือยัง
      if (!latestByProcess.hasOwnProperty(sendresultdetails_station_type)) {
        // ถ้ายังไม่มีให้กำหนดค่าล่าสุดเป็นข้อมูลปัจจุบัน
        latestByProcess[sendresultdetails_station_type] = item;
        // กำหนดค่า accumulate มากสุดเป็นค่า accumulate ปัจจุบัน
        maxAccumulateByProcess[sendresultdetails_station_type] =
          item.accumulate;
      } else {
        // ถ้ามีแล้วให้ตรวจสอบว่าเวลาปัจจุบันมากกว่าเวลาล่าสุดหรือไม่
        const currentTimestamp = new Date(
          item.test_attributes_uut_stop
        ).getTime();
        const latestTimestamp = new Date(
          latestByProcess[
            sendresultdetails_station_type
          ].test_attributes_uut_stop
        ).getTime();

        // ตรวจสอบเวลาและ accumulate ว่ามีค่ามากกว่าหรือไม่
        if (
          currentTimestamp > latestTimestamp ||
          item.accumulate >
            maxAccumulateByProcess[sendresultdetails_station_type]
        ) {
          latestByProcess[sendresultdetails_station_type] = item;
          maxAccumulateByProcess[sendresultdetails_station_type] =
            item.accumulate;
        }
      }
    }

    // ส่งคืนออบเจ็กต์ที่เก็บข้อมูลล่าสุดและค่า accumulate มากสุดตาม process
    return {
      latestByProcess,
      maxAccumulateByProcess,
    };
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box maxWidth="xl" sx={{ height: "100%", width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={2.5}>
              <Item>
                <Autocomplete
                  options={distinctProduct}
                  getOptionLabel={(option) => option.sendresultdetails_product}
                  value={selectedProduct}
                  onChange={(event, newValue) => setSelectedProduct(newValue)}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Product"
                      variant="outlined"
                    />
                  )}
                />
              </Item>
            </Grid>
            <Grid item xs={2.5}>
              <Item>
                <Autocomplete
                  options={distinctStation}
                  getOptionLabel={(option) =>
                    option.sendresultdetails_station_type
                  }
                  value={selectedStation}
                  onChange={(event, newValue) => setSelectedStation(newValue)}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Station"
                      variant="outlined"
                    />
                  )}
                />
              </Item>
            </Grid>

            <Grid xs={2}>
              <Item sx={{ mt: 2 }}>
                <TextField
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
            <Grid xs={2}>
              <Item sx={{ mt: 2 }}>
                <TextField
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
            <Grid item xs={3}>
              <Button variant="outlined" onClick={handleExportCSV}>
                Export CSV
              </Button>
              {/* <Div>
                Latest update
                <nav aria-label="main mailbox folders">
                  <List>
                    {maxAccumulateDataByProcess &&
                      Object.entries(maxAccumulateDataByProcess).map(
                        ([process, value]) => (
                          <ListItem disablePadding key={process}>
                            <ListItemIcon>
                              <LabelImportantIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${process} (ps) = ${value}`}
                            />
                          </ListItem>
                        )
                      )}
                  </List>
                </nav>
              </Div> */}
            </Grid>
            <Grid item xs={12}>
              {datamainapi && (
                <Plot1 data={datamainapi} title={"Posting by Hour"} />
              )}
            </Grid>
            <Grid item xs={12}>
              {datamainapi2 && (
                <Plot1 data={datamainapi2} title={"Posting by Day"} />
              )}
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              {datamaininfoyesterday && (
                <>
                  <Item>
                    <SummaryKpiCard
                      data={datamaininfoyesterday}
                      title={"Yesterday update"}
                    />
                  </Item>
                </>
              )}
            </Grid>
            <Grid item xs={4}>
              {datamaininfotoday && (
                <>
                  <Item>
                    <SummaryKpiCard
                      data={datamaininfotoday}
                      title={"Today update"}
                    />
                  </Item>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default QuantitySelect;
