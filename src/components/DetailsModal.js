import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import Modal from "../components/Modal";
import SpecsTable from "../components/SpecsTable";
import { AuthContext } from "../context/auth-context";
import ItemTabs from "./ItemTabs";

const DetailsModal = ({
  setShowModal,
  showModal,
  modalData,
  openEditModal,
  computedData,
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Modal
      showModal={showModal}
      title={modalData.name}
      closeModal={() => setShowModal(false)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        {/* TODO: Dynamic image */}
        <Box
          component="img"
          alt={modalData.name}
          sx={{
            width: 300,
            margin: 2,
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
          src={modalData.image_url}
        />
        {/* <SpecsTable specs={modalData} modalDetails={true} /> */}
        <ItemTabs
          tab1={<SpecsTable specs={modalData} modalDetails={true} />}
          tab2={
            computedData && (
              <SpecsTable specs={computedData} modalDetails={true} />
            )
          }
        />
        <Box
          sx={{
            display: isLoggedIn ? "flex" : "none",
            justifyContent: "center",
            p: 1,
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white", margin: 1, textTransform: "none" }}
            onClick={() => openEditModal("Edit")}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white", margin: 1, textTransform: "none" }}
            onClick={() => openEditModal("Delete")}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailsModal;
