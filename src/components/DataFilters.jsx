import { Search } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  Slider,
  Stack,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  useMediaQuery,
  AccordionDetails,
} from "@mui/material";
import { setPosts } from "../state/state";
import FlexBetween from "./FlexBetween";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DataFilters = () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:5000/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };
  // TODO: Add functionality
  return (
    <Box
      sx={{
        position: isNonMobileScreens ? "sticky" : "static",
        top: "1rem",
        height: "100%",
      }}
      flexBasis={isNonMobileScreens ? "13%" : undefined}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filters"
          id="filters"
        >
          <Typography variant="h5">Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FlexBetween marginBottom="5px" sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="text"
              sx={{ minWidth: 100, color: medium, textTransform: "none" }}
            >
              Clear All
            </Button>
          </FlexBetween>
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            padding="0.1rem 1.5rem"
            marginBottom="20px"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
          <Divider color={neutralLight} />
          <Typography
            marginTop="5px"
            color={medium}
            variant="h6"
            fontWeight="500"
          >
            Price
          </Typography>
          <FlexBetween
            borderRadius="9px"
            marginBottom="20px"
            padding="0.1rem 1.5rem"
          >
            <Box variant="flex">
              <Slider
                defaultValue={50}
                aria-label="Default"
                valueLabelDisplay="auto"
              />
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <TextField
                  label="Min"
                  type="number"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "90px" }}
                />
                <Typography>-</Typography>
                <TextField
                  label="Max"
                  type="number"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "90px" }}
                />
              </Stack>
            </Box>
          </FlexBetween>
          <Divider color={neutralLight} />
          <Typography
            marginTop="5px"
            color={medium}
            variant="h6"
            fontWeight="500"
          >
            Battery Type
          </Typography>
          <FlexBetween
            borderRadius="9px"
            marginBottom="20px"
            padding="0.1rem 1.5rem"
          >
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Lead Acid" />
              <FormControlLabel control={<Checkbox />} label="LiFePo4" />
              <FormControlLabel control={<Checkbox />} label="Lithium Ion" />
            </FormGroup>
          </FlexBetween>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DataFilters;
