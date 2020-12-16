import { gql } from '@apollo/client';

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
            password: 
            $password
        ){
          firstName
        }
    }
`
