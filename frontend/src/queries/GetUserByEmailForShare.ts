import { gql } from '@apollo/client';

const GET_USER_BY_EMAIL_FOR_SHARE = gql`
query GetUserByEmailForShare($input: String!) {
    GetUserByEmailForShare(input: $input) {
      email
    }
  }
`;

export default GET_USER_BY_EMAIL_FOR_SHARE;