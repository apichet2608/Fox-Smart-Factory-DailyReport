import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import On from "../../../../public/Icons/icons8-toggle-on-100.png";
import Off from "../../../../public/Icons/icons8-toggle-Off-100.png";
import TextLocation from "./location";
import Fuji from "../../../../public/Fuji.png";
import output from "../../../../public/Icons/output.png";
import defect from "../../../../public/Icons/checklist.png";
import a1 from "../../../../public/Icons/a1.png";
import statistics from "../../../../public/Icons/statistics.png";
import p1 from "../../../../public/Icons/p1.png";
import ana from "../../../../public/Icons/analyse.png";
import hledongtime from "../../../../public/Icons/on-time.png";
import ontime from "../../../../public/Icons/on-time.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <TextLocation />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img
            src={Fuji}
            alt="คำอธิบายภาพ"
            style={{
              width: 180, // กำหนดความกว้างของภาพให้เต็มขนาดของพื้นที่ที่รองรับ
              height: 45, // กำหนดความสูงของภาพให้ปรับแต่งตามอัตราส่วนต้นฉบับ
            }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <List>
          {[
            {
              text: "Proces-Output",
              path: "/proces-output",
            },
            {
              text: "Yield-and-Defect",
              path: "/yield-and-defect",
            },
            // {
            //   text: "Defect-Sending",
            //   path: "/defect-sending",
            // },
            {
              text: "Posting",
              path: "/posting",
            },
            {
              text: "Output summary",
              path: "/output-summary",
            },
            {
              text: "Daily Report",
              path: "/daily-report",
            },
            {
              text: "Data Completeness",
              path: "/daily-report-bylot",
            },
            {
              text: "Holding Time Track",
              path: "/holding-time-track",
            },
            // {
            //   text: "Holding Time",
            //   path: "/holding-time-summary",
            // },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <NavLink
                to={item.path}
                style={{ textDecoration: "none" }}
                // isActive={(match) =>
                //   match && match.url === "/Smart-Factory-Dept"
                // }
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      backgroundColor: isActive ? "#BDC3C7 " : "#E5E7E9",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0, color: "black" }}
                    />
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List> */}
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="/proces-output" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: isActive ? "#E5E7E9 " : "##BDC3C7",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img src={output} alt="Page 1" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Proces-Output"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="/yield-and-defect" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: isActive ? "#E5E7E9 " : "##BDC3C7",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img src={defect} alt="Page 1" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Yield and Defect"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="/posting" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: isActive ? "#E5E7E9 " : "##BDC3C7",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img src={p1} alt="Page 1" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Posting"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="/output-summary" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: isActive ? "#E5E7E9 " : "##BDC3C7",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img src={ana} alt="Page 1" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Output Summary"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="/daily-report" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: isActive ? "#E5E7E9 " : "##BDC3C7",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img src={statistics} alt="Page 1" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Daily Report"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="/daily-report-bylot"
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: isActive ? "#E5E7E9 " : "##BDC3C7",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img src={a1} alt="Page 1" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Data Completeness"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="/holding-time-track"
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: isActive ? "#E5E7E9 " : "##BDC3C7",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={ontime}
                      alt="Holding time track"
                      width={24}
                      height={24}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Holdoing Time Track"
                    sx={{ opacity: open ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
