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
// TODO: Make dynamic tabs
export default function ItemTabs({ tabArray }) {
  // tabArray model = [
  //   {
  //     tabTitle: <String>
  //       tabComp: <React component>
  //   }
  // ]
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
          {tabArray.map((tab, index) => (
            <Tab
              key={`tab-${tab.tabTitle}-${index}`}
              label={tab.tabTitle}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabArray.map((tab, index) => (
        <TabPanel
          key={`tabpanel-${tab.tabTitle}-${index}`}
          value={value}
          index={index}
        >
          {tab.tabComp}
        </TabPanel>
      ))}
    </Box>
  );
}
