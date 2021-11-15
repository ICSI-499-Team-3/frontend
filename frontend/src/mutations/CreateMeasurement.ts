import { gql } from '@apollo/client';

const CREATE_MEASUREMENT = gql`
    mutation CreateMeasurement($input: MeasurementInput!) {
        CreateMeasurement(input: $input) {
            id
            x
            y
            dateTimeMeasured
        }
    }
`;

export default CREATE_MEASUREMENT;