export const specMap = [
  {
    nameDisplay: "Name",
    specProps: "name",
    specOf: ["Battery", "BMS", "Active Balancer"],
    required: true,
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
    required: true,
  },
  {
    nameDisplay: "Battery Type",
    specProps: "battType",
    specOf: ["Battery"],
    required: true,
  },
  {
    nameDisplay: "Capacity",
    specProps: "capacity",
    unit: "Ah",
    specOf: ["Battery"],
    required: true,
  },
  {
    nameDisplay: "Nominal Voltage",
    specProps: "nominalVoltage",
    unit: "V",
    specOf: ["Battery"],
    required: true,
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
    required: true,
  },
  {
    nameDisplay: "Strings",
    specProps: "strings",
    specOf: ["BMS", "Active Balancer"],
    unit: "S",
    required: true,
  },
  {
    nameDisplay: "Charging Current",
    specProps: "chargeCurrent",
    specOf: ["BMS"],
    unit: "A",
    required: true,
  },
  {
    nameDisplay: "Discharging Current",
    specOf: ["BMS"],
    specProps: "dischargeCurrent",
    required: true,
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
