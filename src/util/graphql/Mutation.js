import { gql } from "@apollo/client";

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

export { LOGIN_USER, REGISTER_USER };
