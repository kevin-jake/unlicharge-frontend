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
    .positive("Max Voltage must be greater than zero"),
  minVoltage: yup
    .number()
    .typeError("Min Voltage must be a number")
    .positive("Min Voltage must be greater than zero"),
  supplierLink: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
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

export const initialValuesLogin = {
  email: "",
  password: "",
};
