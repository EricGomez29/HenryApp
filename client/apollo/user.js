import { gql } from '@apollo/client';

export const GET_USER = gql`
    query Users($email: String) {
        users(where: {email: $email}) {
            username
            firstName
            lastName
            nationality
            phone
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

export const EDIT_USER = gql`mutation editUser($username: String, $lastName: String, $firstName: String, $cohorte: Int, $email: String, $nationality: String, $phone: String, $password: String, $listPM: String, $isAdmin: Boolean) {
	    editUser (input: {
            username: $username
            lastName: $lastName
		    firstName: $firstName
            email: $email
            cohorte: $cohorte
            nationality: $nationality
            phone: $phone
            password: $password
            listPM: $listPM
            isAdmin: $isAdmin
        }){
            username
            firstName
            lastName
            nationality
            phone
            email
            cohorte
            image
            isPM
            isAdmin
            listPM
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

export const GET_USERCOHORTES = gql`
query cohortes($number: Int){
    cohortes(where: {number: $number}){
        users {
            username
            firstName
            lastName
            cohorte
            image
            standUp
        }
    }
}`;

export const GET_USER_FOR_ADMIN = gql`
    query Users($email: String) {
        users(where: {email: $email}) {
            username
            firstName
            lastName
            nationality
            phone
            email
            cohorte
            image
            isPM
            isAdmin
            listPM
        }
    }`;
