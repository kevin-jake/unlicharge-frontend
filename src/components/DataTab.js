import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
  FETCH_AB,
  FETCH_AB_REQ,
  FETCH_BATTERY,
  FETCH_BATTERY_REQ,
  FETCH_BMS,
  FETCH_BMS_REQ,
  FETCH_PARTS_DEL_REQ,
} from "../util/graphql/Query";
import { useQuery } from "@apollo/client";
import DetailsModal from "./DetailsModal";
import FormModal from "./FormModal";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", width: 600 },
  {
    field: "requestor",
    headerName: "Requestor",
    width: 300,
    valueGetter: (params) => {
      if (params.row.creator) return params.row.creator.username;
      else return params.row.requestor.username;
    },
  },
  { field: "createdAt", headerName: "Requested At", width: 300 },
];

function querySelect(selection, operation) {
  console.log({ operation });
  switch (selection) {
    case 0:
      return {
        gql_query:
          operation === "Create"
            ? FETCH_BATTERY
            : operation === "Edit"
            ? FETCH_BATTERY_REQ
            : FETCH_PARTS_DEL_REQ,
        data:
          operation === "Create"
            ? "getBatteries"
            : operation === "Edit"
            ? "getBattEditRequests"
            : "getPartsDeleteRequests",
        table: "Battery",
      };
    case 1:
      return {
        gql_query:
          operation === "Create"
            ? FETCH_BMS
            : operation === "Edit"
            ? FETCH_BMS_REQ
            : FETCH_PARTS_DEL_REQ,
        data:
          operation === "Create"
            ? "getBMSes"
            : operation === "Edit"
            ? "getBMSEditRequests"
            : "getPartsDeleteRequests",
        table: "BMS",
      };
    case 2:
      return {
        gql_query:
          operation === "Create"
            ? FETCH_AB
            : operation === "Edit"
            ? FETCH_AB_REQ
            : FETCH_PARTS_DEL_REQ,
        data:
          operation === "Create"
            ? "getActiveBalancers"
            : operation === "Edit"
            ? "getABEditRequests"
            : "getPartsDeleteRequests",
        table: "Active Balancer",
      };
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DataTab({}) {
  const [value, setValue] = useState(0);
  const [reqBtn, setReqBtn] = useState("Create");
  const [tableData, setTableData] = useState([]);
  const [modalData, setModalData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const { loading, data } = useQuery(querySelect(value, reqBtn).gql_query, {
    variables:
      reqBtn === "Delete"
        ? {
            table:
              querySelect(value, reqBtn).table === "Active Balancer"
                ? "Active_balancer"
                : querySelect(value, reqBtn).table,
          }
        : {},
  });

  useEffect(() => {
    if (data) setTableData(data[querySelect(value, reqBtn).data]);
    else setTableData([]);
  }, [data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReqBtnClick = (event) => {
    setReqBtn(event.target.textContent);
  };

  const handleCellClick = (event) => {
    setModalData(event.row);
    setShowModal(true);
  };

  const openFormModal = (operation) => {
    setShowFormModal({ open: true, operation });
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Battery" {...a11yProps(0)} />
            <Tab label="BMS" {...a11yProps(1)} />
            <Tab label="Active Balancer" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant={reqBtn === "Create" ? "contained" : "outlined"}
            sx={{ m: 1 }}
            onClick={handleReqBtnClick}
          >
            Create
          </Button>
          <Button
            variant={reqBtn === "Edit" ? "contained" : "outlined"}
            sx={{ m: 1 }}
            onClick={handleReqBtnClick}
          >
            Edit
          </Button>
          <Button
            variant={reqBtn === "Delete" ? "contained" : "outlined"}
            sx={{ m: 1 }}
            onClick={handleReqBtnClick}
          >
            Delete
          </Button>
        </Box>
        <TabPanel value={value} index={0}>
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              components={{
                LoadingOverlay: LinearProgress,
              }}
              onCellClick={handleCellClick}
              loading={loading}
              rows={tableData}
              columns={columns}
              pageSize={12}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              components={{
                LoadingOverlay: LinearProgress,
              }}
              onCellClick={handleCellClick}
              loading={loading}
              rows={tableData}
              columns={columns}
              pageSize={12}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              components={{
                LoadingOverlay: LinearProgress,
              }}
              onCellClick={handleCellClick}
              loading={loading}
              rows={tableData}
              columns={columns}
              pageSize={12}
            />
          </div>
        </TabPanel>
      </Box>
      {modalData && (
        <>
          <DetailsModal
            modalData={modalData}
            showModal={showModal}
            setShowModal={setShowModal}
            openEditModal={openFormModal}
          />
          <FormModal
            showFormModal={showFormModal}
            setShowFormModal={setShowFormModal}
            formData={modalData}
            title={querySelect(value, reqBtn).table}
          />
        </>
      )}
    </>
  );
}
