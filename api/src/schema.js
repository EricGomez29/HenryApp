import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar JSON
    type Users {
        _id: String!
        username: String
        firstName: String
        lastName: String
        cohorte: Int
        henryCoins: String
        isAdmin:Boolean
        email: String
        password: String
        forgotPassword: String
        isInstructor: Boolean
        isPM: Boolean
        standUp: String
        listPM: [String]
        image: String
        adress: String
        nationality: String
        phone: String
    }

    input UsersInput {
        username: String
        firstName: String
        lastName: String
        cohorte: Int
        henryCoins: Int
        isAdmin: Boolean
        isPM: Boolean
        isInstructor: Boolean
        email: String
        password: String
        image: String
        adress: String
        nationality: String
        phone: String
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
        _id: ID
        number: Int
        users: [Users!]
        instructor: Users
        date: String
    }
    
    type PairProgramming {
        _id:String
        dia: String
        cohorte: Int
        users: [Users]
        linkMeet: String
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
        _id:String
        PM: [Users]
        users: [Users]
        cohorte: Int
        name:String
        number:Int
        linkMeet: String
    }

    type DailyStandUp{
        _id:String
        fecha: String
        users: [Users]
        name: String
    }

    type Query {
        users(where: JSON): [Users]
        cohortes(where: JSON): [Cohortes]
        pairProgramming(where: JSON): [PairProgramming]
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

        editUser( input: UsersInput): Users
        removeUser (username:String): Users
        
        login(email: String!, password: String!): AuthData!
        
        addUserCohorte(number: Int!, username: String!): Cohortes
        addCohorte: Cohortes
        editFechaCohorte(fecha:String, id:ID):Cohortes
        removeUserCohorte(username:String!):Cohortes!
        addInstructor(username:String, cohorte:Int): Cohortes

        addUserPairProgramming(username:String!, id: String):PairProgramming
        removeUserPairProgramming(username:String!, dia: String!):PairProgramming
        addLinkMeet(id:String!,link:String!):PairProgramming

        sendEmail(email: String, link: String): Email

        sendForgotPasswordMail(email: String): Users
        compareCode(codigo:Int, email:String): Users

        addStandUp(cohorte:Int): StandUp
        assignPMStandUp(username:String, name:String): StandUp
        removePMStandUp(username:String, name:String): StandUp
        addUserStandUp(username:String, name: String):StandUp
        removeUserStandUp( username: String ):StandUp
        addLinkMeetStandUp(id: String, link: String, username: String): StandUp    

        addDailyUser(username:String!): DailyStandUp
        addDailyStandUp(username:String!, name:String!): DailyStandUp
        removeDailyUser(username: String, name: String!):DailyStandUp

        giveCoins(username:String, coins:Int):Users
    }
`;

export default typeDefs;
