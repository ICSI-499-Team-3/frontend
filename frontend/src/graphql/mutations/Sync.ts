import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const SYNC = gql`
    mutation Sync($input: SyncInput!) {
        Sync(input: $input) {
            id
            userId
            title
            xUnits
            yUnits
            data {
                id
                dateTimeMeasured
                x
                y
            }
        }
    }
`;

export default SYNC;