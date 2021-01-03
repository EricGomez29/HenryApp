import { gql } from '@apollo/client';

export const GET_TODASMESAS = gql`
query Mesas{
    mesas{
        users {
            username
        }
        linkMeet
        estado
        cohorte
    }
}`;

export const GET_MESASCOHORTE = gql`
query pairProgramming($cohorte: String! ){
    pairProgramming(where: {cohorte: $cohorte }){
        _id
        users {
            _id
            username
        }
        linkMeet
        cohorte
        dia
    }
}`;

export const ADD_USERMESA = gql`
mutation addUserPairProgramming($username: String!, $id: String){
    addUserPairProgramming(
        username: $username,
        id: $id
    ){
        users{
            username
        }
    }
}`;

export const GET_MESA = gql`
query pairProgramming($id: String){
    pairProgramming(where: {_id: $id}){
      users{
        firstName
        lastName
        nationality
        image
      }
      cohorte
      _id
      linkMeet
    }
  }`

export const REMOVE_MESA = gql`
mutation removeUserPairProgramming($username: String!){
    removeUserPairProgramming(
      username: $username
    )
    {
      dia
    }
  }`