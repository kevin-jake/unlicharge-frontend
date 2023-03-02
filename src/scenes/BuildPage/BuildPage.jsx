import { Box, CircularProgress, Container, Fab, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCards from "../../components/ProductCards/ProductCards";
import CategoryCards from "../../components/CategoryCards";
import InitialParams from "./InitialParams";
import PageWrapper from "../../components/wrappers/PageWrapper";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import ProductDialogContent from "../ProductDialog/ProductDialogContent";
import SortFilter from "../../components/SortFilter";
import SummarySideBar from "../SummarySideBar/SummarySideBar";
import CRUDDialogContent from "../FormDialog/CRUDDialogContent";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setProducts,
} from "../../store/slices/products/productSlice";
import { useGetProductsQuery } from "../../store/slices/products/productApiSlice";
import FlexBetween from "../../components/wrappers/FlexBetween";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Battery5BarIcon from "@mui/icons-material/Battery5Bar";
import EqualizerIcon from "@mui/icons-material/Equalizer";

function BuildPage() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const category = useSelector(({ product }) => product.category);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetProductsQuery(category);
  console.log("🚀 ~ file: BuildPage.jsx:22 ~ BuildPage ~ category:", category);

  const categories = [
    { name: "Battery", icon: <Battery5BarIcon fontSize="large" /> },
    { name: "BMS", icon: <AccountTreeIcon fontSize="large" /> },
    { name: "Active Balancer", icon: <EqualizerIcon size={50} /> },
  ];

  return (
    <PageWrapper title="Estimate your build">
      <Box
        width="100%"
        padding="1rem 2% 0.1rem 2%"
        display="block"
        justifyContent="space-between"
      >
        <InitialParams />
      </Box>
      <Grid container>
        {categories.map(({ name, icon }) => (
          <CategoryCards key={name} category={name} icon={icon} />
        ))}
      </Grid>
      <Grid container>
        <Grid
          paddingX="0.5rem"
          container
          spacing={0.5}
          item
          md={isSummaryOpen ? 9 : 12}
        >
          <Grid item xs={12}>
            <SortFilter />
          </Grid>
          {/* TODO: Make this responsive 3 cards if large screen and one card on mobile */}
          {isLoading && (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CircularProgress />
            </Grid>
          )}
          {isSuccess &&
            data.products.map((product) => (
              <ProductCards
                key={product._id}
                openModal={() => setIsProductModalOpen(true)}
                productId={product._id}
                specs={product.specs}
                creator={product.creator}
                isSummaryOpen={isSummaryOpen}
              />
            ))}
        </Grid>
        <Grid
          item
          lg={3}
          sx={{
            borderRadius: "0.75rem",
            height: "fit-content",
            top: "1rem",
            position: "sticky",
            overflow: "hidden",
          }}
        >
          {isSummaryOpen && <SummarySideBar />}
        </Grid>
      </Grid>
      <Box
        sx={{
          margin: "1rem",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
      >
        {/* TODO: Make dynamic or mobile responsive */}
        <Fab variant="extended" size="small" color="primary" aria-label="add">
          Summary
        </Fab>
      </Box>
      <DialogWrapper
        isOpen={isProductModalOpen}
        title="testTESTASAASDFasdfasdfasdfasdf"
        closeModal={() => setIsProductModalOpen(false)}
      >
        <ProductDialogContent />
      </DialogWrapper>
      <DialogWrapper isOpen={false} title="Create Battery">
        <CRUDDialogContent />
      </DialogWrapper>
    </PageWrapper>
  );
}

export default BuildPage;
