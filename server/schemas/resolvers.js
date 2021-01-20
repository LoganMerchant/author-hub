const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, { _id }) => {
      return await User.findOne({
        _id: id,
      }).populate("projects");
    },
    getProjects: async (parent, { _id }) => {
      if (_id) {
        return await Project.findOne({
          _id,
        });
      } else {
        return await Project.find();
      }
    },
    getChapter: async (parent, { projectId }) => {
      return await Chapter.findOne({
        _id: projectId,
      });
    },
  },
  Mutation: {},
};

module.exports = resolvers;
