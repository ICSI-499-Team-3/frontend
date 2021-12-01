import { gql } from '@apollo/client';

const GET_LOGS_BY_SHARER_AND_SHAREE_ID = gql`
    query GetLogsBySharerAndShareeId($sharerId: String!, $shareeId: String!) {
        GetLogsBySharerAndShareeId(sharerId: $sharerId, shareeId: $shareeId) {
            id
            userId
            dateTimeOfActivity
            notes
            categories 
            mood
        }
    }
`;

export default GET_LOGS_BY_SHARER_AND_SHAREE_ID;