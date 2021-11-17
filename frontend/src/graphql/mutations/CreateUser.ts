import { gql } from '@apollo/client';

const CREATE_USER = gql`
    mutation CreateUser($input: UserInput!) {
        CreateUser(input: $input) {
            name
            email
            authToken
        }
    }
`;

export default CREATE_USER;