import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Plot1 from "./Components/plot1";
import Plot2 from "./Components/plot2";
import Plot3 from "./Components/plot3";
import Plot4 from "./Components/plot4";
// import Page2 from "../Page3";
import Bartop5date3 from "./Components/bar-chart-h-top5-date-select";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const columns = [
  // { field: "id", headerName: "ID", width: 100 },
  {
    field: "production_date",
    headerName: "Production Date",
    width: 150,
    valueFormatter: (params) => format(new Date(params.value), "yyyy-MM-dd"), // รูปแบบ "YYYY:MM:DD HH:MM:SS"
  },
  { field: "sendresultdetails_product", headerName: "Product", width: 100 },
  { field: "test15_spi_ky", headerName: "Test15(SPI) Yield", width: 150 },
  {
    field: "test15_spi_ky_total_count",
    headerName: "Test15 Output",
    width: 120,
  },
  {
    field: "test15_spi_ky_result_pass",
    headerName: "Test15 Pass",
    width: 120,
  },
  {
    field: "test15_spi_ky_result_fail",
    headerName: "Test15 Fail",
    width: 120,
  },

  {
    field: "test15_spi_ckd",
    headerName: "Test15(CKD) Yield",
    width: 120,
  },
  {
    field: "test15_spi_ckd_total_count",
    headerName: "Test15(CKD) Output",
    width: 120,
  },
  {
    field: "test15_spi_ckd_result_pass",
    headerName: "Test15(CKD) Pass",
    width: 120,
  },
  {
    field: "test15_spi_ckd_result_fail",
    headerName: "Test15(CKD) Fail",
    width: 120,
  },

  { field: "test18_aoi", headerName: "Test18(AOI) Yield", width: 150 },
  {
    field: "test18_aoi_total_count",
    headerName: "Test18 Output",
    width: 120,
  },
  {
    field: "test18_aoi_result_pass",
    headerName: "Test18 Pass",
    width: 120,
  },
  {
    field: "test18_aoi_result_fail",
    headerName: "Test18 Fail",
    width: 120,
  },
  { field: "test12_xray", headerName: "Test12(X-ray) Yield", width: 150 },
  {
    field: "test12_xray_total_count",
    headerName: "Test12 Output",
    width: 120,
  },
  {
    field: "test12_xray_result_pass",
    headerName: "Test12 Pass",
    width: 120,
  },
  {
    field: "test12_xray_result_fail",
    headerName: "Test12 Fail",
    width: 120,
  },
  { field: "iqc_flex3_et", headerName: "IQC-Flex3(ET) Yield", width: 150 },
  {
    field: "iqc_flex3_et_total_count",
    headerName: "ET Output",
    width: 120,
  },
  {
    field: "iqc_flex3_et_result_pass",
    headerName: "ET Pass",
    width: 120,
  },
  {
    field: "iqc_flex3_et_result_fail",
    headerName: "ET Fail",
    width: 120,
  },
  {
    field: "test21_avi_percent_yield",
    headerName: "Test21(AVI) Yield",
    width: 150,
  },
  {
    field: "test21_avi_total_count",
    headerName: "Test21 Output",
    width: 120,
  },
  {
    field: "test21_avi_result_pass",
    headerName: "Test21 Pass",
    width: 120,
  },
  {
    field: "test21_avi_result_fail",
    headerName: "Test21 Fail",
    width: 120,
  },
  {
    field: "test27_holding_time",
    headerName: "Test27(HT:SPI-REF) Yield",
    width: 200,
  },
  {
    field: "test27_holding_time_total_count",
    headerName: "Test27 Output",
    width: 120,
  },
  {
    field: "test27_holding_time_result_pass",
    headerName: "Test27 Pass",
    width: 120,
  },
  {
    field: "test27_holding_time_result_fail",
    headerName: "Test 27 Fail",
    width: 120,
  },
  {
    field: "test39_holding_time",
    headerName: "Test39(HT:BAK-PAK) Yield",
    width: 200,
  },
  {
    field: "test39_holding_time_total_count",
    headerName: "Test39 Output",
    width: 120,
  },
  {
    field: "test39_holding_time_result_pass",
    headerName: "Test39 Pass",
    width: 120,
  },
  {
    field: "test39_holding_time_result_fail",
    headerName: "Test39 Fail",
    width: 120,
  },
  {
    field: "test74_holding_time",
    headerName: "Test74(HT:PLSM-PAK) Yield",
    width: 200,
  },
  {
    field: "test74_holding_time_total_count",
    headerName: "Test74 Output",
    width: 120,
  },
  {
    field: "test74_holding_time_result_pass",
    headerName: "Test74 Pass",
    width: 120,
  },
  {
    field: "test74_holding_time_result_fail",
    headerName: "Test 74 Fail",
    width: 120,
  },
  { field: "test13_oqc_fai", headerName: "Test13(OQC-FAI) Yield", width: 180 },
  {
    field: "test13_oqc_fai_total_count",
    headerName: "Test13 Output",
    width: 120,
  },
  {
    field: "test13_oqc_fai_result_pass",
    headerName: "Test13 Pass",
    width: 120,
  },
  {
    field: "test13_oqc_fai_result_fail",
    headerName: "Test13 Fail",
    width: 120,
  },
  { field: "test42_oqc_et", headerName: "Test42(OQC-ET) Yield", width: 180 },
  {
    field: "test42_oqc_et_total_count",
    headerName: "Test42 Output",
    width: 120,
  },
  {
    field: "test42_oqc_et_result_pass",
    headerName: "Test42 Pass",
    width: 120,
  },
  {
    field: "test42_oqc_et_result_fail",
    headerName: "Test42 Fail",
    width: 120,
  },
];

const columns_fix = [
  // { field: "id", headerName: "ID", width: 100 },
  {
    field: "production_date",
    headerName: "Production Date",
    width: 150,
    valueFormatter: (params) => format(new Date(params.value), "yyyy-MM-dd"), // รูปแบบ "YYYY:MM:DD HH:MM:SS"
  },
  { field: "sendresultdetails_product", headerName: "Product", width: 100 },
  { field: "lss_lot_no", headerName: "Lot no", width: 100 },

  { field: "percent_yield", headerName: "%Yield", width: 250 },
  {
    field: "total_count",
    headerName: "Total",
    width: 250,
  },
  {
    field: "result_pass",
    headerName: "Pass",
    width: 250,
  },
  {
    field: "result_fail",
    headerName: "Fail",
    width: 250,
  },
];

export default function QuantitySelect() {
  const [dataday, setDataday] = useState([]);
  const [datamonth, setDatamonth] = useState([]);
  const [dataweek, setDataweek] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // New state variable
  const [selectedDateoriginal, setSelectedDateoriginal] = useState(null); // New state variable
  const [selectedMonth, setSelectedMonth] = useState(null); // New state variable
  const [selectedWeek, setSelectedWeek] = useState(null); // New state variable
  const [selecteddataday, setSelectedDataday] = useState([]);
  const [selecteddatamonth, setSelectedDatamonth] = useState([]);
  const [selecteddataweek, setSelectedDataweek] = useState([]);

  const fetchData = async () => {
    try {
      if (selectedHeadTable && selectedProduct) {
        const params = {
          process: selectedHeadTable.station_process,
          product: selectedProduct.sendresultdetails_product,
        };

        const responsedataday = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_defect
          }/fix-process-product-day`,
          { params }
        );
        const monthNames = {
          Jan: "Jan",
          Feb: "Feb",
          Mar: "Mar",
          Apr: "Apr",
          May: "May",
          Jun: "Jun",
          Jul: "Jul",
          Aug: "Aug",
          Sep: "Sep",
          Oct: "Oct",
          Nov: "Nov",
          Dec: "Dec",
        };

        const dataday = responsedataday.data.map((item) => ({
          ...item,
          date: new Date(item.date)
            .toLocaleDateString("en-CA", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
            .replace(
              /(\w+) (\d+), (\d+)/,
              (_, month, day, year) => `${year}-${monthNames[month]}-${day}`
            ),
        }));
        const responsedatamonth = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_defect
          }/fix-process-product-month`,
          { params }
        );
        const datamonth = responsedatamonth.data;
        const responsedataweek = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_defect
          }/fix-process-product-week`,
          { params }
        );
        const dataweek = responsedataweek.data;

        setDataday(dataday);
        console.log(dataday);
        // คำนวณค่า index สุดท้ายในรายการ dataday
        // const lastIndex = dataday.length - 1;

        // setSelectedDate(dataday[lastIndex]?.date); // กำหนดค่า selectedDate เป็นค่า index สุดท้าย
        setDatamonth(datamonth);
        setDataweek(dataweek);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // ...previous imports and code...
  const fetchData2 = async () => {
    try {
      if (selectedHeadTable && selectedProduct && selectedDateoriginal) {
        const params = {
          process: selectedHeadTable.station_process,
          product: selectedProduct.sendresultdetails_product,
          date: selectedDateoriginal,
        };

        const responsedataday = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_defect
          }/fix-process-product-day-select`,
          { params }
        );
        const datadayselectday = responsedataday.data;
        setSelectedDataday(datadayselectday);
        // const lastIndex = dataday.length - 1;

        // setSelectedDate(dataday[lastIndex]?.date); // กำหนดค่า selectedDate เป็นค่า index สุดท้าย

        console.log(datadayselectday);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      if (selectedHeadTable && selectedProduct && selectedMonth) {
        const params = {
          process: selectedHeadTable.station_process,
          product: selectedProduct.sendresultdetails_product,
          month: selectedMonth,
        };

        const responsedatamonth = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_defect
          }/fix-process-product-month-select`,
          { params }
        );
        const datadayselectmonth = responsedatamonth.data;
        setSelectedDatamonth(datadayselectmonth);
        console.log(datadayselectmonth);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      if (selectedHeadTable && selectedProduct && selectedWeek) {
        const params = {
          process: selectedHeadTable.station_process,
          product: selectedProduct.sendresultdetails_product,
          week: selectedWeek,
        };

        const responsedataweek = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_defect
          }/fix-process-product-week-select`,
          { params }
        );
        const datadayselectweek = responsedataweek.data;
        setSelectedDataweek(datadayselectweek);
        console.log(datadayselectweek);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ...rest of the code...

  const convertToDate = (selectedDate) => {
    const parts = selectedDate.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const monthMap = {
      Jan: "1",
      Feb: "2",
      Mar: "3",
      Apr: "4",
      May: "5",
      Jun: "6",
      Jul: "7",
      Aug: "8",
      Sep: "9",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const formattedMonth = monthMap[month];
    const formattedDay = parseInt(day, 10).toString();

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const handleExportCSV = () => {
    let csvData;
    if (selectedHeadTable && selectedHeadTable.station_process === "ALL") {
      const csv = Papa.unparse(rows); // Convert rows to CSV
      csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    } else {
      const csv = Papa.unparse(rows2); // Convert rows to CSV
      csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    }
    const currentTimestamp = new Date();
    const formattedTimestamp = format(
      currentTimestamp,
      "yyyy-MM-dd HH-mm-ss-SSS"
    );
    const fileName = `output_summary_${selectedHeadTable.station_process}_${formattedTimestamp}.csv`;
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", fileName);
    tempLink.click();
  };

  const [rows, setRows] = React.useState([]); // State for rows data
  const [rows2, setRows2] = React.useState([]); // State for rows data
  const [distinctProduct, setDistinctProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Call your API endpoint to fetch data
        const response = await fetch(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_summary_bylot
          }/distinct-product`
        );
        const data = await response.json();

        // Update the rows state with the fetched data
        setDistinctProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run the effect only once.

  const [distinctHeadTable, setdistinctHeadTable] = useState([]);
  const [selectedHeadTable, setSelectedHeadTable] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [stopDate, setStopDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  React.useEffect(() => {
    // fetchData();
    fetchData2();
  }, [
    selectedHeadTable,
    selectedProduct,
    selectedDateoriginal,
    selectedMonth,
    selectedWeek,
  ]);

  React.useEffect(() => {
    fetchDatax();
  }, [selectedHeadTable, selectedProduct]);
  const fetchDatax = async () => {
    try {
      if (selectedHeadTable && selectedProduct) {
        const params = {
          process: selectedHeadTable.station_process,
          product: selectedProduct.sendresultdetails_product,
        };

        const responsedataday = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_defect
          }/fix-process-product-day`,
          { params }
        );
        const monthNames = {
          Jan: "Jan",
          Feb: "Feb",
          Mar: "Mar",
          Apr: "Apr",
          May: "May",
          Jun: "Jun",
          Jul: "Jul",
          Aug: "Aug",
          Sep: "Sep",
          Oct: "Oct",
          Nov: "Nov",
          Dec: "Dec",
        };

        const dataday = responsedataday.data.map((item) => ({
          ...item,
          date: new Date(item.date)
            .toLocaleDateString("en-CA", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
            .replace(
              /(\w+) (\d+), (\d+)/,
              (_, month, day, year) => `${year}-${monthNames[month]}-${day}`
            ),
        }));
        const responsedatamonth = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_defect
          }/fix-process-product-month`,
          { params }
        );
        const datamonth = responsedatamonth.data;
        const responsedataweek = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_json_backup_header_defect
          }/fix-process-product-week`,
          { params }
        );
        const dataweek = responsedataweek.data;

        setDataday(dataday);
        setDatamonth(datamonth);
        setDataweek(dataweek);
        console.log(datamonth);
        console.log(dataweek);
        console.log(dataday);

        // คำนวณค่า index สุดท้ายในรายการ dataday
        const lastIndexday = dataday.length - 1;
        const lastIndexmonth = datamonth.length - 1;
        const lastIndexweek = dataweek.length - 1;

        // setSelectedDate(dataday[lastIndexday]?.date); // กำหนดค่า selectedDate เป็นค่า index สุดท้าย
        // setSelectedDatamonth(datamonth[lastIndexmonth]?.month); // กำหนดค่า selectedDate เป็นค่า index สุดท้าย
        // setSelectedDataweek(dataweek[lastIndexweek]?.week); // กำหนดค่า selectedDate เป็นค่า index สุดท้าย
        console.log(dataday[lastIndexday]?.date);
        console.log(datamonth[lastIndexmonth]?.month);
        console.log(dataweek[lastIndexweek]?.week);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_summary_bylot
          }/distinct-station_process`,
          {
            params: {
              product: selectedProduct.sendresultdetails_product,
            },
          }
        );
        const data = response.data;
        const distinctData = [...data, { station_process: "ALL" }];
        console.log(data);
        setdistinctHeadTable(distinctData);
      } catch (error) {
        console.log("Error fetching data from API:", error);
      }
    };

    if (setSelectedProduct != null) {
      fetchData1();
    }
  }, [selectedProduct]);

  React.useEffect(() => {
    const fetchData1 = async () => {
      try {
        let url;
        let params = {
          startdate: startDate,
          stopdate: stopDate,
          product: selectedProduct.sendresultdetails_product,
        };

        if (selectedHeadTable.station_process === "ALL") {
          url = `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_summary_bylot
          }/data-all`;
        } else {
          url = `${import.meta.env.VITE_IP_API_OLD}${
            import.meta.env.VITE_foxsystem_summary_bylot
          }/data-fix`;
          params.process = selectedHeadTable.station_process;
        }

        const response = await axios.get(url, { params });
        const data = response.data;
        console.log(data);

        if (selectedHeadTable.station_process === "ALL") {
          setRows(data);
        } else {
          setRows2(data);
        }
      } catch (error) {
        console.log("Error fetching data from API:", error);
      }
    };

    if (selectedProduct !== null && startDate !== "" && stopDate !== "") {
      fetchData1();
    }
  }, [selectedProduct, startDate, stopDate, selectedHeadTable]);

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

  const handleProductChange = (event, newValue) => {
    console.log(newValue);
    setSelectedProduct(newValue);
  };
  const handleHeadTableChange = (event, newValue) => {
    console.log(newValue);
    setSelectedHeadTable(newValue);
  };

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Container maxWidth={maxWidth}>
        {/* <Container fixed> */}

        <Grid container spacing={2}>
          <Grid item xl={2.5}>
            <Item>
              <Autocomplete
                options={distinctProduct}
                getOptionLabel={(option) =>
                  option && option.sendresultdetails_product
                }
                value={selectedProduct}
                onChange={handleProductChange}
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
          <Grid item xl={2.5}>
            <Item>
              <Autocomplete
                options={distinctHeadTable}
                getOptionLabel={(option) => option && option.station_process}
                value={selectedHeadTable}
                onChange={handleHeadTableChange}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Process"
                    variant="outlined"
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xl={2}>
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
          <Grid item xl={2}>
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
          <Grid item xl={2}>
            <Button variant="outlined" onClick={handleExportCSV}>
              Export CSV
            </Button>
          </Grid>

          <Grid item xl={6}>
            {selectedHeadTable &&
              selectedHeadTable.station_process === "ALL" && (
                <Item>
                  <Grid item xl={6}>
                    <Plot1 data={rows} titles="TEST" />
                  </Grid>
                </Item>
              )}
          </Grid>
          <Grid item xl={6}>
            {selectedHeadTable &&
              selectedHeadTable.station_process === "ALL" && (
                <Item>
                  <Grid item xl={6}>
                    <Plot2 data={rows} titles="TEST" />
                  </Grid>
                </Item>
              )}
          </Grid>

          <Grid item xl={6}>
            {selectedHeadTable &&
              selectedHeadTable.station_process !== "ALL" && (
                <Item>
                  <Grid item xl={6}>
                    <Plot3 data={rows2} titles="TEST" />
                  </Grid>
                </Item>
              )}
          </Grid>
          <Grid item xl={6}>
            {selectedHeadTable &&
              selectedHeadTable.station_process !== "ALL" && (
                <Item>
                  <Grid item xl={6}>
                    <Plot4 data={rows2} titles="TEST" />
                  </Grid>
                </Item>
              )}
          </Grid>
          {/* <Grid item xl={2.5}> */}

          <Grid item xl={4}>
            <Item>
              <Autocomplete
                options={[...new Set(dataday.map((item) => item.date))].sort(
                  (a, b) => new Date(b) - new Date(a)
                )}
                value={selectedDate}
                onChange={(event, newValue) => {
                  const formattedDate = convertToDate(newValue);
                  setSelectedDateoriginal(formattedDate);
                  setSelectedDate(newValue);
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="selectedDate"
                    variant="outlined"
                  />
                )}
              />

              <Bartop5date3
                data={selecteddataday}
                title={selectedDate}
                subtitle="Date"
              />
            </Item>
          </Grid>

          <Grid item xl={4}>
            <Item>
              <Autocomplete
                options={[...new Set(dataweek.map((item) => item.week))]
                  .sort()
                  .reverse()}
                value={selectedWeek}
                onChange={(event, newValue) => {
                  setSelectedWeek(newValue);
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="selectedWeek"
                    variant="outlined"
                  />
                )}
              />

              <Bartop5date3
                data={selecteddataweek}
                title={selectedWeek}
                subtitle="Week"
              />
            </Item>
          </Grid>

          <Grid item xl={4}>
            <Item>
              <Autocomplete
                options={[...new Set(datamonth.map((item) => item.month))]
                  .sort()
                  .reverse()}
                value={selectedMonth}
                onChange={(event, newValue) => {
                  setSelectedMonth(newValue);
                  console.log(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="selectedMonth"
                    variant="outlined"
                  />
                )}
              />

              <Bartop5date3
                data={selecteddatamonth}
                title={selectedMonth}
                subtitle="Month"
              />
            </Item>
          </Grid>

          <Grid item xl={12}>
            {selectedHeadTable &&
              selectedHeadTable.station_process === "ALL" && (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pagination
                  pageSize={5}
                  // checkboxlelection
                  sx={{ height: 650, width: "100%" }}
                />
              )}
          </Grid>

          <Grid item xl={12}>
            {selectedHeadTable &&
              selectedHeadTable.station_process !== "ALL" && (
                <DataGrid
                  rows={rows2}
                  columns={columns_fix}
                  pagination
                  pageSize={5}
                  // checkboxlelection
                  sx={{ height: 650, width: "100%" }}
                />
              )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleExportCSV}>
              Export CSV
            </Button>
          </Grid>
        </Grid>
      </Container>
      {/* <Page2 /> */}
    </React.Fragment>
  );
}
