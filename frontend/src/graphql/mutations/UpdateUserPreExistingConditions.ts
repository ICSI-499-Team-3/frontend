import { gql } from '@apollo/client';

const UPDATE_USER_PRE_EXISTING_CONDITIONS = gql`
    mutation UpdateUserPreExistingConditions($id: String!, $conditions: String!) {
        UpdateUserPreExistingConditions(id: $id, conditions: $conditions) {
            id
            name
            email
            authToken
            preExistingConditions
        }
    }
`;

export default UPDATE_USER_PRE_EXISTING_CONDITIONS;