import { gql } from '@apollo/client';

const DELETE_LOG = gql`
    mutation DeleteLog($id: String!) {
        DeleteLog(id: $id) {
            id
            userId
            dateTimeOfActivity
            notes
            categories
            mood
        }
    }
`;

export default DELETE_LOG;
