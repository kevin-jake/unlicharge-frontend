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
  setCategory,
} from "../store/slices/buildpage/buildpageSlice";
import FlexBetween from "./wrappers/FlexBetween";

const CategoryCards = ({ category, icon, apiPath }) => {
  const selectedCategory = useSelector(selectCategory);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  return (
    <Grid item xs={4} padding="1rem">
      <Card
        sx={{
          backgroundColor:
            selectedCategory === apiPath
              ? palette.primary.dark
              : palette.background.alt,
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
