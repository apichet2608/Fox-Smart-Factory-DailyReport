import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Appbarcomponents from "./Components/Common/Appbar/AppbarComponents";
import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Css/ContainerMain.css";
import DailyReport from "./Pages/Daily_Report/daily_report";
import DailyReportByLot from "./Pages/Page_Daily_Report_bylot/Daily_Report_bylot";
// import HoldingTimeSummary from "./Pages/Page-Holding-time-summary/Holding-time";
import Page1 from "./Pages/page-proces-output/Page1";
import Page2 from "./Pages/Page-yield-and-defect/Page2";
import Page4 from "./Pages/Page-defect-sending/Page4";
import Page5 from "./Pages/Page-posting/Page5";
import Page6 from "./Pages/Page-output-summary/Page6";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default function PersistentDrawerLeft() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <Appbarcomponents />
        {/* <ThemeProvider theme={theme}> */}
        {/* <Main open={open}> */}
        <Main open={open}>
          {/* <CssBaseline /> */}
          <Container className="custom-container">
            <>
              <Routes>
                <Route
                  path="/daily-report"
                  element={
                    <>
                      <DailyReport />
                    </>
                  }
                />
                <Route
                  path="/daily-report-bylot"
                  element={
                    <>
                      <DailyReportByLot />
                    </>
                  }
                />
                <Route path="/proces-output" element={<Page1 />} />
                <Route path="/yield-and-defect" element={<Page2 />} />
                {/* <Route path="/defect-sending" element={<Page4 />} /> */}
                <Route path="/posting" element={<Page5 />} />
                <Route path="/output-summary" element={<Page6 />} />
              </Routes>
            </>
          </Container>
        </Main>
        {/* </ThemeProvider> */}
      </Box>
    </Router>
  );
}
