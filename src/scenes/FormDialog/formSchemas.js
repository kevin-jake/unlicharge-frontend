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
  maxVoltage: yup
    .number()
    .typeError("Max Voltage must be a number")
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .moreThan(-1, "Max Voltage must be greater than a negative number"),
  minVoltage: yup
    .number()
    .typeError("Min Voltage must be a number")
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .moreThan(-1, "Min Voltage must be greater than a negative number"),
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
  pricePerPc: "",
  maxVoltage: "",
  minVoltage: "",
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
  balanceCurrent: yup
    .number()
    .typeError("Balancing Current must be a number")
    .positive("Balancing Current must be greater than zero")
    .required("Balancing Current is required"),
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
