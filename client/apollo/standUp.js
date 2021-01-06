import { gql } from '@apollo/client';

//begin here!
export const ADD_GRUPOSTAND = gql`
mutation addStandUp($cohorte: String!){
    addStandUp(
      cohorte: $cohorte
    ){
      name
      cohorte
    }
  }`