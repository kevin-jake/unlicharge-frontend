import React from "react";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// TODO: Add units on the values in the specs

const SpecsTable = ({ specs, modalDetails }) => {
  const properties = Object.getOwnPropertyNames(specs);
  const cardDisplay = [
    "name",
    "id",
    "model",
    "price_per_pc",
    "voltage",
    "price",
    "balance_current",
    "min_voltage",
    "max_voltage",
    "supplier",
    "publish_status",
    "createdAt",
    "image_url",
  ];
  const modalDisplay = ["name", "id", "createdAt", "image_url"];

  const format = (string) => {
    var cleanString = string.replaceAll("_", " ");
    return cleanString.charAt(0).toUpperCase() + cleanString.slice(1);
  };

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
              ((modalDetails && !modalDisplay.includes(prop)) ||
                !cardDisplay.includes(prop)) && (
                <TableRow
                  key={prop}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {format(prop)}
                  </TableCell>
                  <TableCell align="right">
                    {prop === "supplier" ? (
                      <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        href={specs[prop]}
                        underline="none"
                      >
                        Buy here
                      </Link>
                    ) : (
                      specs[prop]
                    )}
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpecsTable;
