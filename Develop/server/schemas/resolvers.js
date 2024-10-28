const { User, bookSchema } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {  

    me: async (parent, args, context ) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id })
        }

        throw new AuthenticationError('Not Logged In')
    }
},

Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email })
        if (!user) {
            throw new AuthenticationError('No user found with this email address');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            throw new AuthenticationError('Incorrect Password')
        }
        const token = signToken(user);
        return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
        const newUser = await User.create({ username, email, password });
        const token = signToken(newUser);
        return { token, user: newUser };
    },
    saveBook: async (parent, { userId, book }) => {
        const updatedUser = User.findOneAndUpdate(
            {_id: userId },
            {
                $addToSet: { savedBooks: book },
            },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!updatedUser) {
            throw new Error('User not found')
        }

        return updatedUser
    },
    removeBook: async (parent, { userId, book }) => {
        return User.findOneAndUpdate(
            { _id: userId },
            { $pull: { books: book }},
            { new: true }

        );

    },
},

    

};

module.exports = resolvers;