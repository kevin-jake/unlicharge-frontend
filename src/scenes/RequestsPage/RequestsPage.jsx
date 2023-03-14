import { Box, Button, Tab, Tabs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import React, { useState } from "react";
import PageWrapper from "../../components/wrappers/PageWrapper";

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

const RequestsPage = () => {
  const [reqBtn, setReqBtn] = useState("Create");
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 5,
    maxColumns: 6,
  });

  // TODO: Fix the request pages
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
              // onClick={handleReqBtnClick}
            >
              Create
            </Button>
            <Button
              variant={reqBtn === "Edit" ? "contained" : "outlined"}
              sx={{ m: 1 }}
              // onClick={handleReqBtnClick}
            >
              Edit
            </Button>
            <Button
              variant={reqBtn === "Delete" ? "contained" : "outlined"}
              sx={{ m: 1 }}
              // onClick={handleReqBtnClick}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs>
            <Tab label="Battery" {...a11yProps(0)} />
            <Tab label="Battery" {...a11yProps(1)} />
            <Tab label="Battery" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={0} index={0}>
          <div style={{ width: "100%", height: "390px" }}>
            {/* <DataGrid
            components={{
              LoadingOverlay: LinearProgress,
            }}
            onCellClick={handleCellClick}
            loading={loading}
            rows={tableData}
            columns={columns}
            pageSize={12}
          /> */}

            <DataGrid {...data} />
          </div>
        </TabPanel>
      </Box>
    </PageWrapper>
  );
};

export default RequestsPage;
