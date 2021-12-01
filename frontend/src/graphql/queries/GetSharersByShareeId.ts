import { gql } from '@apollo/client';

const GET_SHARERS_BY_SHAREE_ID = gql`
    query GetSharersByShareeId($id: String!) {
        GetSharersByShareeId(id: $id) {
            id
            name
        }
    }
`;

export default GET_SHARERS_BY_SHAREE_ID;