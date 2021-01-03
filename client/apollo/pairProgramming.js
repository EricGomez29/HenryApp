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