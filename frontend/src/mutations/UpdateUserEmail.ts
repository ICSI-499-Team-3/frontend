import { gql } from '@apollo/client';

const UPDATE_USER_EMAIL = gql`
    mutation UpdateUserEmail($id: String!, $email: String!) {
        UpdateUserEmail(id: $id, email: $email) {
            id
            name
            email
            authToken
            preExistingConditions
        }
    }
`;

export default UPDATE_USER_EMAIL;