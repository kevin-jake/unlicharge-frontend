import { North, South } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSort, setSort } from "../store/slices/products/productSlice";

const SortFilter = ({ isComputedSpecsShown, refetch }) => {
  const sort = useSelector(selectSort);
  const dispatch = useDispatch();
  const category = useSelector(({ product }) => product.category);
  const { palette } = useTheme();
  const { sortBy, sortArrangement } = sort || {};
  let menuItemsArray = [
    {
      value: "name",
      label: "Name",
    },
    {
      value: category === "battery" ? "pricePerPc" : "price",
      label: "Price",
    },
  ];
  if (category === "battery") {
    menuItemsArray.push({
      value: "capacity",
      label: "Capacity",
    });
    if (isComputedSpecsShown) {
      menuItemsArray.push(
        {
          value: "totalPrice",
          label: "Total Price",
        },
        {
          value: "totalCapacity",
          label: "Total Capacity",
        },
        {
          value: "totalQty",
          label: "Total Quantity",
        }
      );
    }
  }

  const menuItems = menuItemsArray.map((menuItem) => (
    <MenuItem key={menuItem.value} value={menuItem.value}>
      {menuItem.label}
    </MenuItem>
  ));

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
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="sort-by">Sort by:</InputLabel>
        <Select
          labelId="sort-by"
          value={sortBy}
          label="Sort by:"
          onChange={(e) => {
            dispatch(setSort({ ...sort, sortBy: e.target.value }));
            refetch();
          }}
          id="sort-by-select"
        >
          {menuItems}
        </Select>
      </FormControl>
      <IconButton
        aria-label="delete"
        size="small"
        sx={{ mr: 1, my: 1 }}
        onClick={() => {
          dispatch(
            setSort({
              ...sort,
              sortArrangement: sortArrangement === "asc" ? "desc" : "asc",
            })
          );
          refetch();
        }}
      >
        {sortArrangement === "asc" && (
          <>
            <North fontSize="inherit" />
            <Typography variant="caption">ASC</Typography>
          </>
        )}
        {sortArrangement === "desc" && (
          <>
            <South fontSize="inherit" />
            <Typography variant="caption">DESC</Typography>
          </>
        )}
      </IconButton>
    </Box>
  );
};

export default SortFilter;
