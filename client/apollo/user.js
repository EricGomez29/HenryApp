import { gql } from '@apollo/client';

export const GET_USER = gql`
    query Users($email: String) {
        users(where: {email: $email}) {
            username
            firstName
            lastName
            email
            cohorte{
                number
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
    }`;

export const EDIT_USER = gql`
    mutation editUser($username: String, $lastName: String, $firstName: String, $email: String) {
	    editUser (input: {
            username: $username
            lastName: $lastName
		    firstName: $firstName
            email: $email
        }){
            username
            email
            firstName
            lastName
        }
}`;

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