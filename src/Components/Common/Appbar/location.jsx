import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";

export default function MiniDrawer() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case "/":
          return "FOX Insight Data Monitoring";
        case "/proces-output":
          return "Proces-Output";
        case "/yield-and-defect":
          return "Yield-and-Defect";
        case "/defect-sending":
          return "Defect-Sending";
        case "/posting":
          return "Posting";
        case "/output-summary":
          return "Output summary";
        case "/daily-report":
          return "Daily Report";
        case "/daily-report-bylot":
          return "Data Completeness";
        case "/holding-time-track":
          return "Holding Time Track";
        default:
          return "";
      }
    };
    // /page/print
    const title = getPageTitle();
    setPageTitle(title);
  }, [location.pathname]);

  return (
    <>
      <Typography variant="h6" noWrap component="div">
        {pageTitle}
      </Typography>
    </>
  );
}
