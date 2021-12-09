import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const GET_LOGS_BY_USER_ID = gql`
    query GetLogsByUserId($userId: String!) {
        GetLogsByUserId(userId: $userId) {
            id
            userId
            dateTimeOfActivity
            notes
            categories 
            mood
        }
    }
`;

export default GET_LOGS_BY_USER_ID;