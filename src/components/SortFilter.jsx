import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SortFilter = () => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="sort-by">Sort by:</InputLabel>
      <Select labelId="sort-by" value={10} label="Sort by:" id="sort-by-select">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortFilter;
