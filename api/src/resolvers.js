import User from './models/Users';
import bcrypt from 'bcrypt';
import Cohorte from './models/Cohorte';
import auth from '../auth';

//Funcion para validación
//          |
//          V
// import { isAutenticatedResolver } from '../permissions';

const resolvers = {
    Query: {
        //USERS
        
        users: /*isAutenticatedResolver.createResolver(*/
            async (parent, { where }, context) => await User.find(where).exec()
        /*)*/,

        //COHORTES
        cohortes: async (parent, { where }, context) => await Cohorte.find(where).exec()
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
            console.log(`${number} ${username}`);
            const user = await User.find({"username": username})
            if (number === user.Cohorte){
                throw new Error (`El Usuario ${username} pertenece a este Cohorte (Cohorte: ${Number})`)
            }else if (number < user.Cohorte){
                throw new Error (`No se puede agregar usuarios a Cohortes anteriores)`)
            }
            console.log(user)
            // Busco si existe el cohorte
            const userCohorte = await Cohorte.findOne({"Number": number})
            console.log(userCohorte)
            // Guardo el username de ese alumno en el array Users de Cohorte
            const res = await Cohorte.findOneAndUpdate({"Number": number},
                {
                $push : {
                    Users : {username} //inserted data is the object to be inserted 
                }
            });
            console.log((res));
            return await User.findOneAndUpdate({"username": username}, {"cohorte": number})
        },
        //AUTH
        login: async (parent, {email, password}, {models: {User}, ACCESS_TOKEN_SECRET}) => {
            return auth.login(email, password, User, ACCESS_TOKEN_SECRET)
        }
    }
}
        
        
    


export default resolvers;
