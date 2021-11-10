import { gql } from '@apollo/client';

const GET_ALL_LOGS = gql`
  query GetAllLogs {
    GetAllLogs {
      id
      dateTimeOfActivity
      notes
      categories 
      mood
    }
  }
`;

export default GET_ALL_LOGS;