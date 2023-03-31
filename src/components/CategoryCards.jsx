import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoryObject } from "../hooks/useGetCategoryObject";
import {
  selectCategory,
  selectIssues,
  setCategory,
} from "../store/slices/buildpage/buildpageSlice";
import FlexBetween from "./wrappers/FlexBetween";

const CategoryCards = ({ category }) => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:500px)");
  const isNonSmallMobileScreens = useMediaQuery("(min-width:400px)");
  const { categoryDisplayName, icon } = useGetCategoryObject(
    category,
    isNonSmallMobileScreens
  );
  const selectedCategory = useSelector(selectCategory);
  const issues = useSelector(selectIssues);
  const { palette } = useTheme();
  const errors = issues[category].filter((issue) => issue.severity === "error");
  const warnings = issues[category].filter(
    (issue) => issue.severity === "warning"
  );
  let backgroundColor = palette.background.alt;
  if (selectedCategory === category)
    backgroundColor = palette.primary.selectedCat;
  if (warnings.length) backgroundColor = palette.warning.issues;
  if (warnings.length && selectedCategory === category)
    backgroundColor = palette.warning.light;
  if (errors.length) backgroundColor = palette.error.issues;
  if (errors.length && selectedCategory === category)
    backgroundColor = palette.error.light;
  return (
    <Card
      sx={{
        backgroundColor,
        borderRadius: "0.75rem",
      }}
      onClick={() => {
        dispatch(setCategory(category));
      }}
    >
      <CardActionArea>
        <CardContent>
          <FlexBetween
            mt="0.25rem"
            sx={{
              justifyContent: "center",
              color: selectedCategory === category && "white",
            }}
          >
            <FlexBetween mt="0.25rem">
              {icon}

              <Typography
                variant={
                  isNonMobileScreens
                    ? "h4"
                    : isNonSmallMobileScreens
                    ? "h6"
                    : "body"
                }
                sx={{ marginLeft: "0.25rem" }}
              >
                {categoryDisplayName}
              </Typography>
            </FlexBetween>
          </FlexBetween>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCards;
