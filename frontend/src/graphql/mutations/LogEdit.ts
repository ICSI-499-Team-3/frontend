import { gql } from '@apollo/client';

const LOG_EDIT = gql`
    mutation LogEdit($input: NotesInput!) {
        CreateLog(input: $input) {
            notes
        }
    }
`;

export default LOG_EDIT;