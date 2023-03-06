export const specMap = [
  {
    nameDisplay: "Name",
    specProps: "name",
    specOf: ["Battery", "BMS", "Active Balancer"],
  },
  {
    nameDisplay: "Brand",
    specProps: "brand",
    specOf: ["Battery", "BMS", "Active Balancer"],
  },
  {
    nameDisplay: "Supplier",
    specProps: "supplier",
    specOf: ["Battery", "BMS", "Active Balancer"],
  },
  {
    nameDisplay: "Supplier Link",
    specProps: "supplierLink",
    specOf: ["Battery", "BMS", "Active Balancer"],
  },
  {
    nameDisplay: "Price",
    specProps: "price",
    unit: "Php",
    specOf: ["BMS", "Active Balancer"],
  },
  {
    nameDisplay: "Battery Type",
    specProps: "battType",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Capacity",
    specProps: "capacity",
    unit: "Ah",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Nominal Voltage",
    specProps: "nominalVoltage",
    unit: "V",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Maximum Voltage",
    specProps: "maxVoltage",
    specOf: ["Battery"],
    unit: "V",
  },
  {
    nameDisplay: "Minimum Voltage",
    specProps: "minVoltage",
    specOf: ["Battery"],
    unit: "V",
  },
  {
    nameDisplay: "Price per Pc.",
    specProps: "pricePerPc",
    specOf: ["Battery"],
    unit: "Php",
  },
  {
    nameDisplay: "Strings",
    specProps: "strings",
    specOf: ["BMS", "Active Balancer"],
    unit: "S",
  },
  {
    nameDisplay: "Charging Current",
    specProps: "chargeCurrent",
    specOf: ["Active Balancer"],
    unit: "A",
  },
  {
    nameDisplay: "Discharging Current",
    specOf: ["Active Balancer"],
    specProps: "dischargeCurrent",
    unit: "A",
  },
  {
    nameDisplay: "Voltage",
    specOf: ["BMS"],
    specProps: "voltage",
    unit: "V",
  },
  {
    nameDisplay: "Port Type",
    specOf: ["BMS"],
    specProps: "portType",
  },
  {
    nameDisplay: "Balance Current",
    specOf: ["Active Balancer"],
    specProps: "balanceCurrent",
    unit: "A",
  },
  {
    nameDisplay: "Balancing Type",
    specOf: ["Active Balancer"],
    specProps: "balancingType",
  },
];

export const specDisplay = (spec) => {
  return specMap.filter((specs) => specs.specProps === spec)[0].nameDisplay;
};

export const specWithUnit = (spec, value) => {
  const specUnit = specMap.filter((specs) => specs.specProps === spec)[0].unit;
  if (specUnit) {
    return specUnit === "Php" ? `${specUnit} ${value}` : `${value} ${specUnit}`;
  } else return value;
};
