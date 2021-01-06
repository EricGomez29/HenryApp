import { gql } from '@apollo/client';

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

export const FORGOT_PASSWORD_EMAIL = gql`
    mutation SendForgotPasswordMail($email: String) {
        sendForgotPasswordMail(email: $email){
            forgotPassword
            email
        }
    }
`;

export const COMPARE_CODE = gql`
    mutation compareCode($codigo: Int,$email: String) {
        compareCode(codigo: $codigo,email: $email){
            email
            username

        }
    }
`;