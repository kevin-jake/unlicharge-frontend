import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RequestTab from "../components/RequestTab";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 600 },
];

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

  useEffect(() => {
    if (value === 0 && reqBtn === "Create")
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((data) => data.json())
        .then((data) => setTableData(data));
    else if (value === 1 && reqBtn === "Edit")
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((data) => data.json())
        .then((data) => setTableData(data));
    else if (value === 2 && reqBtn === "Delete")
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((data) => setTableData(data));
    else
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((data) => data.json())
        .then((data) => setTableData(data));
  }, [value, reqBtn]);

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
