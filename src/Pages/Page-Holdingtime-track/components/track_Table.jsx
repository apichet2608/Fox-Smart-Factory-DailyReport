import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function TrackTable({ datafromAPI_track }) {
  const [DataTableAPI_track, setDataTableAPI_track] = useState([]);

  useEffect(() => {
    // Make an API request and fetch dataz
    console.log(datafromAPI_track);
    if (datafromAPI_track && datafromAPI_track.length > 0) {
      setDataTableAPI_track(datafromAPI_track);
    } else {
      setDataTableAPI_track([]);
    }
  }, [datafromAPI_track]);

  function formatdatewithtime(date) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Date(date).toLocaleString(undefined, options);
    return formattedDate;
  }

  const columns = [
    {
      field: "create_date",
      headerName: "Create Date",
      width: 190,
      renderCell: (params) => {
        return formatdatewithtime(params.row.create_date);
      },
    },
    {
      field: "unit_serial_number",
      headerName: "Unit Serial Number",
      width: 200,
    },
    { field: "lot_no", headerName: "Lot No", width: 120 },
    { field: "product_name", headerName: "Product", width: 150 },
    {
      field: "pre_bake_in_time",
      headerName: "pre_bake_in_time",
      width: 185,
      renderCell: (params) => {
        return formatdatewithtime(params.row.pre_bake_in_time);
      },
    },
    {
      field: "pre_bake_out_time",
      headerName: "pre_bake_out_time",
      width: 185,
      renderCell: (params) => {
        return formatdatewithtime(params.row.pre_bake_out_time);
      },
    },
    {
      field: "aoi_time",
      headerName: "AOI Time",
      width: 185,
      renderCell: (params) => {
        return formatdatewithtime(params.row.aoi_time);
      },
    },
    {
      field: "plasma_create_time",
      headerName: "Plasms Create Time",
      width: 185,
      renderCell: (params) => {
        return formatdatewithtime(params.row.plasma_create_time);
      },
    },
    {
      field: "fin_gate_create_time",
      headerName: "fin_Gate",
      width: 185,
      renderCell: (params) => {
        return formatdatewithtime(params.row.fin_gate_create_time);
      },
    },
    {
      field: "pack_create_time",
      headerName: "Pack Create Time",
      width: 185,
      renderCell: (params) => {
        if (params.row.pack_create_time != null) {
          return formatdatewithtime(params.row.pack_create_time);
        }

        return "";
      },
    },

    {
      field: "update_date",
      headerName: "Update_date",
      width: 185,
      renderCell: (params) => {
        return formatdatewithtime(params.row.update_date);
      },
    },
    {
      field: "spi_time",
      headerName: "SPI Time",
      width: 200,
      renderCell: (params) => {
        return formatdatewithtime(params.row.spi_time);
      },
    },
    {
      field: "test_27_check",
      headerName: "Test_27",
      width: 80,
      renderCell: (params) => {
        let icon;
        let iconStyle = {
          width: "16px",
          height: "16px",
          display: "block",
          margin: "0 auto",
        };

        if (params.value === false) {
          icon = (
            <ErrorIcon
              style={{
                color: "#EC7063",
                ...iconStyle,
              }}
            />
          );
        } else if (params.value === true) {
          icon = (
            <CheckCircleIcon
              style={{
                color: "#52BE80",
                ...iconStyle,
              }}
            />
          );
        } else if (params.value === null) {
          icon = (
            <RemoveCircleIcon
              style={{
                color: "#CCD1D1",
                ...iconStyle,
              }}
            />
          );
        }

        return <div style={{ textAlign: "center" }}>{icon}</div>;
      },
    },

    {
      field: "test_39_check",
      headerName: "Test_39",
      width: 80,
      renderCell: (params) => {
        if (params.value === false) {
          return (
            <ErrorIcon
              style={{
                color: "#EC7063",
                width: "16px",
                height: "16px",
              }}
            />
          );
        } else if (params.value === true) {
          return (
            <CheckCircleIcon
              style={{
                color: "#52BE80",
                width: "16px",
                height: "16px",
              }}
            />
          );
        } else if (params.value === null) {
          return (
            <RemoveCircleIcon
              style={{
                color: "#CCD1D1",
                width: "16px",
                height: "16px",
              }}
            />
          );
        }

        return null;
      },
    },
    {
      field: "test_74_check",
      headerName: "Test_74",
      width: 80,
      renderCell: (params) => {
        if (params.value === false) {
          return (
            <ErrorIcon
              style={{
                color: "#EC7063",
                width: "16px",
                height: "16px",
              }}
            />
          );
        } else if (params.value === true) {
          return (
            <CheckCircleIcon
              style={{
                color: "#52BE80",
                width: "16px",
                height: "16px",
              }}
            />
          );
        } else if (params.value === null) {
          return (
            <RemoveCircleIcon
              style={{
                color: "#CCD1D1",
                width: "16px",
                height: "16px",
              }}
            />
          );
        }

        return null;
      },
    },
    {
      field: "pause_time_before_plsma",
      headerName: "Pause time Before",
      width: 150,
    },
    {
      field: "pause_time_after_plsma",
      headerName: "Pause time After",
      width: 150,
    },
    { field: "packing_group", headerName: "Packing Group", width: 150 },
  ];
  return (
    <Box sx={{ height: 730, width: "100%" }}>
      <DataGrid
        rows={DataTableAPI_track}
        columns={columns}
        pagination
        getRowHeight={() => "auto"}
        pageSize={5}
        sx={{ height: 730, maxWidth: "100%", marginTop: 2 }}
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
  );
}
