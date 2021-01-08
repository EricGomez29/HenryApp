import { gql } from '@apollo/client';

//begin here!
export const ADD_GRUPOSTAND = gql`
mutation addStandUp($cohorte: Int!){
    addStandUp(
      cohorte: $cohorte
    ){
      name
      cohorte
    }
  }`

export const GET_GRUPOSTAND = gql`
query standup($cohorte: Int){
  standup(where: {cohorte: $cohorte}){
    name
    PM{
      firstName
    }
    users{
      firstName
    }
    cohorte
  }
}`

export const GET_COHORTES = gql`
query cohortes{
  cohortes{
    _id
    number
    users{
      firstName
    }
  }
}`

export const ADD_USERSTAND = gql`
mutation addUserStandUp($username: String!, $name: String!){
  addUserStandUp(
    username: $username
    name: $name
    
  ){
    users{
      firstName
    }
    PM{
      firstName
    }
  }
}`

export const ADD_LINK = gql`
mutation addLinkMeetStandUp($id: String!, $username: String!, $link: String!){
  addLinkMeetStandUp(
    username: $username
    id: $id
    link: $link
  ) {
    linkMeet
  }
}`

export const GET_GRUPO = gql`
query standup($name: String!){
  standup(where: {name: $name}){
    _id
    PM{
      firstName
      lastName
    }
    users{
      firstName
      lastName
    }
    name
    cohorte
    linkMeet
  }
}`