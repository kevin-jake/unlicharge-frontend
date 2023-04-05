import { Box } from "@mui/material";
import React from "react";
import placeholderAvatar from "../../public/placeholder-avatar.png";

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
          currentTarget.src = placeholderAvatar;
        }}
      />
    </Box>
  );
};

export default UserImage;
