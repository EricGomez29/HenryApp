import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar JSON
    type Users {
        username: String
        firstName: String
        lastName: String
        cohorte: Cohortes
        email: String
        password: String
        forgotPassword:String
        isInstructor:Boolean
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

    type Error {
        path: String!
        message: String!
    }

    type AuthData {
        success: Boolean!
        token: String
        errors: [Error]
    }
    

    type Cohortes {
        number: Int
        users: [Users!]
        instructor: Users
    }
        
    input CohortesInput {
        number: Int!
    }
    
    type PairProgramming {
        horaDeInicio: String
        horaDeCierre: String
        dia: String
        mesas: [Mesas]
        cohorte: Int
    }

    type Email{
        from: String
        to: String
        subject: String
        text: String
    }

    input EmailInput{
        from: String
        to: String
        subject: String
        text: String
    }

    type Mesas{
        users: [Users]
        estado: Boolean
        linkMeet: String
    }

    type Query {
        users(where: JSON): [Users]
        cohortes(where: JSON): [Cohortes]
        pairProgramming(where: JSON): [PairProgramming]
        mesas(where: JSON): [Mesas]
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
        addInstructor(username:String, cohorte:Int): Cohortes

        addUserPairProgramming(username:String!):Mesas

        sendEmail(email: String): Email

        sendForgotPasswordMail(email: String): Users
        compareCode(codigo:String, email:String): Users



    }
`;

export default typeDefs;
