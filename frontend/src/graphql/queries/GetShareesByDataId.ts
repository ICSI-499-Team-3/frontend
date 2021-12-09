import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const GET_SHAREES_BY_DATA_ID = gql`
    query GetShareesByDataId($id: String!) {
        GetShareesByDataId(id: $id) {
            id
            name
        }
    }
`;

export default GET_SHAREES_BY_DATA_ID;