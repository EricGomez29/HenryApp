import User from './models/Users';

const resolvers = {
    Query: {
        user: async (parent, { id }, context) => await User.findById(id).exec(),
        users: async (parent, { where }, context) => await User.find(where).exec()
    },

    Mutation: {
        addUser: async (parent, { input }, context) => await User.create(input)
    }
}

export default resolvers;