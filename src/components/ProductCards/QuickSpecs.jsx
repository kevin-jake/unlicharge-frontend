import { Grid, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

const QuickSpecs = () => {
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
          columns: 2,
        }}
      >
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest" />
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
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="test" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default QuickSpecs;
