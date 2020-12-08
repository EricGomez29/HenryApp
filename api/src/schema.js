import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar JSON
    type Users {
        _id: String
        username: String
        firstName: String
        lastName: String
        cohorte: Int
        henryCoins: Int
        isAdmin: Boolean
        email: String
        password: String
    }

    type AuthData {
        userId: ID!
        token: String!
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
        Users: [Users]
    }
    
    input CohortesInput {
        Number: Int!
    }
    
    type Query {
        user(username: String): Users
        users(where: JSON): [Users]
        cohortes(where: JSON): [Cohortes]
        login(email: String!, password: String!): AuthData!
        me: Users
        
    }

    type Mutation {
        registerUser(input: UsersInput): Users
        addCohorte(input: CohortesInput): Cohortes

        editUser( input: UsersInput): Users
        removeUser (where: JSON): Users

    }
`;

export default typeDefs;