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
            // const user = await User.find({"username": username});
            console.log(`${number} ${username}`);
            const user = await Cohorte.find({"Number": number})
            if (user.username === username){
                throw new Error("El usuario ya esta agregado al Cohorte")
            }
            const cohorte = await Cohorte.updateOne({"Number": number},
                {
                $push : {
                    Users :  { username } //inserted data is the object to be inserted 
                }
});
return cohorte;
            // return await Cohorte.UpdateOne({"Number": number}, [ {"Users":  user}] )
    }}
    }
        
        
    


export default resolvers;
