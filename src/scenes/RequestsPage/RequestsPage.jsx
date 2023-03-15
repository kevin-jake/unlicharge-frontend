import { Box, Button, Tab, Tabs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import React, { useState } from "react";
import PageWrapper from "../../components/wrappers/PageWrapper";
import { useGetEditRequestsQuery } from "../../store/slices/requests/requestApiSlice";

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

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 1,
  },
  {
    field: "newSpecs",
    headerName: "Specs",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => console.log(params),
  },
  //   {
  //     field: "cost",
  //     headerName: "Cost",
  //     flex: 1,
  //     renderCell: (params) => `Php ${Number(params.value).toFixed(2)}`,
  //   },
];

const RequestsPage = () => {
  const [category, setCategory] = useState("battery");
  const [reqBtn, setReqBtn] = useState("Create");
  const [tabIndex, setTabIndex] = useState(0);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetEditRequestsQuery({
    category:
      tabIndex === 0
        ? "battery"
        : tabIndex === 1
        ? "bms"
        : tabIndex === 2
        ? "ab"
        : "",
  });

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleReqBtnClick = (reqValue) => {
    setReqBtn(reqValue);
  };

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
              rows={(data && data.editRequests) || []}
              columns={columns}
              rowCount={(data && data.editRequests.length) || 0}
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
    </PageWrapper>
  );
};

export default RequestsPage;
