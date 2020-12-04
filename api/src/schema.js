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

    type Query {
        user(id: String): Users
        users(where: JSON): [Users]
    }

    type Mutation {
        addUser(input: UsersInput): Users
        editUser( input: UsersInput): Users
        removeUser (id: String): Users
    }
`;

export default typeDefs;