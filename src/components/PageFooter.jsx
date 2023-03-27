import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import FlexBetween from "./wrappers/FlexBetween";

const PageFooter = ({ currentPage = 1, total = 100, limits = 5 }) => {
  const pageNumbers = Math.ceil(total / limits);
  const handleChange = (event) => {
    console.log(event);
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Pagination count={pageNumbers} page={currentPage} />
        <FlexBetween>
          <Typography variant="caption" sx={{ margin: "0.25rem" }}>
            Page {currentPage} of {pageNumbers}
          </Typography>
          <Divider orientation="vertical" marginX="1rem" />
          <Typography variant="caption" sx={{ margin: "0.25rem" }}>
            Total Results: {total}
          </Typography>
        </FlexBetween>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="numberOfResults-label">Results per page:</InputLabel>
          <Select
            labelId="numberOfResults-label"
            id="numberOfResults-label"
            value={limits}
            label="Results per page:"
            onChange={handleChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default PageFooter;
