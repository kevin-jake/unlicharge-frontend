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
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  useMediaQuery,
  AccordionDetails,
} from "@mui/material";
import FlexBetween from "../../components/wrappers/FlexBetween";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const BuildFilters = () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [expanded, setExpanded] = useState(false);
  const neutralLight = palette.neutral.light;
  const medium = palette.neutral.medium;

  // TODO: Add functionality
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Accordion
        sx={{
          boxShadow: 0,
        }}
        expanded={expanded}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setExpanded(!expanded)} />}
          aria-controls="filters"
          id="filters"
          sx={{
            "& .MuiAccordionSummary-content ": {
              display: "block",
              cursor: "default",
            },
          }}
        >
          <FlexBetween>
            <Typography variant="h5">Filters</Typography>
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          </FlexBetween>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            variant="text"
            sx={{ minWidth: 100, color: medium, textTransform: "none" }}
          >
            Clear All
          </Button>
          <FlexBetween margin="5px">
            <Box width="100%">
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
                <Box
                  display="flex"
                  gap="0.25rem"
                  flexDirection="row"
                  width="100%"
                >
                  <TextField
                    label="Min"
                    type="number"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "90px" }}
                  />
                  <Slider
                    defaultValue={50}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />

                  <TextField
                    label="Max"
                    type="number"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "90px" }}
                  />
                </Box>
              </FlexBetween>
            </Box>
            <Divider
              color={neutralLight}
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <Box width="100%" marginX="1rem">
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
                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} label="Lead Acid" />
                  <FormControlLabel control={<Checkbox />} label="LiFePo4" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Lithium Ion"
                  />
                </FormGroup>
              </FlexBetween>
            </Box>
          </FlexBetween>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BuildFilters;
