import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import DataFilters from "../../components/DataFilters";
import CategoryCards from "../../components/CategoryCards";
import PageWrapper from "../../components/wrappers/PageWrapper";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Battery5BarIcon from "@mui/icons-material/Battery5Bar";
import EqualizerIcon from "@mui/icons-material/Equalizer";

function ProductPage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const categories = [
    { name: "Battery", icon: <Battery5BarIcon fontSize="large" /> },
    { name: "BMS", icon: <AccountTreeIcon fontSize="large" /> },
    { name: "Active Balancer", icon: <EqualizerIcon fontSize="large" /> },
  ];

  return (
    <PageWrapper title="Products">
      <Grid marginY="0.5rem" container>
        {categories.map(({ name, icon }) => (
          <CategoryCards key={name} category={name} icon={icon} />
        ))}
      </Grid>
      <Box
        width="100%"
        padding="2rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <DataFilters />
        <Grid container spacing={0.25}>
          {/* <PostsWidget /> */}
        </Grid>
      </Box>
    </PageWrapper>
  );
}

export default ProductPage;
