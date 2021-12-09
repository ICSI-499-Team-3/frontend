import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const CREATE_SHARE = gql`
    mutation CreateShare($input: ShareInput!) {
        CreateShare(input: $input) {
            id
            sharerId 
            shareeId
            sharedLog
            sharedMetric
            dataId
        }
    }
`;

export default CREATE_SHARE;