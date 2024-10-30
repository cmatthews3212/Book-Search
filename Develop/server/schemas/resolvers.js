const { User, bookSchema } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {  

    me: async (parent, args, context ) => {
        console.log(context)
    
        if (context.user) {
            const user = await User.findOne({ _id: context.user._id })
            console.log(user)
            return user
        }

        console.error('Not Logged In')
    }
},

Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email })
        if (!user) {
            console.error('No user found with this email address');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            console.error('Incorrect Password')
        }
        const token = signToken(user);
        return { token, user: user };
    },
    addUser: async (parent, { username, email, password }) => {
        const newUser = await User.create({ username, email, password });
        const token = signToken(newUser);
        return { token, user: newUser };
    },
    saveBook: async (parent, { userId, book }) => {
        const updatedUser = await User.findOneAndUpdate(
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
    removeBook: async (parent, { userId, bookId }) => {
        return User.findOneAndUpdate(
            { _id: userId },
            { $pull: { savedBooks: { bookId }}},
            { new: true }

        );

    },
},

    

};

module.exports = resolvers;