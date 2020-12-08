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

    input UsersInput {
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
    }

    type Mutation {
        addUser(input: UsersInput): Users
        addCohorte(input: CohortesInput): Cohortes

        editUser( input: UsersInput): Users
        removeUser (username: String): Users

        login (email: String!, password: String!): String
    }
`;

export default typeDefs;
