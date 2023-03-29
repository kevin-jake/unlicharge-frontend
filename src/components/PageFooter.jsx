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

const PageFooter = ({ page = 1, total, limit = 1, setPagination, isShown }) => {
  const pageNumbers = Math.ceil(total / limit);
  const handlePageChange = (event, value) => {
    setPagination(value, limit);
  };
  const handleLimitChange = (event) => {
    setPagination(page, event.target.value);
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
                {/* FIXME: For testing purposes*/}
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                {/* FIXME: For testing purposes*/}

                <MenuItem value={5}>5</MenuItem>
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
