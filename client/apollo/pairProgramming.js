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
query pairProgramming($cohorte: String!, $dia: String! ){
    pairProgramming(where: {cohorte: $cohorte, dia: $dia }){
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
        _id
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
        username
        isAdmin
        isPM
      }
      cohorte
      _id
      linkMeet
    }
  }`

export const REMOVE_MESA = gql`
mutation removeUserPairProgramming($username: String!, $dia: String!){
    removeUserPairProgramming(
        username: $username
        dia: $dia
    )
    {
      dia
    }
  }`

export const ADD_LINK = gql`
mutation addLinkMeet($id: String!, $link: String!){
    addLinkMeet(
      id: $id
      link: $link
    ){
      linkMeet
    }
  }`