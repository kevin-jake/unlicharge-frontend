import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
// TODO: Make this mobile responsive
// TODO: Add navigation on the path cards
const PathCards = ({ title, icon, description, tooltip }) => {
  return (
    <Card sx={{ maxWidth: 450 }}>
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
              {description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PathCards;
