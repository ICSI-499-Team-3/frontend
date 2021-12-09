import { gql } from '@apollo/client';

/**
 * @author Habib Affinnih
 */
const GET_USER_BY_EMAIL_AND_PASSWORD = gql`
  query GetUserByEmailAndPassword($input: UserLoginInput!) {
    GetUserByEmailAndPassword(input: $input) {
      id
      name
      email
      authToken
      preExistingConditions
    }
  }
`;

export default GET_USER_BY_EMAIL_AND_PASSWORD;