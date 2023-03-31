import { Battery1BarOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/wrappers/FlexBetween";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import { selectSelection } from "../../store/slices/buildpage/buildpageSlice";
import { categoryFormat } from "../../util/categoryFormat";
import QuickSpecs from "../ProductCards/QuickSpecs";

const SummaryCards = ({ openModal, category }) => {
  const selectedItems = useSelector(selectSelection);
  const { palette } = useTheme();

  return (
    <WidgetWrapper width="100%">
      <Card
        sx={{
          backgroundColor: palette.background.alt,
          borderRadius: "0.75rem",
        }}
      >
        <CardContent>
          <FlexBetween
            sx={{ justifyContent: "flex-start", flexDirection: "column" }}
          >
            <Box display="flex" justifyContent="center">
              <Battery1BarOutlined fontSize="small" />
              <Typography variant="h5" sx={{ marginLeft: "0.25rem" }}>
                {categoryFormat(category)}
              </Typography>
            </Box>
            {selectedItems[category].hasOwnProperty("id") ? (
              <QuickSpecs
                specs={selectedItems[category]}
                openModal={openModal}
              />
            ) : (
              <Typography variant="body">
                {`No selected ${categoryFormat(category)} yet`}{" "}
              </Typography>
            )}
          </FlexBetween>
        </CardContent>
      </Card>
    </WidgetWrapper>
  );
};

export default SummaryCards;
