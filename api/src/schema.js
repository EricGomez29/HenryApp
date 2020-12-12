import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar JSON
    type Users {
        username: String
        firstName: String
        lastName: String
        cohorte: Int
        email: String
        password: String
    }

    type Error {
        path: String!
        message: String!
    }

    type AuthData {
        success: Boolean!
        token: String
        errors: [Error]
    }
    
    input UsersInput {
        username: String
        firstName: String
        lastName: String
        cohorte: Int
        henryCoins: Int
        isAdmin: Boolean
        email: String
        password: String
    }

    type Cohortes {
        Number: Int!
        Users: [Users!]!
    }
    
    input CohortesInput {
        Number: Int!
    }
    
    type Query {
        users(where: JSON): [Users]
        cohortes(where: JSON): [Cohortes]
    }

    type Mutation {
        
        registerUser( 
        username: String
        firstName: String
        lastName: String
        cohorte: Int
        email: String
        password: String ): Users

        addCohorte(input: CohortesInput): Cohortes

        login(email: String!, password: String!): AuthData!

        editUser( input: UsersInput): Users
        
        removeUser (where: JSON): Users
        
        addUserCohorte(number: Int!, username: String!): Cohortes
        removeUserCohorte(username:String!):Cohortes!
    }
`;

export default typeDefs;
