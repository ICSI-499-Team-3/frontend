import { gql } from '@apollo/client';

const UPDATE_USER_NAME = gql`
    mutation UpdateUserName($id: String!, $name: String!) {
        UpdateUserName(id: $id, name: $name) {
            id
            name
            email
            authToken
            preExistingConditions
        }
    }
`;

export default UPDATE_USER_NAME;