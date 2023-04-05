import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserImage from "../../components/UserImage";
import { Box, Button, Divider, useTheme } from "@mui/material";
import { selectUser } from "../../store/slices/auth/authSlice";
import EditProfileForm from "./EditProfileForm";
import ViewProfile from "./ViewProfile";
import EditIcon from "@mui/icons-material/Edit";

const UserWidget = () => {
  const { palette } = useTheme();
  const user = useSelector(selectUser);
  const [isEditMode, setIsEditMode] = useState(false);

  const { imagePath } = user;

  return (
    <Box
      gap={2}
      sx={{
        width: "100%",
        padding: "1.5rem 1.5rem 0.75rem 1.5rem",
        backgroundColor: palette.background.alt,
        borderRadius: "0.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant={isEditMode ? "contained" : "outlined"}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          <EditIcon sx={{ marginX: 1 }} /> Edit Profile
        </Button>
      </Box>
      <Box>
        <Divider>
          <UserImage image={imagePath} size="80px" />
        </Divider>
      </Box>
      {isEditMode ? (
        <EditProfileForm user={user} />
      ) : (
        <ViewProfile user={user} />
      )}
    </Box>
  );
};

export default UserWidget;
