import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const DELETE_SHARE = gql`
    mutation DeleteShare($input: DeleteShareInput!) {
        DeleteShare(input: $input) {
            id
            sharerId 
            shareeId
            sharedLog
            sharedMetric
            dataId
        }
    }
`;

export default DELETE_SHARE;