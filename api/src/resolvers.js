import bcrypt from 'bcrypt';
import auth from '../auth';
import User from './models/Users';
import Cohorte from './models/Cohorte';
import PairProgramming from './models/PairProgramming';
import Mesas from './models/Mesas';
import agregarUsuarioMesa from './resolvers/mesas';
import { sendEmail } from './resolvers/sendEmail';
import { forgotPasswordMail } from './resolvers/sendForgotPassword';
import { addUserCohorte } from "./resolvers/Cohorte/addUserCohorte";
import { addCohorteInstructor } from "./resolvers/Cohorte/assignInstructorCohorte";

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
        pairProgramming: async (parent, { where }, context) => await PairProgramming.find(where).populate('mesas'),
        //MESAS
        mesas: async (parent, { where }, context) => await Mesas.find(where).populate('users'),
    },

    Mutation: {
        //USERS
        registerUser:  (_, {username,firstName, lastName, cohorte,email, password }) => regUser(username, firstName, lastName, cohorte,email, password),
        editUser:  (parent, { input }, context, req) => editUsers(input),
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
        addInstructor: async (parent ,{ username, cohorte }, context) =>{
            // addCohorteInstructor(username, cohorte),
            const user = await User.findOne({username: username});
            if(!user){
                throw new Error("El usuario no existe");
            }
            //veo si el cohorte tiene instructor
            const cohor = await Cohorte.findOne({number: cohorte});
            //si no le agrego el tanto al cohorte como a la propiedad isInstructor
            console.log(!cohor.instructor);
            await User.findOneAndUpdate({username: username}, {isInstructor: true});
            await Cohorte.findOneAndUpdate({Number: cohorte}, {instructor: user._id});
            // me fijo si el usuario es instructor en otros cohortes
            const res = await Cohorte.find({instructor: cohor.instructor});
            if (res.length === 0){
                await User.findOneAndUpdate({_id: cohor.instructor},{isInstructor: false});
            }
            
            return await Cohorte.findOne({Number: cohorte}).populate('instructor');
            
        },
         

        //Remover Usuario de Cohorte
        removeUserCohorte: async (parent, { username }, context) => {
            const user = await User.find({"username": username});
            if (user.length === 0){
                throw new Error(`El Usuario ${username} no existe`);
            }else if(user[0].cohorte === null){
                throw new Error(`El Usuario ${username} no esta agregado a ningun cohorte`);
            }
            await User.findOneAndUpdate({"username": username}, {"cohorte": null});
            await Cohorte.findOneAndUpdate({"Number": user[0].cohorte},
            {
                $pull : {
                    Users : {username} 
                }
            });
            return Cohorte.findOne({"Number": user[0].cohorte})
        },
        
        //AUTH
        login: async (parent, {email, password}, {models: {User}, ACCESS_TOKEN_SECRET}) => {
            return auth.login(email, password, User, ACCESS_TOKEN_SECRET)
        },

        //Pair Programming
        addUserPairProgramming:  (parent, {username}) => {
           return agregarUsuarioMesa(username);
        },
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