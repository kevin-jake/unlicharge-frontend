import { Box, Button, Tab, Tabs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { useGetRequestsQuery } from "../../store/slices/requests/requestApiSlice";
import RequestDialogContent from "./RequestDialog/RequestDialogContent";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const columns = (request) => [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: request === "Create" ? "specs" : "requestedProduct",
    headerName: "Product Name",
    flex: 2,
    sortable: false,
    renderCell: (params) =>
      request === "Create" ? params.value.name : params.value.specs.name,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 0.5,
  },
  {
    field: request === "Create" ? "publishStatus" : "status",
    headerName: "Status",
    flex: 0.5,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
  },
  //   {
  //     field: "cost",
  //     headerName: "Cost",
  //     flex: 1,
  //     renderCell: (params) => `Php ${Number(params.value).toFixed(2)}`,
  //   },
];

const RequestsPage = () => {
  const [reqBtn, setReqBtn] = useState("Create");
  const [tabIndex, setTabIndex] = useState(0);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [focusedProduct, setFocusedProduct] = useState({});

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, refetch } = useGetRequestsQuery({
    category:
      tabIndex === 0
        ? "battery"
        : tabIndex === 1
        ? "bms"
        : tabIndex === 2
        ? "ab"
        : "",
    request: reqBtn.toLowerCase(),
  });

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleReqBtnClick = (reqValue) => {
    setReqBtn(reqValue);
    refetch();
  };

  const dataArray =
    reqBtn === "Create"
      ? "createRequests"
      : reqBtn === "Edit"
      ? "editRequests"
      : "deleteRequests";

  return (
    <PageWrapper title="My Requests">
      <Box sx={{ justifyContent: "center", margin: "1rem" }}>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            marginTop: "0.5rem",
          }}
        >
          <Box>
            <Button
              variant={reqBtn === "Create" ? "contained" : "outlined"}
              sx={{ m: 1 }}
              onClick={() => handleReqBtnClick("Create")}
            >
              Create
            </Button>
            <Button
              variant={reqBtn === "Edit" ? "contained" : "outlined"}
              sx={{ m: 1 }}
              onClick={() => handleReqBtnClick("Edit")}
            >
              Edit
            </Button>
            <Button
              variant={reqBtn === "Delete" ? "contained" : "outlined"}
              sx={{ m: 1 }}
              onClick={() => handleReqBtnClick("Delete")}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="Battery" {...a11yProps(0)} />
            <Tab label="BMS" {...a11yProps(1)} />
            <Tab label="Active Balancer" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={tabIndex} index={tabIndex}>
          <div style={{ width: "100%", height: "390px" }}>
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={(data && data[dataArray]) || []}
              columns={columns(reqBtn)}
              rowCount={(data && data[dataArray]?.length) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              // page={page}
              // pageSize={pageSize}
              // paginationMode="server"
              // sortingMode="server"
              // onPageChange={(newPage) => setPage(newPage)}
              // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              // components={{ Toolbar: DataGridCustomToolbar }}
              // componentsProps={{
              //   toolbar: { searchInput, setSearchInput, setSearch },
              // }}
            />
          </div>
        </TabPanel>
      </Box>
      {/* TODO: Fix opening of request dialog */}
      <DialogWrapper
        isOpen={isProductModalOpen}
        title={focusedProduct?.specs?.name || ""}
        closeModal={() => setIsProductModalOpen(false)}
      >
        <RequestDialogContent
          specs={focusedProduct?.specs}
          creator={focusedProduct?.creator}
          productId={focusedProduct?._id}
          // category={
          //   categories.filter((item) => item.apiPath === category)[0].name
          // }
        />
      </DialogWrapper>
    </PageWrapper>
  );
};

export default RequestsPage;
