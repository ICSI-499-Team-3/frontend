import { gql } from '@apollo/client';

const DELETE_LOG = gql`
    mutation DeleteLog($logId: String!) {
        DeleteLog(logId: $logId) {
            id
            dateTimeOfActivity
            notes
            categories
            mood
        }
    }
`;

export default DELETE_LOG;