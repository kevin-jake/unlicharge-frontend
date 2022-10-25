import { gql } from "@apollo/client";

const FETCH_BATTERY = gql`
  query GetBatteries($userId: ID) {
    getBatteries(userId: $userId) {
      id
      name
      type
      model
      min_voltage
      max_voltage
      nominal_voltage
      price_per_pc
      c_Rate
      capacity
      supplier
      image_url
      publish_status
      creator {
        username
      }
      createdAt
    }
  }
`;

const FETCH_BATTERY_REQ = gql`
  query GetBattEditRequests {
    getBattEditRequests {
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
`;

const FETCH_BMS = gql`
  query GetBMSes($userId: ID) {
    getBMSes(userId: $userId) {
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

const FETCH_AB = gql`
  query GetActiveBalancers($userId: ID) {
    getActiveBalancers(userId: $userId) {
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

export { FETCH_BATTERY, FETCH_BATTERY_REQ, FETCH_BMS, FETCH_AB };
