import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Plot1 from "./Components/plot1";
import List from "@mui/material/List";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import TodayIcon from "@mui/icons-material/Today";

const SummaryKpiCard = ({ data, title }) => {
  const sortedData = Object.entries(data).sort(([, a], [, b]) => b - a);

  const totalCount = sortedData.reduce(
    (totalCount, [, value]) => totalCount + (value || 0),
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
            Summary :{" "}
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
              <KpiCard label={key} value={value} />
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
  const [startDate, setStartDate] = React.useState(null);
  const [stopDate, setStopDate] = React.useState(null);
  const [distinctProcesses, setDistinctProcesses] = useState([]);
  const [maxAccumulateDataByProcess, setMaxAccumulateByProcess] = useState([]);

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
    const fetchDistinctProcesses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_ok
          }/distinct-sendresultdetails_product`
        );
        const data = await response.json();
        setDistinctProcesses(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching distinct processes:", error);
      }
    };

    fetchDistinctProcesses();
  }, []);

  useEffect(() => {
    if (selectedProduct && selectedProduct.sendresultdetails_product !== null) {
      // Call API here with selectedProcess and selectedProduct
      // Update datamainapi state with the fetched data
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_IP_API_OLD}${
              import.meta.env.VITE_foxsystem_json_backup_header_ok
            }/product`,
            {
              params: {
                startdate: startDate,
                stopdate: stopDate,
                product: selectedProduct.sendresultdetails_product,
              },
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = response.data;
          console.log(data);
          setDatamainapi(data);
        } catch (error) {
          console.log("Error fetching data from API:", error);
        }
      };

      fetchData();
    }
  }, [selectedProduct, startDate, stopDate]);

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
      console.log(maxAccumulateByProcess); // ค่า accumulate มากสุดตาม process
      setMaxAccumulateByProcess(maxAccumulateByProcess);
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
      const station_process = item.station_process;

      // ตรวจสอบว่ามี process นี้ในออบเจ็กต์หรือยัง
      if (!latestByProcess.hasOwnProperty(station_process)) {
        // ถ้ายังไม่มีให้กำหนดค่าล่าสุดเป็นข้อมูลปัจจุบัน
        latestByProcess[station_process] = item;
        // กำหนดค่า accumulate มากสุดเป็นค่า accumulate ปัจจุบัน
        maxAccumulateByProcess[station_process] = item.accumulate;
      } else {
        // ถ้ามีแล้วให้ตรวจสอบว่าเวลาปัจจุบันมากกว่าเวลาล่าสุดหรือไม่
        const currentTimestamp = new Date(
          item.test_attributes_uut_stop
        ).getTime();
        const latestTimestamp = new Date(
          latestByProcess[station_process].test_attributes_uut_stop
        ).getTime();

        // ตรวจสอบเวลาและ accumulate ว่ามีค่ามากกว่าหรือไม่
        if (
          currentTimestamp > latestTimestamp ||
          item.accumulate > maxAccumulateByProcess[station_process]
        ) {
          latestByProcess[station_process] = item;
          maxAccumulateByProcess[station_process] = item.accumulate;
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
                  options={distinctProcesses}
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
            <Grid item xs={12}>
              {datamainapi && datamainapi.length > 0 && (
                <Plot1 data={datamainapi} />
              )}
            </Grid>
            {/* <Grid item xs={3}></Grid> */}
            <Grid item xs={6}>
              {datamainapi && datamainapi.length > 0 && (
                <Div>
                  <SummaryKpiCard
                    data={maxAccumulateDataByProcess}
                    title={"Latest update"}
                  />
                </Div>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default QuantitySelect;
