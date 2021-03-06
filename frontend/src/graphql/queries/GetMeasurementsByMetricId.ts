import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const GET_MEASUREMENTS_BY_METRIC_ID = gql`
    query GetMeasurementsByMetricId($metricId: String!) {
        GetMetricById(metricId: $metricId) {
            id
            x
            y
            dateTimeMeasured
        }
    }
`;

export default GET_MEASUREMENTS_BY_METRIC_ID;