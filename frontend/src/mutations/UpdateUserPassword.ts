import { gql } from '@apollo/client';

const UPDATE_USER_PASSWORD = gql`
    mutation UpdateUserPassword($id: String!, $currentPassword: String!, $newPassword: String!) {
        UpdateUserPassword(id: $id, currentPassword: $currentPassword, newPassword: $newPassword) {
            id
            name
            email
            authToken
        }
    }
`;

export default UPDATE_USER_PASSWORD;