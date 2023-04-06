import { Search } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
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
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  selectCategory,
  selectFilters,
  setFilters,
} from "../../store/slices/buildpage/buildpageSlice";
import PriceSliders from "../../components/PriceSliders";

const BuildFilters = ({ refetch }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const category = useSelector(selectCategory);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [expanded, setExpanded] = useState(false);
  const neutralLight = palette.neutral.light;
  const medium = palette.neutral.medium;
  const parsedBattType = Boolean(filters?.battType)
    ? JSON.parse(filters?.battType)
    : [];
  const [searchBattType, setSearchBattType] = useState({
    "Lead Acid": parsedBattType.includes("Lead Acid"),
    LiFePo4: parsedBattType.includes("LiFePo4"),
    "Li-On": parsedBattType.includes("Li-On"),
  });
  // TODO: convert this to useRef
  const [searchBar, setSearchBar] = useState(filters.search);
  const [priceRangeValue, setPriceRangeValue] = useState([
    filters.minPrice,
    filters.maxPrice,
  ]);

  const handleCheckbox = (e) => {
    setSearchBattType({
      ...searchBattType,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSearch = () => {
    const battType = Object.keys(searchBattType).filter(
      (prop) => searchBattType[prop]
    );
    dispatch(
      setFilters({
        minPrice: priceRangeValue[0],
        maxPrice: priceRangeValue[1],
        battType: JSON.stringify(battType),
        search: searchBar,
      })
    );
    if (
      filters !=
      {
        battType: JSON.stringify(battType),
        search: searchBar,
      }
    )
      refetch();
  };

  const handleClearAll = () => {
    setSearchBattType({});
    setSearchBar("");
    setPriceRangeValue([filters.minPrice, filters.maxPrice]);
    dispatch(resetFilters());
  };
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
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              padding="0.1rem 1.5rem"
              marginX="1rem"
              width="100%"
            >
              <InputBase
                placeholder="Search..."
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value)}
                sx={{ width: "inherit" }}
              />
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </FlexBetween>
            <Typography variant="h5">Filters</Typography>
          </FlexBetween>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="text"
              sx={{ minWidth: 100, color: medium, textTransform: "none" }}
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </Box>
          <FlexBetween margin="5px">
            <PriceSliders
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              priceRangeValue={priceRangeValue}
              setPriceRangeValue={setPriceRangeValue}
            />
            {/* TODO: Add more filters for BMS and active balancer and extract into a component */}
            {category === "battery" && (
              <>
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Lead Acid"
                            checked={searchBattType["Lead Acid"]}
                            onChange={handleCheckbox}
                          />
                        }
                        label="Lead Acid"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="LiFePo4"
                            checked={searchBattType["LiFePo4"]}
                            onChange={handleCheckbox}
                          />
                        }
                        label="LiFePo4"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Li-On"
                            checked={searchBattType["Li-On"]}
                            onChange={handleCheckbox}
                          />
                        }
                        label="Li-On"
                      />
                    </FormGroup>
                  </FlexBetween>
                </Box>
              </>
            )}
          </FlexBetween>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BuildFilters;
