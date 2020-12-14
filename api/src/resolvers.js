import bcrypt from 'bcrypt';
import auth from '../auth';
import moment from 'moment'
import User from './models/Users';
import Cohorte from './models/Cohorte';
import PairProgramming from './models/PairProgramming';
import Mesas from './models/Mesas';
import agregarUsuarioMesa from './resolvers/mesas'

//Funcion para validación
//          |
//          V
// import { isAutenticatedResolver } from '../permissions';

const resolvers = {
    Query: {
        //USERS
        
        users: /*isAutenticatedResolver.createResolver(*/
            async (parent, { where }, context) => await User.find(where).exec(),
        //COHORTES
        cohortes: async (parent, { where }, context) => await Cohorte.find(where).exec(),
        //GRUPOS DE PAIR PROGRAMMING 
        pairProgramming: async (parent, { where }, context) => await PairProgramming.find(where).populate('mesas'),
        //MESAS
        mesas: async (parent, { where }, context) => await Mesas.find(where).populate('users')
    },

    Mutation: {

        //USERS
        registerUser: async (_, {username,firstName, lastName, cohorte,email, password }, res) => {
             const hash = await bcrypt.hash(password, 9);
            return await User.create( {username, firstName,lastName,cohorte,email,password: hash} )
        },
        editUser: async (parent, { input }, context, req) => {
            console.log(context)
            return await  (User.findOneAndUpdate({ "username": input.username }, input))
        },
        removeUser: async (parent, { username }, context) => await  User.findOneAndRemove({"username":username}),
        
        
        
        //COHORTES
        addCohorte: async (parent, { input }, context) => await Cohorte.create(input),
        addUserCohorte: async (parent, { number, username }, context) =>  {
            const user = await User.find({"username": username});
            if (user.length === 0){
                throw new Error (`El Usuario ${username} no existe.`);
            };    
            if (parseInt(number) ===  user[0].cohorte){
                throw new Error (`El Usuario ${username} pertenece a este Cohorte.`);
            }else if (parseInt(number) < user[0].cohorte){
                throw new Error (`No se puede agregar usuarios a Cohortes anteriores`);
            }
            // Busco si existe el cohorte
            const cohorte = await Cohorte.findOne({"Number": number})
            if (!cohorte){
                throw new Error("El Cohorte no existe")
            }
            // Guardo el username de ese alumno en el array Users de Cohorte
            await User.findOneAndUpdate({"username": username}, {"cohorte": number})
            await Cohorte.findOneAndUpdate({"Number": number},
            {
                $push : {
                    Users : {username} 
                }
            });
            await Cohorte.findOneAndUpdate({"Number": user[0].cohorte},
            {
                $pull : {
                    Users : {username} 
                }
            });
            return await Cohorte.findOne({"Number": number});
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
        }
    }

    
    
}
        


export default resolvers;