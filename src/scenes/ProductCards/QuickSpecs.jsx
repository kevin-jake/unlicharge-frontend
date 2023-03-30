import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";
import { specDisplay, specWithUnit } from "../../util/specDisplayFormat";

const toDisplay = [
  "type",
  "brand",
  "capacity",
  "nominalVoltage",
  "supplierLink",
];

const QuickSpecs = ({ specs, openModal }) => {
  const { palette } = useTheme();

  const specsProperties = Object.keys(specs);
  const filteredSpecs = specsProperties.filter((specProp) =>
    toDisplay.includes(specProp)
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
            whiteSpace: "normal",
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
          cursor: "pointer",
        }}
        onClick={openModal}
      >
        {filteredSpecs.map((specName) => (
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
              secondary={
                specName === "supplierLink" ? (
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href={specs[specName]}
                    underline="none"
                  >
                    Buy here
                  </Link>
                ) : (
                  specWithUnit(specName, specs[specName])
                )
              }
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default QuickSpecs;
