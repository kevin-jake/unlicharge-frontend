import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import {
  CREATE_AB,
  CREATE_BATT,
  CREATE_BMS,
  DELETE_BATT,
  UPDATE_BATT,
} from "../util/graphql/Mutation";
import { FETCH_AB, FETCH_BATTERY, FETCH_BMS } from "../util/graphql/Query";

export const useOperationForm = (partsTitle) => {
  function titleSelect(partsTitle) {
    switch (partsTitle) {
      case "Battery": {
        return {
          initialState: {
            name: "",
            type: "",
            model: "",
            nominal_voltage: "",
            capacity: "",
            price_per_pc: "",
            min_voltage: "",
            max_voltage: "",
            supplier: "",
            image_url: "",
          },
          gql_mutation: CREATE_BATT,
          gql_mutation_edit: UPDATE_BATT,
          gql_mutation_delete: DELETE_BATT,
          gql_query: FETCH_BATTERY,
          dataArray: "getBatteries",
        };
      }
      case "BMS": {
        return {
          initialState: {
            name: "",
            brand: "",
            strings: "",
            charge_current: "",
            discharge_current: "",
            port_type: "",
            voltage: "",
            price: "",
            supplier: "",
            image_url: "",
          },
          gql_mutation: CREATE_BMS,
          // FIXME:
          gql_mutation_edit: UPDATE_BATT,
          gql_query: FETCH_BMS,
          dataArray: "getBMSes",
        };
      }
      case "Active Balancer": {
        return {
          initialState: {
            name: "",
            brand: "",
            strings: "",
            balance_current: "",
            balancing: "",
            price: "",
            supplier: "",
            image_url: "",
          },
          gql_mutation: CREATE_AB,
          // FIXME:
          gql_mutation_edit: UPDATE_BATT,
          gql_query: FETCH_AB,
          dataArray: "getActiveBalancers",
        };
      }
    }
  }
  const { userId } = useContext(AuthContext);
  const [values, setValues] = useState(titleSelect(partsTitle).initialState);

  useEffect(() => {
    setValues(titleSelect(partsTitle).initialState);
  }, [partsTitle]);

  const [onCreate, createResponse] = useMutation(
    titleSelect(partsTitle).gql_mutation,
    {
      variables: values,
      update(proxy, result) {
        const data = proxy.readQuery({
          query: titleSelect(partsTitle).gql_query,
          variables: { userId },
        });

        const dataObj = {
          [titleSelect(partsTitle).dataArray]: [
            Object.values(result.data)[0],
            ...data[titleSelect(partsTitle).dataArray],
          ],
        };
        proxy.writeQuery({
          query: titleSelect(partsTitle).gql_query,
          variables: { userId },
          data: dataObj,
        });
        setValues(titleSelect(partsTitle).initialState);
      },
    }
  );

  const [onEdit, editResponse] = useMutation(
    titleSelect(partsTitle).gql_mutation_edit,
    {
      variables: values,
    }
  );

  const [onDelete, deleteResponse] = useMutation(
    titleSelect(partsTitle).gql_mutation_delete,
    {
      variables: values,
    }
  );

  const onChange = (event) => {
    var prop;
    event.target.id ? (prop = event.target.id) : (prop = event.target.name);
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSubmit = (event, operation, image_url, id) => {
    switch (operation) {
      case "Create": {
        if (image_url) {
          onCreate({ variables: { ...values, image_url } });
        } else onCreate();
      }
      case "Edit": {
        onEdit({ variables: { ...values, battId: id } });
      }
      case "Delete": {
        onDelete({ variables: { reason: values.reason, battId: id } });
      }
    }
  };

  console.log({ values });
  return {
    onChange,
    onSubmit,
    setValues,
    values,
  };
};
