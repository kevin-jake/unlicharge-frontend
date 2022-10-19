import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "./Modal";
import { AuthContext } from "../context/auth-context";
import { useOperationForm } from "../hooks/useOperationForm";
import { GlobalContext } from "../context/global-context";
import Upload from "./UploadZone";
import { Stack } from "@mui/system";
import { gql, useMutation } from "@apollo/client";
import FormFields from "./FormFields";

// FIXME: Refactor the image upload before save function to be more optimized
const uploadFileMutation = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      Location
    }
  }
`;

const FormModal = ({ showFormModal, setShowFormModal, formData, title }) => {
  const { showSignInModal } = useContext(GlobalContext);
  const { isLoggedIn } = useContext(AuthContext);
  const properties = Object.getOwnPropertyNames(formData);
  const formDisplay = ["id", "__typename", "createdAt", "publish_status"];
  const operation = showFormModal.operation;
  const { values, onChange, onSubmit } = useOperationForm(title);
  const [imgButton, setImgButton] = useState(true);
  const [imageFile, setImageFile] = useState();
  const [uploadFile, { data }] = useMutation(uploadFileMutation);

  const handleSave = (event, operation) => {
    if (imageFile) {
      uploadFile({
        variables: { file: imageFile },
        onCompleted: (data) => {
          onSubmit(event, operation, data.uploadFile.Location);
        },
      });
    } else onSubmit(event, operation);
    setShowFormModal(false);
  };

  const handleImagebtn = (event) => {
    if (event.target.id === "uploadImg") {
      setImgButton(true);
    } else {
      setImgButton(false);
      setImageFile();
    }
  };

  return (
    <Modal
      showModal={showFormModal.open}
      title={
        operation === "Create"
          ? showFormModal.operation + " " + title
          : showFormModal.operation + " " + title + " " + formData.name
      }
      closeModal={() => setShowFormModal({ ...showFormModal, open: false })}
    >
      <Box>
        <div>
          <Grid container sx={{ padding: 2 }} spacing={2}>
            {operation === "Delete" && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="reason"
                  label="Reason"
                  placeholder="State your reason for removing here"
                  multiline
                  value={values.reason}
                  onChange={onChange}
                />
              </Grid>
            )}
            {operation !== "Delete" &&
              properties.map(
                (prop) =>
                  !formDisplay.includes(prop) && (
                    <FormFields
                      prop={prop}
                      formData={formData}
                      values={values}
                      onChange={onChange}
                      onSubmit={onSubmit}
                    />
                  )
              )}
            {!imgButton && operation === "Create" && (
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="image_url"
                  label="Image Address"
                  value={values.image_url}
                  onChange={onChange}
                />
              </Grid>
            )}
          </Grid>
        </div>
        {operation === "Create" && (
          <>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
              <Stack direction="row" spacing={2} alignItems="center" margin={1}>
                <Button
                  variant={imgButton ? "contained" : "outlined"}
                  size="small"
                  id="uploadImg"
                  sx={{
                    margin: 1,
                    textTransform: "none",
                    ...(imgButton ? { color: "white" } : {}),
                  }}
                  onClick={handleImagebtn}
                >
                  Image Upload
                </Button>
                <Typography variant="body2" component="span">
                  or
                </Typography>
                <Button
                  variant={imgButton ? "outlined" : "contained"}
                  size="small"
                  id="imgaddr"
                  sx={{
                    margin: 1,
                    textTransform: "none",
                    ...(imgButton ? {} : { color: "white" }),
                  }}
                  onClick={handleImagebtn}
                >
                  Type the Image Address
                </Button>
              </Stack>
              {imgButton && (
                <Upload imageFile={imageFile} setImageFile={setImageFile} />
              )}
            </div>
          </>
        )}
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        {
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white", margin: 1, textTransform: "none" }}
            onClick={(e) =>
              isLoggedIn
                ? handleSave(e, operation)
                : showSignInModal(true, true)
            }
          >
            {operation === "Delete" ? "Delete" : "Save"}
          </Button>
        }
        <Button
          variant="contained"
          size="small"
          sx={{ color: "white", margin: 1, textTransform: "none" }}
          onClick={() => setShowFormModal({ ...showFormModal, open: false })}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default FormModal;
