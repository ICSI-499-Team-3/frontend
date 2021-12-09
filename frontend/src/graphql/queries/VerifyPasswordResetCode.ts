import { gql } from '@apollo/client';

/**
 * @author Habib Affinnih
 */
const VERIFY_PASSWORD_RESET_CODE = gql`
  query VerifyPasswordResetCode($email: String!, $passwordResetCode: String!) {
    VerifyPasswordResetCode(email: $email, passwordResetCode: $passwordResetCode)
  }
`;

export default VERIFY_PASSWORD_RESET_CODE;