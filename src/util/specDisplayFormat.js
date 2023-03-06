export const specDisplay = (spec) => {
  const specMap = [
    {
      nameDisplay: "Brand",
      specProps: "brand",
    },
    {
      nameDisplay: "Battery Type",
      specProps: "battType",
    },
    {
      nameDisplay: "Capacity",
      specProps: "capacity",
    },
    {
      nameDisplay: "Name",
      specProps: "name",
    },
    {
      nameDisplay: "Supplier",
      specProps: "supplier",
    },
    {
      nameDisplay: "Nominal Voltage",
      specProps: "nominalVoltage",
    },
    {
      nameDisplay: "Maximum Voltage",
      specProps: "maxVoltage",
    },
    {
      nameDisplay: "Minimum Voltage",
      specProps: "minVoltage",
    },
    {
      nameDisplay: "Supplier Link",
      specProps: "supplierLink",
    },
    {
      nameDisplay: "Price per Pc.",
      specProps: "pricePerPc",
    },
    {
      nameDisplay: "Strings",
      specProps: "strings",
    },
    {
      nameDisplay: "Charging Current",
      specProps: "chargeCurrent",
    },
    {
      nameDisplay: "Discharging Current",
      specProps: "dischargeCurrent",
    },
    {
      nameDisplay: "Voltage",
      specProps: "voltage",
    },
    {
      nameDisplay: "Port Type",
      specProps: "portType",
    },
    {
      nameDisplay: "Price",
      specProps: "price",
    },
    {
      nameDisplay: "Balance Current",
      specProps: "balanceCurrent",
    },
    {
      nameDisplay: "Balancing Type",
      specProps: "balancingType",
    },
  ];

  return specMap.filter((specs) => specs.specProps === spec)[0].nameDisplay;
};
