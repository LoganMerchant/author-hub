const { AuthenticationError } = require("apollo-server-express");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Get any user by its `_id`
    getUser: async (parent, { _id }) => {
      return await User.findOne({
        _id,
      })
        .populate("projects")
        .populate("collaborations")
        .execPopulate();
    },

    // Get the loggedin user
    getLoggedInUser: async (parent, args, context) => {
      if (context) {
        return await User.findOne({
          _id: context._id,
        })
          .populate("projects")
          .populate("collaborations")
          .execPopulate();
      }

      throw new AuthenticationError(`You're not logged in...`);
    },

    // Get all of the projects, sorting them by most upvotes
    getProjectsByUpvote: async () => {
      return await Project.find({
        sort: { upvotes: -1 },
      })
        .populate("collaborators")
        .execPopulate();
    },

    // Get all of the projects that match the searched title, genre or authorName
    getProjectsBySearch: async (parent, { title, genre, authorName }) => {
      return await Project.finc({
        title,
        genre,
        authorName,
      })
        .populate("collaborators")
        .execPopulate();
    },

    // Get all of the project info
    getProjectInfo: async (parent, { _id }, context) => {
      if (context) {
        return await Project.findOne({ _id })
          .populate("collaborators")
          .populate("collabsToAddOrDenyList")
          .execPopulate();
      }

      throw new AuthenticationError(
        "You need to be logged in to view this project."
      );
    },
  },
  Mutation: {},
};

module.exports = resolvers;
