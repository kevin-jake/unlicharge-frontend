import * as yup from "yup";

export const batterySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  battType: yup.string().required("Battery Type is required"),
  nominalVoltage: yup
    .number()
    .typeError("Nominal Voltage must be a number")
    .positive("Nominal Voltage must be greater than zero")
    .required("Nominal Voltage is required"),
  capacity: yup
    .number()
    .typeError("Capacity must be a number")
    .positive("Capacity must be greater than zero")
    .required("Capacity is required"),
  pricePerPc: yup
    .number()
    .typeError("Price per Pc must be a number")
    .positive("Price per Pc must be greater than zero")
    .required("Price per Pc is required"),
  minVoltage: yup
    .number()
    .nullable()
    .test(
      "is-valid-number",
      "Minimum voltage must be a valid number",
      (value) =>
        !value || (typeof value === "number" && !isNaN(value) && value > 0)
    ),
  maxVoltage: yup
    .number()
    .nullable()
    .when("minVoltage", {
      is: (minVoltage) => minVoltage !== null && minVoltage !== undefined,
      then: yup
        .number()
        .test(
          "is-greater-than",
          "Maximum voltage must be greater than or equal to minimum voltage",
          function (value) {
            return (
              value !== null &&
              value !== undefined &&
              value >= this.resolve(yup.ref("minVoltage"))
            );
          }
        ),
      otherwise: yup.number().nullable(),
    })
    .test(
      "is-valid-number",
      "Maximum voltage must be a valid number",
      (value) =>
        !value || (typeof value === "number" && !isNaN(value) && value > 0)
    ),
  supplierLink: yup
    .string()
    .matches(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      "Enter a valid link!"
    ),
});

export const initialBatteryValues = {
  name: "",
  battType: "",
  nominalVoltage: "",
  capacity: "",
  internalResistance: "",
  chargeCRate: "",
  dischargeCRate: "",
  maxDischargeRate: "",
  pricePerPc: "",
  maxVoltage: "",
  minVoltage: "",
  model: "",
  imagePath: "",
  brand: "",
  supplierLink: "",
  supplier: "",
};

export const bmsSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  strings: yup
    .number()
    .typeError("Strings must be a number")
    .positive("Strings must be greater than zero")
    .required("Strings is required"),
  chargeCurrent: yup
    .number()
    .typeError("Charge Current must be a number")
    .positive("Charge Current must be greater than zero")
    .required("Charge Current is required"),
  dischargeCurrent: yup
    .number()
    .typeError("Discharge Current must be a number")
    .positive("Discharge Current must be greater than zero")
    .required("Discharge Current is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
  supplierLink: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter a valid link!"
    ),
});

export const initialBMSValues = {
  name: "",
  imagePath: "",
  brand: "",
  supplierLink: "",
  supplier: "",
  strings: "",
  chargeCurrent: "",
  dischargeCurrent: "",
  portType: "",
  voltage: "",
  price: "",
};

export const abSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  strings: yup
    .number()
    .typeError("Strings must be a number")
    .positive("Strings must be greater than zero")
    .required("Strings is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
  supplierLink: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter a valid link!"
    ),
});

export const initialABValues = {
  name: "",
  imagePath: "",
  brand: "",
  supplierLink: "",
  supplier: "",
  strings: "",
  balanceCurrent: "",
  balancingType: "",
  price: "",
};

export const initialDeleteFormValues = {
  deleteReason: "",
  commentBody: "",
};

export const deleteFormSchema = yup.object().shape({
  deleteReason: yup.string().required("Reason is required"),
});
