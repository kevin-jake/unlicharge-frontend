import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RequestTab from "../components/RequestTab";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
  FETCH_AB,
  FETCH_BATTERY,
  FETCH_BATTERY_REQ,
  FETCH_BMS,
  FETCH_PARTS_DEL_REQ,
} from "../util/graphql/Query";
import { useQuery } from "@apollo/client";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", width: 300 },
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
  { field: "actions", headerName: "Action", width: 300 },
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
      };
    // case "BMS":
    //   return { gql_query: FETCH_BMS, form_props: BMS, data: "getBMSes" };
    // case "Active Balancer":
    //   return {
    //     gql_query: FETCH_AB,
    //     form_props: AB,
    //     data: "getActiveBalancers",
    //   };
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
  const { loading, data } = useQuery(querySelect(value, reqBtn).gql_query, {
    variables: reqBtn === "Delete" ? { table: "Battery" } : {},
  });

  console.log(data);
  useEffect(() => {
    data && setTableData(data[querySelect(value, reqBtn).data]);
  }, [data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReqBtnClick = (event) => {
    setReqBtn(event.target.textContent);
  };
  console.log({ tableData });
  return (
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
          " *": {
            m: 1,
          },
        }}
      >
        <Button
          variant={reqBtn === "Create" ? "contained" : "outlined"}
          onClick={handleReqBtnClick}
        >
          Create
        </Button>
        <Button
          variant={reqBtn === "Edit" ? "contained" : "outlined"}
          onClick={handleReqBtnClick}
        >
          Edit
        </Button>
        <Button
          variant={reqBtn === "Delete" ? "contained" : "outlined"}
          onClick={handleReqBtnClick}
        >
          Delete
        </Button>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid rows={tableData} columns={columns} pageSize={12} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid rows={tableData} columns={columns} pageSize={12} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid rows={tableData} columns={columns} pageSize={12} />
        </div>
      </TabPanel>
    </Box>
  );
}
