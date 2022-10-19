// Logic for incompatibilities of parts
// Returns an object with two properties notifType and msg
// notifType - possible values are "WARN" and "ERR"
// msg - is string message

// Naming convention:
// input_* means all arguments or variable with this prefix is coming from input of user
// data_* means all variables or arguments is from the database or builtin data from the ui
// total_* means this is an output of a function
// total* is the return to the caller

export const stringCompatibility = (
  total_battInSeries,
  data_string,
  partType, // Either BMS or Active Balancer
  input_battVoltage
) => {
  console.log({ total_battInSeries });
  console.log({ data_string });

  if (total_battInSeries && data_string) {
    if (total_battInSeries !== data_string) {
      return {
        notifType: "ERR",
        part: partType,
        msg:
          partType +
          " have " +
          data_string +
          " connections your Battery needs " +
          total_battInSeries +
          "S.",
      };
    }
  }
  return false;
};
