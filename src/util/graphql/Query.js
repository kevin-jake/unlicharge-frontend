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
      supplier
      publish_status
      createdAt
    }
  }
`;

export { FETCH_BATTERY };
