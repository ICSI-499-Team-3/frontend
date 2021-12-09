import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const DELETE_METRIC = gql`
    mutation DeleteMetric($metricId: String!) {
        DeleteMetric(metricId: $metricId) {
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

export default DELETE_METRIC;