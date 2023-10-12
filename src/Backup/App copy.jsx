// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Grid from "@mui/material/Unstable_Grid2";
// import Paper from "@mui/material/Paper";
// import "./App.css";
// import Appbarcomponents from "./Components/Common/Appbar/AppbarComponents";
// import Container from "@mui/material/Container";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// export default function PersistentDrawerLeft() {
//   const theme = createTheme({
//     breakpoints: {
//       values: {
//         xs: 0, // breakpoint xs
//         sm: 600, // breakpoint sm
//         md: 960, // breakpoint md
//         lg: 1280, // breakpoint lg
//         xl: 1920, // breakpoint xl
//       },
//     },
//   });

//   return (
//     <Router>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <Appbarcomponents />
//         <ThemeProvider theme={theme}>
//           {/* <Main open={open}> */}
//           <Main open={open}>
//             <CssBaseline />
//             <Container className="custom-container">
//               <Grid container spacing={2}>
//                 <Routes>
//                   <Route path="/" element={<></>} />
//                 </Routes>
//               </Grid>
//             </Container>
//           </Main>
//         </ThemeProvider>
//       </Box>
//     </Router>
//   );
// }

// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Grid from "@mui/material/Unstable_Grid2";
// import Paper from "@mui/material/Paper";
// import "./App.css";
// import Appbarcomponents from "./Components/Common/Appbar/AppbarComponents";
// import Container from "@mui/material/Container";
// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// export default function PersistentDrawerLeft() {
//   const theme = createTheme({
//     breakpoints: {
//       values: {
//         xs: 0, // breakpoint xs
//         sm: 600, // breakpoint sm
//         md: 960, // breakpoint md
//         lg: 1280, // breakpoint lg
//         xl: 1920, // breakpoint xl
//       },
//     },
//   });

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <Appbarcomponents />
//       <ThemeProvider theme={theme}>
//         {/* <Main open={open}> */}
//         <Main open={open}>
//           <CssBaseline />
//           <Container className="custom-container">
//             <Grid container spacing={2}>
// <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
//   <Item>xl=8</Item>
// </Grid>
//               <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
//                 <Item>xl=4</Item>
//               </Grid>
//               <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
//                 <Item>xl=4</Item>
//               </Grid>
//               <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
//                 <Item>xl=8</Item>
//               </Grid>
//             </Grid>
//           </Container>
//         </Main>
//       </ThemeProvider>
//     </Box>
//   );
// }
