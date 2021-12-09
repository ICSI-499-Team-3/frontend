import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const CREATE_MEASUREMENT = gql`
    mutation CreateMeasurement($input: CreateMeasurementInput!) {
        CreateMeasurement(input: $input) {
            id
            x
            y
            dateTimeMeasured
        }
    }
`;

export default CREATE_MEASUREMENT;