import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectIssues,
  setCategory,
} from "../store/slices/buildpage/buildpageSlice";
import FlexBetween from "./wrappers/FlexBetween";

const CategoryCards = ({ category, icon, apiPath }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectCategory);
  const issues = useSelector(selectIssues);
  const { palette } = useTheme();
  const errors = issues[apiPath].filter((issue) => issue.severity === "error");
  const warnings = issues[apiPath].filter(
    (issue) => issue.severity === "warning"
  );
  let backgroundColor = palette.background.alt;
  if (selectedCategory === apiPath)
    backgroundColor = palette.primary.selectedCat;
  if (warnings.length) backgroundColor = palette.warning.main;
  else if (warnings.length && selectedCategory === apiPath)
    backgroundColor = palette.warning.light;
  if (errors.length) backgroundColor = palette.error.main;
  else if (errors.length && selectedCategory === apiPath)
    backgroundColor = palette.error.light;
  console.log(
    "🚀 ~ file: CategoryCards.jsx:23 ~ CategoryCards ~ issues:",
    issues
  );
  return (
    <Grid item xs={4} padding="1rem">
      <Card
        sx={{
          backgroundColor,
          borderRadius: "0.75rem",
        }}
        onClick={() => {
          dispatch(setCategory(apiPath));
        }}
      >
        <CardActionArea>
          <CardContent>
            <FlexBetween
              mt="0.25rem"
              sx={{
                justifyContent: "center",
                color: selectedCategory === apiPath && "white",
              }}
            >
              <FlexBetween mt="0.25rem">
                {icon}
                <Typography variant="h4" sx={{ marginLeft: "0.25rem" }}>
                  {category}
                </Typography>
              </FlexBetween>
            </FlexBetween>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CategoryCards;
