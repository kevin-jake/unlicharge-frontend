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

const PageFooter = ({ page = 1, total = 100, limit = 5, setPagination }) => {
  const pageNumbers = Math.ceil(total / limit);
  const handlePageChange = (event) => {
    setPagination(event.target.outerText, limit);
  };
  const handleLimitChange = (event) => {
    setPagination(page, event.target.value);
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Pagination
          count={pageNumbers}
          page={page}
          onChange={handlePageChange}
        />
        <FlexBetween>
          <Typography variant="caption" sx={{ margin: "0.25rem" }}>
            Page {page} of {pageNumbers}
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
            value={limit}
            label="Results per page:"
            onChange={handleLimitChange}
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
