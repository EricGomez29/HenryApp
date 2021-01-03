import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Login($email: String!, $password: String! ) {
    login(email: $email, password: $password) {
        success
        token
        errors {
            message
        }
    }
}`;

export const USER_REGISTER = gql`
 mutation registerUser( 
        $username: String ,
        $firstName: String, 
        $lastName: String, 
        $cohorte: Int, 
        $email: String, 
        $password: String 
    ){
        registerUser( 
            username: $username ,
            firstName: $firstName, 
            lastName: $lastName, 
            cohorte: $cohorte, 
            email: $email, 
            password: $password
        ){
          firstName
        }
    }
`

export const GET_USER = gql`
    query Users($email: String) {
        users(where: {email: $email}) {
            username
            firstName
            lastName
            email
            cohorte
            image
        }
    }`;

export const EDIT_USER = gql`
    mutation editUser($username: String, $lastName: String, $firstName: String, $email: String, $image: String) {
	    editUser (input: {
            username: $username
            lastName: $lastName
		    firstName: $firstName
            email: $email
            image: $image
        }){
            username
            email
            firstName
            lastName
            image
        }
}`;

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