import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { format, subDays } from "date-fns";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DailyReport() {
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

  const [distinctselect_station, setdistinctselect_station] = useState([]);
  const [test_station, settest_station] = useState({ test_station: "ALL" });

  const [distinctselect_product, setdistinctselect_product] = useState([]);
  const [product, setproduct] = useState({ product: "ALL" });

  const currentDate = new Date().toISOString().slice(0, 10);

  const [yesterday, setYesterdayText] = useState("");

  const [DataTableAPI, setDataTableAPI] = useState([]);
  useEffect(() => {
    fetchDataTable();
  }, []);

  const [startDate, setStartDate] = useState(
    format(subDays(new Date(), 1), "yyyy-MM-dd")
  );
  const [stopDate, setStopDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    // คำนวณวันที่ของเมื่อวาน
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // กำหนดรูปแบบของวันที่ในรูปแบบ "YYYY-MM-DD"
    const formattedYesterday = yesterday.toISOString().split("T")[0];

    // ตั้งค่าค่าที่รับมาจากการคำนวณ
    setYesterdayText(formattedYesterday);
  }, []);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // อัพเดททุก 1 วินาที

    // ทำความสะอาด interval เมื่อคอมโพเนนต์ถูก unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const options = { hour12: false };
  const formattedTime = currentTime.toLocaleTimeString("en-US", options);

  function ProgressBarCell({ value }) {
    let color;
    let textColor = "black"; // สีข้อความ

    if (value >= 99) {
      color = "#5DADE2";
    } else if (value >= 96) {
      color = "#F7DC6F";
    } else if (value >= 91) {
      color = "#F8C471";
    } else {
      color = "#EC7063";
    }

    // คำนวณค่า maxWidth ให้เท่ากับครึ่งหนึ่งของค่า value
    const maxWidth = value / 2;

    // ปรับความสูงและความหนาของเส้น Progress
    const progressStyle = {
      height: "8px", // ปรับความสูง
      borderRadius: "4px", // ปรับความหนา
    };

    return (
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <LinearProgress
          variant="determinate"
          value={Math.min(value, 100)} // ให้แน่ใจว่าค่าไม่มากกว่า 100
          sx={{
            maxWidth: `${maxWidth}%`, // ตั้งค่าความยาวของ ProgressBar
            "& .MuiLinearProgress-bar": {
              backgroundColor: color,
            },
          }} // Set the color of the progress bar
          style={{ flexGrow: 1, marginRight: "8px", ...progressStyle }}
        />
        <span style={{ color: textColor }}>{`${value}%`}</span>
      </div>
    );
  }

  useEffect(() => {
    fetchdistinctstation();
    fetchdistinctproduct();
    fetchDataTable();
  }, []);

  useEffect(() => {
    if (test_station && test_station.test_station !== "") {
      fetchdistinctproduct();
    }
  }, [test_station]);

  const columnsTable = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 100,
    //   // align: "center",
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         alignItems: "center",
    //         height: "100%",
    //       }}
    //     >
    //       {params.value}
    //     </div>
    //   ),
    // },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      // align: "center",
      renderCell: (params) => (
        <div
          style={{
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "product",
      headerName: "Product",
      width: 150,
      // align: "center",
      renderCell: (params) => (
        <div
          style={{
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "test_station",
      headerName: "Test Station",
      width: 160,
      // align: "center",
      renderCell: (params) => (
        <div
          style={{
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "fox_qty",
      headerName: "Fox Qty",
      width: 150,
      // align: "center",
      renderCell: (params) => (
        <div
          style={{
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "mes_qty",
      headerName: "MES Qty",
      width: 150,
      // align: "center",
      renderCell: (params) => (
        <div
          style={{
            alignItems: "center",
            height: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "match_rate",
      headerName: "Match Rate",
      width: 200,
      align: "center",
      renderCell: (params) => <ProgressBarCell value={params.value} />,
    },
  ];
  // ################################################### FETCH DATA ######################################################
  const fetchDataTable = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_foxsystem_daily_report
        }/TableData`,
        {
          params: {
            test_station: test_station.test_station,
            product: product.product,
            startdate: startDate,
            stopdate: stopDate,
          },
        }
      );
      const jsonData = response.data;
      console.log("Report Table");
      console.log(jsonData);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setDataTableAPI(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchdistinctstation = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_foxsystem_daily_report
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
          import.meta.env.VITE_Table_foxsystem_daily_report
        }/distinct_product?test_station=${
          test_station.test_station
        }&startdate=${startDate}&stopdate=${stopDate}`
      );
      const jsonData = await response.json();
      console.log("Product");
      setdistinctselect_product(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ############################################### HANDLE ###########################################################

  const handleStationChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      settest_station({ test_station: "ALL" });
      setproduct({ product: "ALL" });
    } else {
      settest_station(newvalue);
      // setproduct({ product: "ALL" });
    }
  };

  const handleProductChange = (event, newvalue) => {
    if (newvalue === null) {
      setproduct({ product: "ALL" });
    } else {
      setproduct(newvalue);
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
    if (
      test_station &&
      test_station.test_station !== "" &&
      product &&
      product.product !== ""
    ) {
      fetchDataTable();
    }
  }, [test_station, product, startDate, stopDate]);

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
              size="small"
              options={distinctselect_station}
              getOptionLabel={(option) => option && option.test_station}
              value={test_station}
              onChange={handleStationChange}
              sx={{ width: "100%", display: "inline-block" }}
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
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            <Autocomplete
              size="small"
              options={distinctselect_product}
              getOptionLabel={(option) => option && option.product}
              value={product}
              onChange={handleProductChange}
              sx={{ width: "100%", display: "inline-block" }}
              renderInput={(params) => (
                <TextField {...params} label="Product" variant="outlined" />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              <div>
                <span style={{ fontWeight: "bold" }}>
                  Report Time : {currentDate} {formattedTime}
                </span>{" "}
              </div>
            </Alert>

            <Alert severity="info">
              <div>
                <span style={{ fontWeight: "bold" }}>
                  Report Data Time : {yesterday} 00:00:00 - {yesterday} 23:59:59
                </span>{" "}
              </div>
            </Alert>
          </Stack>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={8} lg={8} xl={8}></Grid> */}
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <Item>
            <Box sx={{ height: 800, width: "100%" }}>
              <DataGrid
                rows={DataTableAPI}
                columns={columnsTable}
                pagination
                getRowHeight={() => "auto"}
                pageSize={5}
                sx={{ height: 800, maxWidth: "100%", marginTop: 2 }}
                slots={{
                  toolbar: GridToolbar,
                }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
              />
            </Box>
          </Item>
        </Grid>
      </Grid>
      {/* </Container> */}
      {/* </Main> */}
    </ThemeProvider>
  );
}
