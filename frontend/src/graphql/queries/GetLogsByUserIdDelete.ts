import { gql } from '@apollo/client';

/**
 * @author Emma Wirth, Lauren Velez
 */
const GET_LOGS_BY_USER_ID_DELETE = gql`
mutation DeleteLog($id: String!){
    deleteLog(id: $id) 
  }
`;

export default GET_LOGS_BY_USER_ID_DELETE;