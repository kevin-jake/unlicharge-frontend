export const categoryFormat = (category) => {
  switch (category) {
    case "battery":
      return "Battery";
    case "bms":
      return "BMS";
    case "an":
      return "Active Balancer";
  }
};
