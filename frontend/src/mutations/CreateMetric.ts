import { gql } from '@apollo/client';

const CREATE_METRIC = gql`
    mutation CreateMetric($input: MetricInput!) {
        CreateMetric(input: $input) {
            id
            title
            xUnits
            yUnits
        }
    }
`;

export default CREATE_METRIC;