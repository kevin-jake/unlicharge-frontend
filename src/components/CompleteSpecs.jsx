import { Grid, List, ListItem, ListItemText, useTheme } from "@mui/material";
import React from "react";

const CompleteSpecs = () => {
  const { palette } = useTheme();
  return (
    <Grid item zeroMinWidth>
      <List
        dense
        sx={{
          "& span": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "inline-block",
            whiteSpace: "nowrap",
            width: "-webkit-fill-available",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          },
          "& .MuiListItemText-primary": {
            color: palette.grey[500],
          },
          "& .MuiListItemText-secondary": {
            color: palette.neutral.dark,
          },
          columns: 2,
        }}
      >
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="Battery Type" secondary="test2" />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="Brand" secondary="test2" />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="test" />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="test" />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="test" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default CompleteSpecs;
