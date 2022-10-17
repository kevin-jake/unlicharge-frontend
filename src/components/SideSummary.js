import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Fab } from "@mui/material";

export default function SideSummary({ components }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, components) => (
    <Box
      sx={{ width: 300, p: 2, m: 0 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {components}
    </Box>
  );

  return (
    <Box
      sx={{
        margin: 0,
        top: "50%",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
      }}
      alignItems="center"
    >
      <Fab variant="extended" onClick={toggleDrawer("right", true)}>
        Summary
      </Fab>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {list("right", components)}
      </Drawer>
    </Box>
  );
}
