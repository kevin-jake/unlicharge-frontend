import { gql } from "@apollo/client";

const FETCH_BATTERY = gql`
  query GetBatteries($userId: ID, $requests: Boolean) {
    getBatteries(userId: $userId, requests: $requests) {
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
  query GetBMSes($userId: ID, $requests: Boolean) {
    getBMSes(userId: $userId, requests: $requests) {
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
      creator {
        username
      }
      image_url
      publish_status
      createdAt
    }
  }
`;

const FETCH_BMS_REQ = gql`
  query GetBMSEditRequests {
    getBMSEditRequests {
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
      requestor {
        username
      }
      status
      createdAt
      updatedAt
    }
  }
`;

const FETCH_AB = gql`
  query GetActiveBalancers($userId: ID, $requests: Boolean) {
    getActiveBalancers(userId: $userId, requests: $requests) {
      id
      name
      brand
      strings
      balance_current
      balancing
      price
      supplier
      creator {
        username
      }
      image_url
      publish_status
      createdAt
    }
  }
`;

const FETCH_AB_REQ = gql`
  query GetABEditRequests {
    getABEditRequests {
      id
      name
      brand
      strings
      balance_current
      balancing
      price
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

const FETCH_PARTS_DEL_REQ = gql`
  query GetPartsDeleteRequests($table: String!) {
    getPartsDeleteRequests(table: $table) {
      id
      name
      requestor {
        username
      }
      reason
      status
      createdAt
      updatedAt
    }
  }
`;

export {
  FETCH_BATTERY,
  FETCH_BATTERY_REQ,
  FETCH_BMS,
  FETCH_BMS_REQ,
  FETCH_AB,
  FETCH_AB_REQ,
  FETCH_PARTS_DEL_REQ,
};
