import { Box } from "@mui/material";
import React from "react";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/placeholder-avatar.png";
        }}
      />
    </Box>
  );
};

export default UserImage;
