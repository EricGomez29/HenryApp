import User from './models/Users';

const resolvers = {
    Query: {
        user: async (parent, { id }, context) => await User.findById(id).exec(),
        users: async (parent, { where }, context) => await User.find(where).exec()
    },

    Mutation: {
        
        addUser: async (parent, { input }, context) => await User.create(input),
        editUser: async (parent, { input }, context) => await  User.findOneAndUpdate({ "_id": input._id }, input ),
        removeUser: async (parent, { id }, context) => await  User.findOneAndRemove( {"_id":id})       
}
}
export default resolvers;