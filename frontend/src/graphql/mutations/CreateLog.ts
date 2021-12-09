import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const CREATE_LOG = gql`
    mutation CreateLog($input: LogInput!) {
        CreateLog(input: $input) {
            id
            userId
            dateTimeOfActivity
            notes
            categories
            mood
        }
    }
`;

export default CREATE_LOG;