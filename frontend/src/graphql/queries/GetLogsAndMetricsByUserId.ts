import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const GET_LOGS_AND_METRICS_BY_USER_ID = gql`
query GetLogsAndMetricsByUserId($userId: String!){
    GetLogsByUserId(userId: $userId) {
        id
        userId
        dateTimeOfActivity 
        notes
        categories
        mood
    },
    GetMetricsByUserId(userId: $userId) {
        id 
        userId 
        title 
        xUnits 
        yUnits
        data {
            id 
            x 
            y 
            dateTimeMeasured
        }
    }
  }
`;

export default GET_LOGS_AND_METRICS_BY_USER_ID;