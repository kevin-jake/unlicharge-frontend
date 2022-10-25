import { gql } from "@apollo/client";

// User Specific gql mutations
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $name: String!
    $mobile_number: String!
    $address: String
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        name: $name
        mobile_number: $mobile_number
        address: $address
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

// Parts list gql mutations
const CREATE_BATT = gql`
  mutation CreateBattery(
    $name: String!
    $type: String!
    $model: String!
    $nominal_voltage: String!
    $capacity: String!
    $price_per_pc: String!
    $min_voltage: String
    $max_voltage: String
    $supplier: String
    $image_url: String
  ) {
    createBattery(
      batteryInput: {
        name: $name
        type: $type
        model: $model
        nominal_voltage: $nominal_voltage
        capacity: $capacity
        price_per_pc: $price_per_pc
        min_voltage: $min_voltage
        max_voltage: $max_voltage
        supplier: $supplier
        image_url: $image_url
      }
    ) {
      id
      name
      type
      model
      nominal_voltage
      capacity
      price_per_pc
      min_voltage
      max_voltage
      supplier
      image_url
      publish_status
      createdAt
    }
  }
`;

const UPDATE_BATT = gql`
  mutation EditBattery(
    $battId: ID!
    $name: String!
    $type: String!
    $model: String!
    $nominal_voltage: String!
    $capacity: String!
    $price_per_pc: String!
    $min_voltage: String
    $max_voltage: String
    $supplier: String
  ) {
    editBattery(
      battId: $battId
      batteryInput: {
        name: $name
        type: $type
        model: $model
        nominal_voltage: $nominal_voltage
        capacity: $capacity
        price_per_pc: $price_per_pc
        min_voltage: $min_voltage
        max_voltage: $max_voltage
        supplier: $supplier
      }
    ) {
      edit_request {
        id
        name
        type
        model
        min_voltage
        max_voltage
        nominal_voltage
        price_per_pc
        c_Rate
        supplier
        requestor {
          username
        }
        status
        createdAt
        updatedAt
      }
    }
  }
`;

const DELETE_BATT = gql`
  mutation DeleteBattery($battId: ID!, $reason: String!) {
    deleteBattery(battId: $battId, reason: $reason) {
      delete_request {
        id
        requestor {
          username
        }
        reason
        status
        createdAt
        updatedAt
      }
    }
  }
`;

const CREATE_BMS = gql`
  mutation CreateBMS(
    $name: String!
    $brand: String
    $strings: String!
    $charge_current: String!
    $discharge_current: String!
    $port_type: String
    $voltage: String
    $price: String!
    $supplier: String
    $image_url: String
  ) {
    createBMS(
      bmsInput: {
        name: $name
        brand: $brand
        strings: $strings
        charge_current: $charge_current
        discharge_current: $discharge_current
        port_type: $port_type
        voltage: $voltage
        price: $price
        supplier: $supplier
        image_url: $image_url
      }
    ) {
      id
      name
      brand
      strings
      charge_current
      discharge_current
      port_type
      voltage
      price
      supplier
      image_url
      publish_status
      createdAt
    }
  }
`;

const CREATE_AB = gql`
  mutation CreateAB(
    $name: String!
    $brand: String
    $strings: String!
    $balance_current: String
    $balancing: String!
    $price: String!
    $supplier: String
    $image_url: String
  ) {
    createAB(
      abInput: {
        name: $name
        brand: $brand
        strings: $strings
        balance_current: $balance_current
        balancing: $balancing
        price: $price
        supplier: $supplier
        image_url: $image_url
      }
    ) {
      id
      name
      brand
      strings
      balance_current
      balancing
      price
      supplier
      image_url
      publish_status
      createdAt
    }
  }
`;

export {
  LOGIN_USER,
  REGISTER_USER,
  CREATE_AB,
  CREATE_BATT,
  UPDATE_BATT,
  DELETE_BATT,
  CREATE_BMS,
};
