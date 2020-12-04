import User from './models/Users';


const resolvers = {
    Query: {
        user: async (parent, { id }, context) => await User.findById(id).exec(),
        users: async (parent, { where }, context) => await User.find(where).exec()
    },

    Mutation: {
        
        addUser: async (parent, { input }, context) => await User.create(input),
        editUser: async (parent, { input }, context) => await  User.findOneAndUpdate({ "username": input.username }, input ),
        removeUser: async (parent, { username }, context) => await  User.findOneAndRemove( {"username":username})       
}
}
export default resolvers;