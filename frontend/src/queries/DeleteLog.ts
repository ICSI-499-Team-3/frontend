import { gql } from '@apollo/client';

const DELETE_LOG = gql`
mutation DeleteLog($id: String!){
    deleteLog(id: $id) {
      id
    }
  }
`;

export default DELETE_LOG;
    /*
      id: string
      dateTimeOfActivity: number
      notes: string
      categories: string[]
      mood: string[] 
      */ 