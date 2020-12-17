import bcrypt from 'bcrypt';
import auth from '../auth';
import User from './models/Users';
import Cohorte from './models/Cohorte';
import PairProgramming from './models/PairProgramming';
import Mesas from './models/Mesas';
import {agregarUsuarioMesa} from './resolvers/Mesas/mesas';
import { sendEmail } from './resolvers/sendEmail';
import { forgotPasswordMail } from './resolvers/sendForgotPassword';
import { addUserCohorte, addCohorteInstructor, removeUserCohorte } from "./resolvers/Cohorte/cohorte";
import { editUsers } from "./resolvers/User/user";


import { regUser } from "./resolvers/User/user";
import dotenv from 'dotenv';
dotenv.config()

//Funcion para validación
//          |
//          V
// import { isAutenticatedResolver } from '../permissions';

const resolvers = {
    Query: {
        //USERS
        users: /*isAutenticatedResolver.createResolver(*/
            async (parent, { where }, context) => await User.find(where).populate('cohorte').exec(),
        //COHORTES
        cohortes: async (parent, { where }, context) => await Cohorte.find(where).populate('instructor').populate('users').exec(),
        //GRUPOS DE PAIR PROGRAMMING 
        pairProgramming: async (parent, { where }, context) => await ( await PairProgramming.find(where).populate('mesas').populate('users')),
        //MESAS
        mesas: async (parent, { where }, context) => await Mesas.find(where).populate('users'),
    },

    Mutation: {
        //USERS
        registerUser:  (_, {username,firstName, lastName, cohorte,email, password }) => regUser(username, firstName, lastName, cohorte,email, password),
        editUser: async (parent, { input }, context, req) => await editUsers(input),
        removeUser: async (parent, { username }, context) => await  User.findOneAndRemove({"username":username}),
        
        
        
        //COHORTES
        addCohorte: async (parent, { input }, context) => {
            //Busco los cohortes
            const cohor = await Cohorte.find()
            //Si la longitud de la busquedad es de 0 es porque no existen cohortes
            if(cohor.length === 0) {
                console.log('No existia ningun cohorte, este es el primero!')
                return await Cohorte.create({"number": 1});
            }

            const increment = cohor[cohor.length -1].number + 1;
            return await Cohorte.create({"number": increment});
        },

        addUserCohorte: async (parent, { number, username }, context) => addUserCohorte(number, username),
        addInstructor: async (parent ,{ username, cohorte }, context) => addCohorteInstructor(username, cohorte),
         

        //Remover Usuario de Cohorte
        removeUserCohorte: (parent, { username }, context) => removeUserCohorte(username),
        
        //AUTH
        login: async (parent, {email, password}, {models: {User}, ACCESS_TOKEN_SECRET}) => {
            return auth.login(email, password, User, ACCESS_TOKEN_SECRET)
        },

        //Pair Programming
        addUserPairProgramming: async (parent, {username}) => await agregarUsuarioMesa(username),
        // Mail de Ingreso a la aplicación
        sendEmail: async (parent, { email }, context) => sendEmail(email),
        // FORGOT PASSWORD MAIL
        sendForgotPasswordMail: async (parent, { email }, context) => forgotPasswordMail(email),
        //RECUPERAR CONTARSEÑA
        compareCode: async (parent, {codigo, email}, context) => {
            const user = await User.findOne({email: email});
            if (!(user.forgotPassword == codigo)){
                throw new Error(`El código enviado al correo ${email} no corresponde con el ingresado.`);
            }
            return user;
        },




    }

    
    
}
        


export default resolvers;