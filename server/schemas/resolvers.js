const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');

        return userData;
      }

      throw new AuthenticationError('Not logged in.');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return token, user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, args) => {
      console.log(args);

      const user = await User.findByIdAndUpdate(
        { _id: args.input.userId },
        { $push: { savedBooks: args } },
        { new: true }
        );
      console.log(user);

      return user;
    },

    removeBook: async (parent, args) => {

      console.log(args);

      const user = await User.findOneAndUpdate(
        { _id: args._id },
        { $pull: { savedBooks: { _id: args.bookId } }},
        {new: true }
      );

      console.log(user);
      return user;
    }
  },
};

module.exports = resolvers;
