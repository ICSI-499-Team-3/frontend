import { gql } from '@apollo/client';

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) { // 
    GetUserByEmail(email: $email) {
      email
    }
  }
`;

export default GET_USER_BY_EMAIL;