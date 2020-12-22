import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar JSON
    type Users {
        _id: String!
        username: String
        firstName: String
        lastName: String
        cohorte: Cohortes
        henryCoins: String
        isAdmin:String
        email: String
        password: String
        forgotPassword:String
        isInstructor:Boolean
        isPM: String
        standUp: String
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
    
    type PairProgramming {
        horaDeInicio: String
        horaDeCierre: String
        dia: String
        mesas: [Mesas]
        cohorte: Cohortes
        users: [Users]
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
        _id: String!
        users: [Users]
        estado: Boolean
        linkMeet: String
        cohorte: Int
    }

    type StandUp{
        PM: [Users]
        users: [Users]
        cohorte: Int
        name:String
        number:Int
    }

    type DailyStandUp{
        fecha: String
        users: [Users]
        name: String
        linkMeet: String
    }

    type Query {
        users(where: JSON): [Users]
        cohortes(where: JSON): [Cohortes]
        pairProgramming(where: JSON): [PairProgramming]
        mesas(where: JSON): [Mesas]
        standup(where: JSON): [StandUp]
        dailyStandUp(where: JSON): [DailyStandUp]
    }

    type Mutation {
        
        registerUser( 
        username: String
        firstName: String
        lastName: String
        cohorte: Int
        email: String
        password: String ): Users

        addCohorte: Cohortes

        login(email: String!, password: String!): AuthData!

        editUser( input: UsersInput): Users
        
        removeUser (username:String): Users
        
        addUserCohorte(number: Int!, username: String!): Cohortes
        removeUserCohorte(username:String!):Cohortes!
        addInstructor(username:String, cohorte:Int): Cohortes

        addUserPairProgramming(username:String!, id: String):Mesas
        removeUserPairProgramming(username:String!, idMesa: String!):Mesas

        sendEmail(email: String): Email

        sendForgotPasswordMail(email: String): Users
        compareCode(codigo:String, email:String): Users

        addStandUp(cohorte:Int): StandUp
        assignPMStandUp(username:String, name:String): StandUp
        removePMStandUp(username:String, name:String): StandUp
        addUserStandUp(username:String, name: String):StandUp
        removeUserStandUp( username: String ):StandUp

        addDailyUser(username:String): DailyStandUp
        addDailyStandUp(username:String): DailyStandUp
    }
`;

export default typeDefs;
