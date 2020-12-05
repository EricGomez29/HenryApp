import User from './models/Users';
import bcrypt from 'bcrypt';
const resolvers = {
    Query: {
        users: async (parent, { where }, context) => await User.find(where).exec()
    },

    Mutation: {
        addUser: async (parent, { input }, context) => {
            const { password } = input;
            const hash = await bcrypt.hash(password, 9);
            return await User.create({
                ...input,
                password: hash
            })
        },

        editUser: async (parent, { input }, context) => {
            return await User.findOneAndUpdate({ "username": input.username }, input)
        },

        removeUser: async (parent, { username }, context) => await  User.findOneAndRemove({"username":username})       
    }
}
export default resolvers;