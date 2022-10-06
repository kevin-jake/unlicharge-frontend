import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import SpecsTable from "./SpecsTable";

const ItemCard = ({ item }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      {/* <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5" color="text.secondary">
              {item.name}
            </Typography>
            {item && <SpecsTable specs={item} />}
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 151, height: 151, margin: 2 }}
            image="https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Live from space album cover"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{ color: "white", margin: 1, textTransform: "none" }}
        >
          More Details
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ color: "white", margin: 1, textTransform: "none" }}
        >
          Select
        </Button>
      </Box>
    </Card>
  );
};

export default ItemCard;
