import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import Modal from "../components/Modal";
import SpecsTable from "../components/SpecsTable";
import { AuthContext } from "../context/auth-context";

const DetailsModal = ({
  setShowModal,
  showModal,
  modalData,
  openEditModal,
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
        <Box
          component="img"
          alt="The house from the offer."
          sx={{
            width: 300,
            margin: 2,
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
          src="https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <SpecsTable specs={modalData} modalDetails={true} />
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