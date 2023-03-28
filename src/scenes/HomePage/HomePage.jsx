import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import DataFilters from "../../components/DataFilters";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SortFilter from "../../components/SortFilter";
import { selectUser } from "../../store/slices/auth/authSlice";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector(selectUser);

  return (
    <PageWrapper title="Builds">
      <Box
        width="100%"
        padding="2rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column">
          <SortFilter />
          <DataFilters />
        </Box>
        <Grid container spacing={0.25}>
          <Grid item xs={12}></Grid>
          {/* <PostsWidget /> */}
        </Grid>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={user?._id} /> */}
          </Box>
        )}
      </Box>
    </PageWrapper>
  );
};

export default HomePage;
