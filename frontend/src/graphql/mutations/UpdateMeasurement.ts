import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const UPDATE_MEASUREMENT = gql`
    mutation UpdateMeasurement($input: UpdateMeasurementInput!) {
        UpdateMeasurement(input: $input) {
            id
            x
            y
            dateTimeMeasured
        }
    }
`;

export default UPDATE_MEASUREMENT;