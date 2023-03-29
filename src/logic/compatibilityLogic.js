const areBatteryAndBMSNotCompatible = (selected_battery, selected_bms) => {
  let issues = {
    battery: [],
    bms: [],
  };
  if (
    selected_battery.hasOwnProperty("id") &&
    selected_bms.hasOwnProperty("id")
  ) {
    const {
      battType: bmsBattType,
      chargeCurrent,
      dischargeCurrent,
    } = selected_bms || {};
    const {
      totalParallel,
      totalchargeCrate,
      totalDischargeCRate,
      // totalMaxDischargeCRate,
    } = selected_battery.computedSpecs || {};

    //   Check string compatibility
    if (totalParallel !== selected_bms.strings) {
      const message = `BMS strings is ${selected_bms.strings} the battery pack needs ${totalParallel}`;
      issues.battery.push({ message, severity: "error" });
      issues.bms.push({ message, severity: "error" });
    }

    // Check if BMS battery type is equal to battery selected_battery.battType
    if (selected_battery.battType !== bmsBattType) {
      const message = `Battery type is different from the selected BMS battery type parameter.`;
      issues.battery.push({ message, severity: "warning" });
      issues.bms.push({ message, severity: "warning" });
    }

    // Check charge rate compatibility
    if (
      selected_battery.battType !== "Lead Acid" &&
      totalchargeCrate < chargeCurrent
    ) {
      const message = `BMS charge current is higher than the allowed battery charging current based from C rate. Ideal BMS charge current must be ${totalchargeCrate} A or below.`;
      issues.battery.push({ message, severity: "warning" });
      issues.bms.push({ message, severity: "warning" });
    }

    // Check discharge rate compatibility
    if (
      selected_battery.battType !== "Lead Acid" &&
      totalDischargeCRate < dischargeCurrent
    ) {
      const message = `BMS discharge current is higher than the allowed battery discharging current based from C rate. Ideal BMS discharge current must be ${totalDischargeCRate} A or below.`;
      issues.battery.push({ message, severity: "warning" });
      issues.bms.push({ message, severity: "warning" });
    }
  }

  //   Check if BMS is needed
  if (selected_battery.battType === "Lead Acid" && Boolean(selected_bms)) {
    const message = `Lead Acid batteries might not need a BMS`;
    issues.battery.push({ message, severity: "warning" });
    issues.bms.push({ message, severity: "warning" });
  }

  if (issues.battery.length || issues.bms.length) {
    return issues;
  }

  return false;
};

const areBatteryAndABNotCompatible = (selected_battery, selected_ab) => {
  let issues = {
    battery: [],
    ab: [],
  };
  //   Check string compatibility
  if (
    selected_battery.hasOwnProperty("id") &&
    selected_ab.hasOwnProperty("id")
  ) {
    if (
      Boolean(selected_battery.computedSpecs) &&
      selected_battery.computedSpecs.totalParallel !== selected_ab.strings
    ) {
      const message = `BMS strings is ${selected_ab.strings} the battery pack needs ${selected_battery.computedSpecs.totalParallel}`;
      issues.battery.push({ message, severity: "error" });
      issues.ab.push({ message, severity: "error" });
    }
  }
  if (issues.battery.length || issues.ab.length) {
    return issues;
  }
  return false;
};

export const areProductsCompatible = (
  selected_battery,
  selected_bms,
  selected_ab
) => {
  let battery = [];
  let ab = [];
  let bms = [];
  const isBattBMSNotOK = areBatteryAndBMSNotCompatible(
    selected_battery,
    selected_bms
  );
  const isBattABNotOK = areBatteryAndABNotCompatible(
    selected_battery,
    selected_ab
  );

  if (Boolean(isBattBMSNotOK)) {
    battery = battery.concat(isBattBMSNotOK.battery);
    bms = bms.concat(isBattBMSNotOK.bms);
  }
  if (Boolean(isBattABNotOK)) {
    battery = battery.concat(isBattABNotOK.battery);
    ab = ab.concat(isBattABNotOK.ab);
  }

  return { battery, bms, ab };
};
