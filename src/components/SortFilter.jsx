import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import React from "react";

const SortFilter = () => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        padding: "0.25rem",
        marginRight: "0.25rem",
        backgroundColor: palette.background.alt,
        borderRadius: 0,
        display: "flex",
        height: "100%",
      }}
      flexItem
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="sort-by">Sort by:</InputLabel>
        <Select
          labelId="sort-by"
          value={""}
          label="Sort by:"
          id="sort-by-select"
        >
          <MenuItem value={10}>Price</MenuItem>
          <MenuItem value={20}>Capacity</MenuItem>
          <MenuItem value={30}>Name</MenuItem>
          <MenuItem value={10}>Total Price</MenuItem>
          <MenuItem value={20}>Total Capacity</MenuItem>
          <MenuItem value={30}>Quantity</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortFilter;
