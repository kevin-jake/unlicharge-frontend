export const categoryFormat = (category) => {
  switch (category) {
    case "Batter":
      return "battery";
    case "BMS":
      return "bms";
    case "Active Balancer":
      return "ab";
  }
};
