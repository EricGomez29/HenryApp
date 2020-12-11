import User from './models/Users';
import bcrypt from 'bcrypt';
import { createToken } from './services';
import Cohorte from './models/Cohorte';


const resolvers = {
    Query: {
        //USERS
        user: async (parent, { username }, context) => await User.find(username).exec(),
        users: async (parent, { where }, context) => await User.find(where).exec(),
         //AUTH
       
        me: (_, __, { req }) => {
            if (!req.userId) {
              return null;
            }
      
            return User.findOne(req.userId);
          },
        //COHORTES
        cohortes: async (parent, { where }, context) => await Cohorte.find(where).exec()
    },

    Mutation: {

        //USERS
        registerUser: async (_, {username,firstName, lastName, cohorte,email, password }, res) => {
             const hash = await bcrypt.hash(password, 9);
            return await User.create( {username, firstName,lastName,cohorte,email,password: hash} )
        },
        login: async(_, { email, password }, res) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error("No hay usuario con ese email");
            }
            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error("Incorrect password");
            }
            
              return createToken(user, res);
        },
        editUser: async (parent, { input }, context, req) => {
            console.log(context)
            // if (!req.isAuth){
            //     throw new Error ("El usuario no esta autenticado")
            // }
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
                    Users : username //inserted data is the object to be inserted 
                }
            });
            console.log((res));
            return await User.findOneAndUpdate({"username": username}, {"cohorte": number})
        }

        // removeUserCohorte: async (parent, { number, username })
    }
    
}
        
        
    


export default resolvers;
