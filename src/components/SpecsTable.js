import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const SpecsTable = ({ specs }) => {
  const properties = Object.getOwnPropertyNames(specs);
  const doNotDisplay = [
    "name",
    "id",
    "__typename",
    "price_per_pc",
    "min_voltage",
    "max_voltage",
    "supplier",
    "publish_status",
    "createdAt",
  ];

  return (
    <TableContainer>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Specs</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map(
            (prop) =>
              !doNotDisplay.includes(prop) && (
                <TableRow
                  key={prop}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {prop}
                  </TableCell>
                  <TableCell align="right">{specs[prop]}</TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpecsTable;
