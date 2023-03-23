import {
  Box,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { specDisplay, specWithUnit } from "../../../util/specDisplayFormat";

const toNotDisplay = [
  "__v",
  "specCreator",
  "_id",
  "id",
  "status",
  "createdAt",
  "updatedAt",
  "editRequest",
  "deleteRequest",
  "productId",
  "imagePath",
];

const CompleteSpecs = ({ specs, oldValues }) => {
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
          <ListItem
            key={specName}
            sx={{ display: "list-item", pageBreakInside: "avoid" }}
          >
            <ListItemText
              primary={specDisplay(specName)}
              secondary={
                specName === "supplierLink" ? (
                  <>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={specs[specName]}
                      underline="none"
                    >
                      Buy here
                    </Link>
                    {Boolean(oldValues) &&
                      oldValues[specName] !== specs[specName] && (
                        <Box
                          sx={{
                            "& .MuiLink-root": {
                              fontSize: "0.75rem",
                              fontStyle: "italic",
                              color: palette.compliment[500],
                            },
                          }}
                        >
                          <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            href={specs[specName]}
                            underline="none"
                          >
                            Old link
                          </Link>
                        </Box>
                      )}
                  </>
                ) : (
                  <>
                    {specWithUnit(specName, specs[specName])}
                    {Boolean(oldValues) &&
                      oldValues[specName] !== specs[specName] && (
                        <Typography
                          variant="caption"
                          sx={{ fontStyle: "italic", color: palette.grey[500] }}
                        >
                          Old value: {oldValues[specName]}
                        </Typography>
                      )}
                  </>
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
