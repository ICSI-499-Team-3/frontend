import { gql } from '@apollo/client';

const DELETE_MEASUREMENT = gql`
    mutation DeleteMeasurement($metricId: String!, $input: [String!]!) {
        DeleteMeasurement(metricId: $metricId, input: $input) {
            id
            x
            y
            dateTimeMeasured
        }
    }
`;

export default DELETE_MEASUREMENT;