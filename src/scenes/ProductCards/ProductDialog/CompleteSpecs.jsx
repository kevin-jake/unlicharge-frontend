import {
  Alert,
  Box,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import UserImage from "../../../components/UserImage";
import FlexBetween from "../../../components/wrappers/FlexBetween";
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

const CompleteSpecs = ({
  specs,
  oldValues,
  requestStatus,
  productStatus,
  processedBy,
}) => {
  console.log(
    "🚀 ~ file: CompleteSpecs.jsx:33 ~ CompleteSpecs ~ specs:",
    processedBy
  );
  const { palette } = useTheme();
  const specsProperties = Object.keys(specs);
  let filteredSpecs = specsProperties.filter(
    (specProp) => !toNotDisplay.includes(specProp)
  );

  return (
    <>
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
                            sx={{
                              fontStyle: "italic",
                              color: palette.grey[500],
                            }}
                          >
                            Old value:{" "}
                            {specWithUnit(specName, oldValues[specName])}
                          </Typography>
                        )}
                    </>
                  )
                }
              />
            </ListItem>
          ))}
          {Boolean(requestStatus) && (
            <ListItem sx={{ display: "list-item", pageBreakInside: "avoid" }}>
              <ListItemText
                primary="Request Status"
                secondary={requestStatus}
              />
            </ListItem>
          )}
          {Boolean(processedBy) && (
            <ListItem sx={{ display: "list-item", pageBreakInside: "avoid" }}>
              <ListItemText
                primary={
                  requestStatus === "Approved" ? "Approved by" : "Rejected by:"
                }
                secondary={
                  <FlexBetween gap="0.3rem">
                    <FlexBetween gap="0.5rem">
                      <UserImage size="20px" image={processedBy?.imagePath} />
                      <Box
                        display="flex"
                        sx={{
                          "& hr": {
                            mx: 1,
                          },
                          "& .css-1idn90j-MuiGrid-root": {
                            display: "flex",
                            justifyContent: "center",
                          },
                        }}
                        alignItems="center"
                        justifyContent="center"
                        width="auto"
                        height="fit-content"
                      >
                        <Typography variant="body">
                          {processedBy?.username}
                        </Typography>
                      </Box>
                    </FlexBetween>
                  </FlexBetween>
                }
              />
            </ListItem>
          )}
        </List>
        {productStatus === "Deleted" && (
          <Alert severity="warning">This product is already deleted</Alert>
        )}
      </Grid>
    </>
  );
};

export default CompleteSpecs;
