import { gql } from '@apollo/client';

const SEND_PASSWORD_RESET_CODE = gql`
  query SendPasswordResetCode($email: String!) {
    SendPasswordResetCode(email: $email)
  }
`;

export default SEND_PASSWORD_RESET_CODE;