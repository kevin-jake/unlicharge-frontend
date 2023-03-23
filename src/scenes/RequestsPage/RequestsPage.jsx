import { Box, Button, Tab, Tabs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import PageWrapper from "../../components/wrappers/PageWrapper";
import {
  useGetRequestsQuery,
  useProcessRequestMutation,
} from "../../store/slices/requests/requestApiSlice";
import ConfirmationDialogContent from "./RequestDialog/ConfirmationDialogContent";
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
    minWidth: 200,
  },
  {
    field: request === "Create" ? "specs" : "requestedProduct",
    headerName: "Product Name",
    flex: 2,
    minWidth: 300,
    renderCell: (params) =>
      request === "Create" ? params.value.name : params.value?.specs?.name,
  },
  {
    field: request === "Create" ? "creator" : "requestor",
    headerName: "Requested by",
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => params.value.username,
  },
  {
    field: request === "Create" ? "publishStatus" : "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 120,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    minWidth: 180,
    renderCell: (params) => moment(params.value).format("lll"),
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
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [decision, setDecision] = useState("");
  const [isMyRequestOnly, setIsMyRequestOnly] = useState(false);
  const [focusedRequest, setFocusedProduct] = useState({});
  console.log(
    "🚀 ~ file: RequestsPage.jsx:84 ~ RequestsPage ~ focusedRequest:",
    focusedRequest
  );

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const isCreate = reqBtn === "Create";
  const isEdit = reqBtn === "Edit";
  const isDelete = reqBtn === "Delete";

  const category =
    tabIndex === 0
      ? "battery"
      : tabIndex === 1
      ? "bms"
      : tabIndex === 2
      ? "ab"
      : "";
  const request = reqBtn.toLowerCase();

  const [processRequest, { isLoading: processLoading }] =
    useProcessRequestMutation();

  const { data, isLoading, refetch } = useGetRequestsQuery({
    category,
    request,
    filters: { isMyRequestOnly },
  });

  useEffect(() => {
    refetch();
  }, [reqBtn, tabIndex]);

  const notifyError = (error) => {
    const errMsg = `${error.data.message}`;
    toast.error(errMsg);
    throw new Error(errMsg);
  };

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleProcess = async ({ commentBody }) => {
    console.log(
      "🚀 ~ file: RequestsPage.jsx:125 ~ handleProcess ~ requestBody:",
      commentBody
    );
    let requestBody = {};
    let productId = "";
    if (isCreate) productId = focusedRequest.id;
    else {
      productId = focusedRequest.requestedProduct.id;
      requestBody = {
        reqId: focusedRequest.id,
        commentBody,
      };
    }
    await processRequest({
      category,
      productId,
      request,
      requestBody,
      decision,
    })
      .unwrap()
      .then()
      .catch((error) => notifyError(error));
    if (decision === "approve" && isCreate)
      toast.success("Product approved. Product is now visible to the public.");
    if (decision === "approve" && isEdit)
      toast.success("Edit Request approved. Product updated.");
    if (decision === "approve" && isDelete)
      toast.success(
        "Delete Request approved. Product is now removed on the list."
      );
    if (decision === "reject" && isCreate) toast.success("Product rejected.");
    if (decision === "reject" && isEdit)
      toast.success("Edit request rejected.");
    if (decision === "reject" && isDelete)
      toast.success("Delete request rejected.");
    refetch();
    setIsConfirmModalOpen(false);
  };

  const handleReqBtnClick = (reqValue) => {
    setReqBtn(reqValue);
  };

  const handleRowClick = (params) => {
    setFocusedProduct(params.row);
    setIsRequestModalOpen(true);
  };

  const dataArray = isCreate
    ? "createRequests"
    : isEdit
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
              variant={isCreate ? "contained" : "outlined"}
              sx={{ m: 1 }}
              onClick={() => handleReqBtnClick("Create")}
            >
              Create
            </Button>
            <Button
              variant={isEdit ? "contained" : "outlined"}
              sx={{ m: 1 }}
              onClick={() => handleReqBtnClick("Edit")}
            >
              Edit
            </Button>
            <Button
              variant={isDelete ? "contained" : "outlined"}
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
          <Box style={{ width: "100%", height: "75vh" }}>
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={(data && data[dataArray]) || []}
              columns={columns(reqBtn)}
              rowCount={(data && data[dataArray]?.length) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              onRowClick={handleRowClick}
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
          </Box>
        </TabPanel>
      </Box>
      <DialogWrapper
        isOpen={isRequestModalOpen}
        title={
          isCreate
            ? focusedRequest?.specs?.name
            : focusedRequest?.requestedProduct?.specs?.name || ""
        }
        closeModal={() => setIsRequestModalOpen(false)}
      >
        <RequestDialogContent
          focusedRequest={focusedRequest}
          isCreate={isCreate}
          isEdit={isEdit}
          isDelete={isDelete}
          approve={() => {
            setIsConfirmModalOpen(true);
            setDecision("approve");
          }}
          reject={() => {
            setIsConfirmModalOpen(true);
            setDecision("reject");
          }}
        />
      </DialogWrapper>
      <DialogWrapper
        isOpen={isConfirmModalOpen}
        title={`Are you sure you want to ${decision}`}
        closeModal={() => setIsConfirmModalOpen(false)}
      >
        <ConfirmationDialogContent
          isLoading={processLoading}
          handleFormSubmit={handleProcess}
          closeModal={() => setIsConfirmModalOpen(false)}
        />
      </DialogWrapper>
    </PageWrapper>
  );
};

export default RequestsPage;
