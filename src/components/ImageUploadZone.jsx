import { Box, Button, useTheme } from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeleteOutline } from "@mui/icons-material";
import { toast } from "react-toastify";

const ImageUploadZone = ({ setFieldValue, values, gridspan }) => {
  const { palette } = useTheme();
  const [files, setFiles] = useState([]);

  const areFilesPresent = Boolean(files.length);

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    setFieldValue("imagePath", null);
  };

  return (
    <Box
      gridColumn={`span ${gridspan}`}
      border={`1px solid ${palette.neutral.medium}`}
      borderRadius="5px"
      p="1rem"
      justifySelf={areFilesPresent ? "center" : ""}
    >
      <Dropzone
        accept={{ "image/jpg": [".jpg", ".jpeg", ".png"] }}
        maxSize={5242880}
        multiple={false}
        onDrop={(acceptedFiles, fileRejections) => {
          fileRejections.forEach((file) => {
            file.errors.forEach((err) => {
              if (err.code === "file-too-large") {
                toast.error(`File size must be 5MB or smaller.`);
              }

              if (err.code === "file-invalid-type") {
                toast.error(`Files must be in jpg, jpeg or png format only.`);
              }
            });
          });
          setFieldValue("imagePath", acceptedFiles[0]);
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            border={areFilesPresent ? "" : `2px dashed ${palette.primary.main}`}
            px="1rem"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <input {...getInputProps()} />
            {!values.imagePath ? (
              <p>Add Picture Here</p>
            ) : (
              <>
                <Box display="flex" justifyContent="center" marginBottom="1rem">
                  {files.map((file) => (
                    <Box width="120px" height="120px">
                      <img
                        style={{ objectFit: "cover" }}
                        width="120px"
                        height="120px"
                        src={file.preview}
                        alt={file.name}
                      />
                      <Box
                        sx={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "flex-end",
                          top: -46,
                          right: 0,
                          width: "100%",
                          bgcolor: "rgba(0, 0, 0, 0.54)",
                          color: "white",
                          padding: "10px",
                        }}
                      >
                        <EditOutlinedIcon />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        )}
      </Dropzone>
      {areFilesPresent && (
        <Box display="flex" justifyContent="center">
          <Button
            onClick={removeFile(files[0])}
            variant="outlined"
            size="small"
            endIcon={<DeleteOutline />}
          >
            Remove Image
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadZone;
