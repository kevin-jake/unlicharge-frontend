import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { SummaryContext } from "../context/summary-context";
// FIXME: Make this mobile responsive
// TODO: Add tooltip to the cards or helper
const PathCards = ({
  title,
  icon,
  description,
  tooltip,
  onClick,
  selection,
}) => {
  const { initialForm, batterySelected, bmsSelected, abSelected } =
    useContext(SummaryContext);
  const [error, setError] = useState();
  const activeStyle = (title) => {
    if (selection === title) {
      return { maxWidth: 450, backgroundColor: "lightblue", my: 2 };
    }
    if (error) {
      return { maxWidth: 450, backgroundColor: "pink", my: 2 };
    } else return { maxWidth: 450, my: 2 };
  };

  useEffect(() => {
    if (title === "BMS") {
      if (bmsSelected.error && Object.keys(bmsSelected.error).length !== 0)
        setError(bmsSelected.error);
      else setError();
    } else if (title === "Active Balancer") {
      if (abSelected.error && Object.keys(abSelected.error).length !== 0)
        setError(abSelected.error);
      else setError();
    }
  }, [bmsSelected, abSelected, batterySelected, initialForm]);

  return (
    <Card onClick={onClick} sx={activeStyle(title)}>
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <div>
              <Typography variant="h6" component="div">
                {title}
              </Typography>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
            gap={2}
          >
            {icon}
            <Typography fontWeight="light" variant="body2">
              {error && error.msg ? error.msg : description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PathCards;
