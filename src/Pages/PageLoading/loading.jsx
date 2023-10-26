import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

const LoadingPage = () => {
  return (
    <Box>
      <LinearProgress />
    </Box>
    // <Box
    //   sx={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     paddingTop: 35,
    //   }}
    // >
    //   {/* <CircularProgress size={80} color="primary" /> */}
    //   <LinearProgress size={80} color="primary" />
    // </Box>
  );
};

export default LoadingPage;
