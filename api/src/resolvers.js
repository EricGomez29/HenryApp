import auth from '../auth';
import dotenv from 'dotenv';
import User from './models/Users';
import Cohorte from './models/Cohorte';
import StandUp from './models/Stand-Up';
import DailyStand from './models/DailyStand';
import PairProgramming from './models/PairProgramming';
import { sendEmail } from './resolvers/Email/sendEmail';
import { compareCode, editUsers, regUser } from "./resolvers/User/user";
import { forgotPasswordMail } from './resolvers/Email/sendForgotPassword';
import { addDailyStandUp, addDailyUser, removeDailyUser } from './resolvers/Daily-StandUp/dailyStand';
import { addUserPairProgramming, removeUserPairProgramming, addLinkMeet } from './resolvers/PairProgramming/pairprogramming';
import { addUserCohorte, editFechaCohorte, addCohorteInstructor, removeUserCohorte, addCohorte } from "./resolvers/Cohorte/cohorte";
import { addLinkMeetStandUp, addStandUp, addUserStandUp, assignPMStandUp, removePMStandUp, removeUserStandUp } from './resolvers/StandUp/standup';
import { giveCoins } from './resolvers/CoinsSystem/coinsSystem'
dotenv.config()

const resolvers = {
    Query: {
        //USERS
        users: /*isAutenticatedResolver.createResolver(*/async (parent, { where }, context) => await User.find(where).exec()/*)*/,
        //COHORTES
        cohortes: async (parent, { where }, context) => await Cohorte.find(where).populate('instructor').populate('users').exec(),
        //GRUPOS DE PAIR PROGRAMMING 
        pairProgramming: async (parent, { where }, context) => await PairProgramming.find(where).populate('users'),
        //STAND-UP
        standup: async (parent, { where }, context) =>await StandUp.find(where).populate('users').populate('PM').exec(),
        //DAILY STAND-UP
        dailyStandUp: async (parent, { where }, context) =>await DailyStand.find(where).populate('users').exec(),
    },

    Mutation: {
        //USERS
        registerUser:  (_, {username,firstName, lastName, cohorte,email, password }) => regUser(username, firstName, lastName, cohorte,email, password),
        editUser: async (parent, { input }, context, req) => await editUsers(input),
        removeUser: async (parent, { username }, context) => await  User.findOneAndRemove({"username":username}),

        //COHORTES
        addCohorte:  (parent, context) => addCohorte(),
        editFechaCohorte: (_, { fecha, id }, context) => editFechaCohorte(fecha, id),
        addUserCohorte: async (parent, { number, username }, context) =>  addUserCohorte(number, username),
        addInstructor: async (parent, { username, cohorte }, context) => addCohorteInstructor(username, cohorte),
        removeUserCohorte: (parent, { username }, context) => removeUserCohorte(username),
        
        //AUTH
        login: async (parent, {email, password}, {models: {User}, ACCESS_TOKEN_SECRET}) => {
            return auth.login(email, password, User, ACCESS_TOKEN_SECRET)
        },

        //PAIR-PROGRAMMING / MESAS
        addUserPairProgramming: async (_ , {username, id}) => await addUserPairProgramming(username, id),
        removeUserPairProgramming: async (_ , {username, dia}) => await removeUserPairProgramming(username, dia),
        addLinkMeet: (_, {id, link}, context) => addLinkMeet(id, link),
        
        // Mail de Ingreso a la aplicación
        sendEmail: async (parent, { email, link }, context) => sendEmail(email, link),

        // FORGOT PASSWORD MAIL
        sendForgotPasswordMail: async (parent, { email }, context) => forgotPasswordMail(email),

        // Comparar codigo de recuperación
        compareCode: async (parent, {codigo, email}, context) => compareCode(codigo, email),

        //STAND-UP
        addStandUp: async (parent, { cohorte }, context) => addStandUp(cohorte),
        assignPMStandUp: async (parent, { username, name }, context) => assignPMStandUp(username, name),
        removePMStandUp: async (parent, { username, name }, context) => removePMStandUp(username, name),
        addUserStandUp: async ( parent, { username, name }, context) => addUserStandUp(username, name),
        removeUserStandUp: async ( parent, { username }, context) => removeUserStandUp(username),
        addLinkMeetStandUp: (_, {id, link, username }, __) => addLinkMeetStandUp(id, link, username),
    
        //Daily Stand-Up
        addDailyUser: ( parent, { username }, context) => addDailyUser(username),
        addDailyStandUp: ( parent, { username, name }, context) => addDailyStandUp(username, name),
        removeDailyUser:  ( parent, { username, name }, context) => removeDailyUser(username, name),
        
        //Coins System
        giveCoins: (_, {username, coins}, context) => giveCoins(username, coins),
    }
}

export default resolvers;