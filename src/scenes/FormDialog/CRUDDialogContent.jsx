import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/auth/authSlice";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import LoginRegisterDialogContent from "../LoginRegisterDialog/LoginRegisterDialogContent";
import CRUDForm from "./CRUDForm";

const CRUDDialogContent = (props) => {
  const [modalType, setModalType] = useState("Login");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = Boolean(useSelector(selectUser));
  const { palette } = useTheme();

  const handleOpenModal = (pageType) => {
    setModalType(pageType);
    setIsModalOpen(true);
  };
  return (
    <>
      <DialogContent dividers>
        <Box>
          <CRUDForm {...props} setIsLoading={setIsLoading} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        {isLoggedIn && (
          <>
            <Button
              type="submit"
              form="crud-form"
              sx={{
                m: "0.5rem 0",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLoading ? (
                <CircularProgress
                  size={20}
                  sx={{ color: palette.secondary.light }}
                />
              ) : (
                "Save"
              )}
            </Button>
            <Button
              sx={{
                m: "0.5rem 0",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={props.closeModal}
            >
              Cancel
            </Button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Button
              sx={{
                "&:hover": { color: palette.primary.main },
                marginX: "0.25rem",
              }}
              onClick={() => handleOpenModal("Login")}
            >
              Login
            </Button>
            or
            <Button
              sx={{
                "&:hover": { color: palette.primary.main },
                marginX: "0.25rem",
              }}
              onClick={() => handleOpenModal("Register")}
            >
              Register
            </Button>{" "}
            to save
          </>
        )}
      </DialogActions>
      {!isLoggedIn && (
        <DialogWrapper
          isOpen={isModalOpen}
          title={modalType}
          closeModal={() => setIsModalOpen(false)}
        >
          <LoginRegisterDialogContent
            pageType={modalType}
            setModalType={setModalType}
            closeModal={() => setIsModalOpen(false)}
          />
        </DialogWrapper>
      )}
    </>
  );
};

export default CRUDDialogContent;
