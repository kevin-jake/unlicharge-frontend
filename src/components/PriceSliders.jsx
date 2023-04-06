import React from "react";
import {
  Typography,
  Slider,
  TextField,
  InputAdornment,
  Box,
  useTheme,
} from "@mui/material";
import FlexBetween from "./wrappers/FlexBetween";

const PriceSliders = ({
  minPrice,
  maxPrice,
  priceRangeValue,
  setPriceRangeValue,
}) => {
  const { palette } = useTheme();
  const medium = palette.neutral.medium;

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue);
  };

  return (
    <Box width="100%">
      <Typography marginTop="5px" color={medium} variant="h6" fontWeight="500">
        Price
      </Typography>
      <FlexBetween
        borderRadius="9px"
        marginBottom="20px"
        padding="0.1rem 1.5rem"
        flexDirection="column"
      >
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRangeValue}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          gap="0.25rem"
          flexDirection="row"
          width="100%"
        >
          <TextField
            label="Min"
            type="number"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Php</InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: "100%" }}
            value={priceRangeValue[0]}
            onChange={(e) => {
              setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
            }}
          />
          <Typography>-</Typography>

          <TextField
            label="Max"
            type="number"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            sx={{ width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Php</InputAdornment>
              ),
            }}
            value={priceRangeValue[1]}
            onChange={(e) => {
              setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
            }}
          />
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default PriceSliders;
