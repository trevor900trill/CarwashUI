"use client";

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderLeft: "none",
          borderRight: "none",
        },
        columnHeader: {
          backgroundColor: "#265c20",
          color: "#ffffff",
        },
        columnHeaderTitle: {
          fontWeight: "bold",
        },
        sortIcon: {
          color: "#ffffff",
        },
        columnMenuIcon: {
          color: "#ffffff",
        },
        cell: {
          borderLeft: "none",
          borderRight: "none",
        },
        row: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#f5f5f5",
          },
          "&:nth-of-type(even)": {
            backgroundColor: "#ffffff",
          },
        },
      },
    },
  },
});

export default function WeeTable({ columns, rows }) {
  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination={true}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[20, 80, 120]}
        disableColumnResize
        disableColumnMenu
        autoHeight
        rowHeight={50}
      />
    </ThemeProvider>
  );
}
