import { gql } from '@apollo/client';

export const RemoveUserCohorte = gql`
mutation removeUserCohorte($username: String!) {
    removeUserCohorte(username: $username){
  	    users {
            username
        }
    }
}`;