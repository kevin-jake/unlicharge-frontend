import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    var prop;
    event.target.id ? (prop = event.target.id) : (prop = event.target.name);
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSubmit = (event) => {
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
