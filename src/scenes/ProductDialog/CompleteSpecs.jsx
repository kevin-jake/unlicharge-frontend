import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";

const toNotDisplay = [
  "__v",
  "specCreator",
  "_id",
  "id",
  "status",
  "createdAt",
  "updatedAt",
  "editRequest",
  "productId",
  "imagePath",
];

const CompleteSpecs = ({ specs }) => {
  const { palette } = useTheme();
  const specsProperties = Object.keys(specs);
  const filteredSpecs = specsProperties.filter(
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
            color: palette.grey[500],
          },
          "& .MuiListItemText-secondary": {
            color: palette.neutral.dark,
          },
          columns: 2,
        }}
      >
        {filteredSpecs.map((specName) => (
          <ListItem key={specName} sx={{ display: "list-item" }}>
            <ListItemText
              primary={specName}
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
                  specs[specName]
                )
              }
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default CompleteSpecs;
