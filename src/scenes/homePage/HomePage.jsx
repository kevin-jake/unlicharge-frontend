import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { useSelector } from "react-redux";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import Navbar from "../navbar/Navbar";
import DataFilters from "../../components/DataFilters";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const { _id, picturePath } = useSelector((state) => {
    return state.user;
  });

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 2% 0.1rem 2%"
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="space-between"
      >
        <Typography color={palette.neutral.dark} variant="h2" fontWeight="500">
          Builds
        </Typography>
      </Box>
      <Box
        width="100%"
        padding="2rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "13%" : undefined}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="filters"
              id="filters"
            >
              <Typography variant="h5">Filter</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DataFilters />
            </AccordionDetails>
          </Accordion>
        </Box>
        <Grid container spacing={0.25}>
          <PostsWidget userId={_id} />
        </Grid>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
