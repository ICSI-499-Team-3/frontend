import { gql } from '@apollo/client';

/**
 * @author Habib Affinnih
 */
const UPDATE_USER_PASSWORD = gql`
    mutation UpdateUserPassword($id: String!, $currentPassword: String!, $newPassword: String!) {
        UpdateUserPassword(id: $id, currentPassword: $currentPassword, newPassword: $newPassword) {
            id
            name
            email
            authToken
            preExistingConditions
        }
    }
`;

export default UPDATE_USER_PASSWORD;