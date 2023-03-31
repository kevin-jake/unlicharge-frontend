import { Grid, List, ListItem, ListItemText, useTheme } from "@mui/material";
import React from "react";
import { specDisplay, specWithUnit } from "../../util/specDisplayFormat";

const toNotDisplay = ["totalPrice", "totalQty", "totalCapacity"];

const QuickSpecsList = ({ computedSpecs }) => {
  const { palette } = useTheme();
  const specsProperties = Object.keys(computedSpecs);
  let filteredSpecs = specsProperties.filter(
    (specProp) => !toNotDisplay.includes(specProp)
  );

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
            color: palette.neutral.main,
          },
          "& .MuiListItemText-secondary": {
            color: palette.neutral.dark,
          },
          columns: 2,
        }}
      >
        {Boolean(computedSpecs.totalSeries) &&
          Boolean(computedSpecs.totalParallel) && (
            <ListItem
              sx={{
                display: "list-item",
                pageBreakInside: "avoid",
                "& span": {
                  whiteSpace: "normal",
                },
              }}
            >
              <ListItemText
                primary="Battery Configuration"
                secondary={`${computedSpecs.totalSeries}S ${computedSpecs.totalParallel}P`}
              />
            </ListItem>
          )}
        {filteredSpecs.map(
          (specName) =>
            Boolean(computedSpecs[specName]) && (
              <ListItem
                key={specName}
                sx={{
                  display: "list-item",
                  pageBreakInside: "avoid",
                  "& span": {
                    whiteSpace: "normal",
                  },
                }}
              >
                <ListItemText
                  primary={specDisplay(specName)}
                  secondary={specWithUnit(specName, computedSpecs[specName])}
                />
              </ListItem>
            )
        )}
      </List>
    </Grid>
  );
};

export default QuickSpecsList;
