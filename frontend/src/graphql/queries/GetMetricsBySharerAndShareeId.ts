import { gql } from '@apollo/client';

/**
 * @author Tony Comanzo 
 */
const GET_METRICS_BY_SHARER_AND_SHAREE_ID = gql`
    query GetMetricsBySharerAndShareeId($sharerId: String!, $shareeId: String!) {
        GetMetricsBySharerAndShareeId(sharerId: $sharerId, shareeId: $shareeId) {
            id
            userId
            title
            xUnits
            yUnits 
            data {
                id
                x
                y 
                dateTimeMeasured
            }
        }
    }
`;

export default GET_METRICS_BY_SHARER_AND_SHAREE_ID;