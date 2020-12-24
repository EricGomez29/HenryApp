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
query Mesas($cohorte: String){
    mesas(where: {cohorte: $cohorte}){
        users {
            username
        }
        linkMeet
        estado
        cohorte
    }
}`;

export const ADD_USERMESA = gql`
mutation AddUserPairProgramming($username: String!){
    addUserPairProgramming(
        username: $username
    ){
        users{
            username
        }
    }
}`;