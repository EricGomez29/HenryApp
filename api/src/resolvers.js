import User from './models/Users';
import bcrypt from 'bcrypt';
import { createToken } from './services'
const resolvers = {
    Query: {
        user: async (parent, { username }, context) => await User.find(username).exec(),
        users: async (parent, { where }, context) => await User.find(where).exec()
    },

    Mutation: {
        addUser: async (parent, {input }, context) => {
            const {password} = input;
            const hash = await bcrypt.hash(password, 9);
            return await User.create({...input, password: hash})
        },

        editUser: async (parent, { input }, context) => await  (User.findOneAndUpdate({ "username": input.username }, input)),
        removeUser: async (parent, { username }, context) => await  User.findOneAndRemove( {"username":username}),       
        login: async(_, { email, password }) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error("No hay usuario con ese email");
            }
            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error("Incorrect password");
            }
            return createToken(user);
        }
    }
}

export default resolvers;