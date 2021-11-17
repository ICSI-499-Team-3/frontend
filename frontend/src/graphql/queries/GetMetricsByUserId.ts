import { gql } from '@apollo/client';

const GET_METRICS_BY_USER_ID = gql`
    query GetMetricsByUserId($userId: String!) {
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

export default GET_METRICS_BY_USER_ID;