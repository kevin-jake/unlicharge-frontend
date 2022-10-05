import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Icon,
  Typography,
} from "@mui/material";
import React from "react";

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
