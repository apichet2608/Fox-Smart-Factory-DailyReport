import * as React from "react";
import { styled } from "@mui/material/styles";

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
              //   value={startDate}
              //   onChange={handleStartDateChange}
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
              //   value={stopDate}
              //   onChange={handleStopDateChange}
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
