import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";

export const useForm = (callback, initialState = {}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [values, setValues] = useState(initialState);
  useEffect(() => {
    setValues({});
  }, [isLoggedIn]);

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
