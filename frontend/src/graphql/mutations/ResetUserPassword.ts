import { gql } from '@apollo/client';

/**
 * @author Habib Affinnih
 */
const RESET_USER_PASSWORD = gql`
  mutation ResetUserPassword($email: String!, $password: String!) {
    ResetUserPassword(email: $email, password: $password)
  }
`;

export default RESET_USER_PASSWORD;