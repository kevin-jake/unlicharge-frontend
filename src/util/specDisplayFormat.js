import { kiloformat, numberWithCommas } from "./numberFormats";

export const specMap = [
  {
    nameDisplay: "Name",
    specProps: "name",
    required: true,
    textField: true,
    specOf: ["Battery", "BMS", "Active Balancer"],
  },
  {
    nameDisplay: "Brand",
    specProps: "brand",
    textField: true,
    specOf: ["Battery", "BMS", "Active Balancer"],
  },
  {
    nameDisplay: "Supplier",
    specProps: "supplier",
    textField: true,
    specOf: ["Battery", "BMS", "Active Balancer"],
  },
  {
    nameDisplay: "Supplier Link",
    specProps: "supplierLink",
    textField: true,
    specOf: ["Battery", "BMS", "Active Balancer"],
  },
  {
    nameDisplay: "Price",
    specProps: "price",
    unit: "Php",
    textField: true,
    specOf: ["BMS", "Active Balancer"],
    required: true,
  },
  {
    nameDisplay: "Battery Type",
    specProps: "battType",
    textField: true,
    specOf: ["Battery", "BMS"],
    required: true,
  },
  {
    nameDisplay: "Model",
    specProps: "model",
    textField: true,
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Nominal Voltage",
    specProps: "nominalVoltage",
    unit: "V",
    textField: true,
    specOf: ["Battery"],
    required: true,
  },
  {
    nameDisplay: "Capacity",
    specProps: "capacity",
    unit: "Ah",
    textField: true,
    specOf: ["Battery"],
    required: true,
  },
  {
    nameDisplay: "Internal Resistance",
    specProps: "internalResistance",
    unit: "mΩ",
    textField: true,
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Charge C Rate",
    specProps: "chargeCRate",
    unit: "C",
    textField: true,
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Discharge C Rate",
    specProps: "dischargeCRate",
    unit: "C",
    textField: true,
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Max Discharge C Rate",
    specProps: "maxDischargeRate",
    unit: "C",
    textField: true,
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Maximum Voltage",
    specProps: "maxVoltage",
    specOf: ["Battery"],
    textField: true,
    unit: "V",
  },
  {
    nameDisplay: "Minimum Voltage",
    specProps: "minVoltage",
    specOf: ["Battery"],
    textField: true,
    unit: "V",
  },
  {
    nameDisplay: "Price per Pc.",
    specProps: "pricePerPc",
    specOf: ["Battery"],
    unit: "Php",
    textField: true,
    required: true,
  },
  {
    nameDisplay: "Strings",
    specProps: "strings",
    specOf: ["BMS", "Active Balancer"],
    unit: "S",
    textField: true,
    required: true,
  },
  {
    nameDisplay: "Charging Current",
    specProps: "chargeCurrent",
    specOf: ["BMS"],
    unit: "A",
    textField: true,
    required: true,
  },
  {
    nameDisplay: "Discharging Current",
    specOf: ["BMS"],
    textField: true,
    specProps: "dischargeCurrent",
    required: true,
    unit: "A",
  },
  {
    nameDisplay: "Voltage",
    specOf: ["BMS"],
    textField: true,
    specProps: "voltage",
    unit: "V",
  },
  {
    nameDisplay: "Port Type",
    specOf: ["BMS"],
    textField: true,
    specProps: "portType",
  },
  {
    nameDisplay: "Balance Current",
    specOf: ["Active Balancer"],
    textField: true,
    specProps: "balanceCurrent",
    unit: "A",
  },
  {
    nameDisplay: "Balancing Type",
    specOf: ["Active Balancer"],
    textField: true,
    specProps: "balancingType",
  },

  // Computed specs display
  {
    nameDisplay: "Series Cells",
    specProps: "totalSeries",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Total Capacity in Watt-hours",
    specProps: "totalWh",
    unit: "Wh",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Parallel Cells",
    specProps: "totalParallel",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Nominal Voltage",
    specProps: "totalNominalVolt",
    unit: "V",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Maximum Voltage",
    specProps: "totalMaxVolt",
    unit: "V",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Minimum Voltage",
    specProps: "totalMinVolt",
    unit: "V",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Charge C Rate",
    specProps: "totalchargeCrate",
    unit: "A",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Discharge C Rate",
    specProps: "totalDischargeCRate",
    unit: "A",
    specOf: ["Battery"],
  },
  {
    nameDisplay: "Depth of Discharge (DOD)",
    specProps: "totaldod",
    unit: "%",
    specOf: ["Battery"],
  },
];

export const specDisplay = (spec) => {
  return specMap.filter((specs) => specs.specProps === spec)[0].nameDisplay;
};

export const specWithUnit = (spec, value, isMah) => {
  const specUnit = specMap.filter((specs) => specs.specProps === spec)[0].unit;
  if (specUnit) {
    if (isMah) {
      const mahVal = +value * 1000;
      return kiloformat(mahVal, "mAh");
    }
    return specUnit === "Php"
      ? `${specUnit} ${numberWithCommas(value)}`
      : kiloformat(value, specUnit);
  } else return value;
};
