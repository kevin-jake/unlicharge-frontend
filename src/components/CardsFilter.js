import { North, Search, South } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const CardsFilter = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ display: "inline-flex" }}>
        <TextField id="sort-field" size="small" select label="Sort by">
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </TextField>
        <IconButton aria-label="delete" size="small" sx={{ mr: 1, my: 1 }}>
          <North fontSize="inherit" />
          <Typography variant="caption">ASC</Typography>
        </IconButton>
        <IconButton aria-label="delete" size="small" sx={{ mr: 1, my: 1 }}>
          <South fontSize="inherit" />
          <Typography variant="caption">DESC</Typography>
        </IconButton>
      </Box>

      <TextField
        size="small"
        id="outlined-search"
        label="Search"
        type="search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CardsFilter;
