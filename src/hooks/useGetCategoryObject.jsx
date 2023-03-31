import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Battery5BarIcon from "@mui/icons-material/Battery5Bar";
import EqualizerIcon from "@mui/icons-material/Equalizer";

export const useGetCategoryObject = (category, isResponsive) => {
  let fontSize = isResponsive ? "large" : "small";
  switch (category) {
    case "battery":
      return {
        categoryDisplayName: "Battery",
        icon: <Battery5BarIcon fontSize={fontSize} />,
      };
    case "bms":
      return {
        categoryDisplayName: "BMS",
        icon: <AccountTreeIcon fontSize={fontSize} />,
      };
    case "ab":
      return {
        categoryDisplayName: "Active Balancer",
        icon: <EqualizerIcon fontSize={fontSize} />,
      };
  }
};
