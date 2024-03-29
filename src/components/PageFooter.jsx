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
import React, { useEffect } from "react";
import FlexBetween from "./wrappers/FlexBetween";

const PageFooter = ({
  page,
  total,
  limit,
  setPagination,
  isShown,
  category,
}) => {
  const pageNumbers = Math.ceil(total / limit);

  useEffect(() => {
    setPagination(1, limit, total);
  }, [category]);

  const handlePageChange = (event, value) => {
    setPagination(value, limit, total);
  };
  const handleLimitChange = (event) => {
    setPagination(page, event.target.value, total);
  };
  return (
    <>
      {isShown && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Pagination
            count={pageNumbers || +page}
            page={+page}
            onChange={handlePageChange}
          />
          <FlexBetween>
            <FormControl sx={{ m: "1rem", minWidth: 120 }} size="small">
              <InputLabel id="numberOfResults-label">
                Results per page:
              </InputLabel>
              <Select
                labelId="numberOfResults-label"
                id="numberOfResults-label"
                value={limit}
                label="Results per page:"
                onChange={handleLimitChange}
              >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
            <Divider orientation="vertical" variant="middle" flexItem />

            <Typography variant="caption" sx={{ margin: "0.5rem 1rem" }}>
              Page {page} of {pageNumbers}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="caption" sx={{ margin: "0.5rem 1rem" }}>
              Total Results: {total}
            </Typography>
          </FlexBetween>
        </Box>
      )}
    </>
  );
};

export default PageFooter;
