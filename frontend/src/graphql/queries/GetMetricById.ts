import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const GET_METRIC_BY_ID = gql`
    query GetMetricById($metricId: String!) {
        GetMetricById(metricId: $metricId) {
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

export default GET_METRIC_BY_ID;