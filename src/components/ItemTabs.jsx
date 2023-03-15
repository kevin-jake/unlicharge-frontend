import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-dialog-tabpanel-${index}`}
      aria-labelledby={`product-dialog-tab-${index}`}
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
    id: `product-dialog-tab-${index}`,
    "aria-controls": `product-dialog-tabpanel-${index}`,
  };
}

export default function ItemTabs({ tab1, tab2, tab3 }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="product-dialog-tabs"
        >
          <Tab label="Specifications" {...a11yProps(0)} />
          {tab2 && <Tab label="Computation" {...a11yProps(1)} />}
          <Tab label="Description" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {tab1}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tab2}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {tab3}
      </TabPanel>
    </Box>
  );
}
