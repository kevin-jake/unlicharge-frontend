import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Fab,
  Grid,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryCards from "../../components/CategoryCards";
import ProductCards from "../ProductCards/ProductCards";
import InitialParams from "./InitialParams";
import PageWrapper from "../../components/wrappers/PageWrapper";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import ProductDialogContent from "../ProductCards/ProductDialog/ProductDialogContent";
import SortFilter from "../../components/SortFilter";
import SummarySideBar from "../SummarySideBar/SummarySideBar";
import CRUDDialogContent from "../FormDialog/CRUDDialogContent";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../store/slices/products/productApiSlice";
import { selectUser } from "../../store/slices/auth/authSlice";
import {
  selectCategory,
  selectFilters,
  selectInitParams,
  selectIssues,
  selectPagination,
  selectSelection,
  selectSort,
  setPagination,
  setSelectedProduct,
} from "../../store/slices/buildpage/buildpageSlice";
import BuildFilters from "./BuildFilters";
import FlexBetween from "../../components/wrappers/FlexBetween";
import PageFooter from "../../components/PageFooter";
import { AddCircle } from "@mui/icons-material";
import NoResults from "../../components/NoResults";
import ErrorDisplay from "../../components/ErrorDisplay";
import { useGetCategoryObject } from "../../hooks/useGetCategoryObject";

function BuildPage() {
  const isNonSmallMobileScreens = useMediaQuery("(min-width:400px)");

  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1300px)");
  const initParams = useSelector(selectInitParams);
  const selectedItems = useSelector(selectSelection);
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectSort);
  const isLoggedIn = Boolean(useSelector(selectUser));
  const category = useSelector(selectCategory);
  const issues = useSelector(selectIssues);

  const { categoryDisplayName } = useGetCategoryObject(category);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  // TODO: Change to false
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [focusedProduct, setFocusedProduct] = useState({});
  const [crudModalState, setCrudModalState] = useState({
    isOpen: false,
    operation: "Create",
    category: categoryDisplayName,
    oldValues: {},
  });
  const categories = ["battery", "bms", "ab"];

  const { data, isLoading, isFetching, isSuccess, isError, refetch } =
    useGetProductsQuery(
      {
        category,
        initParams,
        filters,
        pagination,
        sort,
      },
      { refetchOnMountOrArgChange: true }
    );
  // console.log("🚀 ~ file: BuildPage.jsx:95 ~ BuildPage ~ data:", data);

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

  useEffect(() => {
    if (isSuccess) {
      const newSelection = data.products.filter(
        (item) =>
          item.specs.id === selectedItems[category].id ||
          item.id === selectedItems[category].productId
      );
      if (newSelection.length) {
        dispatch(
          setSelectedProduct({ specs: newSelection[0].specs, category })
        );
      }
    }
  }, [data]);

  const handleOpenProductModal = (spec) => {
    setFocusedProduct(spec);
    setIsProductModalOpen(true);
  };

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
        {categories.map((category) => (
          <Grid item xs={4} key={category} padding="1rem">
            <CategoryCards category={category} />
            <ErrorDisplay issues={issues[category]} />
          </Grid>
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
            <FlexBetween flexDirection={isNonMobileScreens ? "row" : "column"}>
              <SortFilter
                isComputedSpecsShown={Boolean(
                  data?.products[0]?.specs.computedSpecs
                )}
                refetch={refetch}
                isNonMobileScreens={isNonMobileScreens}
              />
              <BuildFilters refetch={refetch} />
            </FlexBetween>
          </Grid>

          {(isLoading || isFetching) && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              height="40vh"
            >
              <CircularProgress />
            </Grid>
          )}
          {isSuccess &&
            !isFetching &&
            Boolean(data.products.length) &&
            data.products.map((product) => (
              <ProductCards
                key={product._id}
                openModal={() => handleOpenProductModal(product)}
                publishStatus={product.publishStatus}
                specs={product.specs}
                creator={product.creator}
                isSummaryOpen={isSummaryOpen}
              />
            ))}
          {((isSuccess && !isFetching && data.total == 0) || isError) && (
            <NoResults />
          )}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                startIcon={<AddCircle />}
                variant="contained"
                sx={{ margin: "1rem", width: 300 }}
                onClick={() =>
                  setCrudModalState({
                    ...crudModalState,
                    operation: "Create",
                    category: categoryDisplayName,
                    isOpen: true,
                  })
                }
              >
                Add
              </Button>
            </Box>
          </Grid>
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
          {isSummaryOpen && (
            <SummarySideBar
              openModal={(category) =>
                handleOpenProductModal({
                  specs: selectedItems[category],
                  category,
                })
              }
            />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PageFooter
          page={data?.page || pagination.page}
          limit={data?.limit || pagination.limit}
          total={data?.total || pagination.total}
          category={category}
          isShown={Boolean(data?.products.length)}
          setPagination={(page, limit, total) => {
            dispatch(
              setPagination({
                limit,
                page,
                total,
              })
            );
          }}
        />
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
          setCrudModalState={setCrudModalState}
          categoryDisplayName={categoryDisplayName}
          selectedCategory={focusedProduct?.category}
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
