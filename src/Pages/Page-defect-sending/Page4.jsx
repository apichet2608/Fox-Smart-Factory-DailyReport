import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Plot1 from "./components/plot4";
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
  const sortedData = data.sort((a, b) => b.count - a.count);

  const totalCount = sortedData.reduce(
    (totalCount, { count }) => totalCount + Number(count || 0),
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
          {/* <Sparklines data={sortedData.map(({ count }) => count)}>
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
          {sortedData.map(({ station_process, count }) => (
            <Div key={station_process}>
              <KpiCard label={station_process} value={count} />
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

  const handleExportCSV = () => {
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
    const fileName = `foxsystem_fail_${formattedTimestamp}.csv`;

    const tempLinkDay = document.createElement("a");
    tempLinkDay.href = csvURLDay;
    tempLinkDay.setAttribute("download", fileName);
    tempLinkDay.click();
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
    if (selectedProduct) {
      // Call API here with selectedProcess and selectedProduct
      // Update datamainapi state with the fetched data
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_IP_API_OLD}${
              import.meta.env.VITE_foxsystem_json_backup_header_ok
            }/product-fail`,
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
    if (selectedProduct) {
      // Call API here with selectedProcess and selectedProduct
      // Update datamainapi state with the fetched data
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_IP_API_OLD}${
              import.meta.env.VITE_foxsystem_json_backup_header_ok
            }/sum-fail-groupby-process`,
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
          setMaxAccumulateByProcess(data);
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

  const [maxWidth, setMaxWidth] = useState("xl");

  React.useEffect(() => {
    const handleResize = () => {
      // ทำการตรวจสอบขนาดหน้าจอและกำหนด maxWidth ที่เหมาะสม
      const screenWidth = window.innerWidth;
      console.log(screenWidth);
      if (screenWidth < 600) {
        setMaxWidth("xl");
      } else if (screenWidth < 960) {
        setMaxWidth("sm");
      } else if (screenWidth < 1280) {
        setMaxWidth("md");
      } else if (screenWidth < 1920) {
        setMaxWidth("lg");
      } else {
        setMaxWidth("xl");
      }
    };

    // เพิ่ม event listener เมื่อขนาดหน้าจอเปลี่ยนแปลง
    window.addEventListener("resize", handleResize);

    // คำสั่งที่ใช้เมื่อคอมโพเนนต์ถูก unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={maxWidth}>
        <Box maxWidth="xl" sx={{ height: "100%", width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xl={2.5} lg={2.5} md={2.5}>
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
            <Grid item xl={2} lg={2} md={2}>
              <Item>
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
            <Grid item xl={2} lg={2} md={2}>
              <Item>
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
            <Grid item xl={2} lg={2} md={2} mt={2.5}>
              <Button variant="outlined" onClick={handleExportCSV}>
                Export CSV
              </Button>
            </Grid>
            <Grid item xl={12} lg={12} md={12}>
              {datamainapi && <Plot1 data={datamainapi} />}
            </Grid>
            <Grid item xl={6} lg={6} md={6}>
              {datamainapi && (
                <Item>
                  <SummaryKpiCard
                    data={maxAccumulateDataByProcess}
                    title={"Latest update"}
                  />
                </Item>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default QuantitySelect;
