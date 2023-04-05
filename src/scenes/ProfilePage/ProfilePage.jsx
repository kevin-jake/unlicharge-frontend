import {
  Box,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PageWrapper from "../../components/wrappers/PageWrapper";
import UserWidget from "./UserWidget";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/auth/authSlice";

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { username } = useSelector(selectUser);

  return (
    <PageWrapper title={username}>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <UserWidget />
      </Box>
    </PageWrapper>
  );
};

export default ProfilePage;
