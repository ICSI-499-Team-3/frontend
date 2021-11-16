import { gql } from '@apollo/client';

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmailAndPassword($email: String!) { // 
    GetUserByEmailAndPassword(email: $email) {
      email
    }
  }
`;

export default GET_USER_BY_EMAIL;