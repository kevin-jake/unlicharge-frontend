import { Box, Button, CircularProgress, Fab, Grid } from "@mui/material";
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
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../../store/slices/products/productApiSlice";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Battery5BarIcon from "@mui/icons-material/Battery5Bar";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { selectUser } from "../../store/slices/auth/authSlice";

function BuildPage() {
  const categories = [
    {
      name: "Battery",
      icon: <Battery5BarIcon fontSize="large" />,
      apiPath: "battery",
    },
    { name: "BMS", icon: <AccountTreeIcon fontSize="large" />, apiPath: "bms" },
    {
      name: "Active Balancer",
      icon: <EqualizerIcon fontSize="large" />,
      apiPath: "ab",
    },
  ];
  // TODO: Remove category on the redux and just use props
  const category = useSelector(({ product }) => product.category);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [focusedProduct, setFocusedProduct] = useState({});
  const [crudModalState, setCrudModalState] = useState({
    isOpen: false,
    operation: "Create",
    category: categories.filter((item) => item.apiPath === category)[0].name,
    oldValues: {},
  });
  const isLoggedIn = Boolean(useSelector(selectUser));
  const { data, isLoading, isSuccess, refetch } = useGetProductsQuery(category);
  console.log("🚀 ~ file: BuildPage.jsx:46 ~ BuildPage ~ category:", category);

  useEffect(() => {
    refetch();
  }, [isLoggedIn]);
  useEffect(() => {
    if (isSuccess) {
      const newFocus = data.products.filter(
        (item) => item._id === focusedProduct?._id
      );
      setFocusedProduct(newFocus[0]);
    }
  }, [data]);

  const handleOpenProductModal = (product) => {
    setIsProductModalOpen(true);
    setFocusedProduct(product);
  };
  console.log(
    "🚀 ~ file: BuildPage.jsx:38 ~ BuildPage ~ focusedProduct:",
    focusedProduct
  );
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
        {categories.map(({ name, icon, apiPath }) => (
          <CategoryCards
            key={name}
            category={name}
            apiPath={apiPath}
            icon={icon}
            refetch={refetch}
          />
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
                openModal={() => handleOpenProductModal(product)}
                publishStatus={product.publishStatus}
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ margin: "1rem" }}
            onClick={() =>
              setCrudModalState({
                ...crudModalState,
                operation: "Create",
                category: categories.filter(
                  (item) => item.apiPath === category
                )[0].name,
                isOpen: true,
              })
            }
          >
            Add
          </Button>
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
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={() => setIsSummaryOpen(!isSummaryOpen)}
        >
          Summary
        </Fab>
      </Box>
      <DialogWrapper
        isOpen={isProductModalOpen}
        title={focusedProduct?.specs?.name || ""}
        closeModal={() => setIsProductModalOpen(false)}
      >
        <ProductDialogContent
          specs={focusedProduct?.specs}
          creator={focusedProduct?.creator}
          productId={focusedProduct?._id}
          setCrudModalState={setCrudModalState}
          category={
            categories.filter((item) => item.apiPath === category)[0].name
          }
        />
      </DialogWrapper>
      <DialogWrapper
        isOpen={crudModalState.isOpen}
        title={`${crudModalState.operation} ${crudModalState.category}`}
        closeModal={() =>
          setCrudModalState({ ...crudModalState, isOpen: false })
        }
      >
        <CRUDDialogContent
          operation={crudModalState.operation}
          category={crudModalState.category}
          oldValues={crudModalState.oldValues}
          productId={crudModalState.productId}
          closeModal={() =>
            setCrudModalState({ ...crudModalState, isOpen: false })
          }
          refetch={refetch}
        />
      </DialogWrapper>
    </PageWrapper>
  );
}

export default BuildPage;
