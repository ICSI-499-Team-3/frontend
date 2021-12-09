import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const GET_SHARES_BY_DATA_ID = gql`
    query GetSharesByDataId($id: String!) {
        GetSharesByDataId(id: $id) {
            id
            sharerId
            shareeId
            sharedLog
            sharedMeasurement
            dataId
        }
    }
`;

export default GET_SHARES_BY_DATA_ID;