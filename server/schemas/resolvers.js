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
      if (context.user) {
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
      if (context.user) {
        return await Project.findOne({ _id })
          .populate("collaborators")
          .populate("collabsToAddOrDenyList")
          .execPopulate();
      }

      throw new AuthenticationError(
        "You need to be logged in to view this project."
      );
    },

    // Get a chapter of a book
    getChapter: async (parent, { bookId, _id }) => {
      await Project.findOne({
        _id: bookId,
      })
        .populate("chapters")
        .execPopulate()
        .then((book) => {
          book.chapters.forEach((chapter) => chapter._id === _id);
        });
    },
  },
  Mutation: {
    // Allows user to login and set their data to the JWT
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials...");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials....");
      }

      const token = signToken(user);

      return { token, user };
    },

    // Creates a new account and set the user's data to the JWT
    addUser: async (parent, args) => {
      const user = User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // Creates a new project(book)
    addProject: async (parent, args, context) => {
      if (context.user) {
        return await Project.create(args);
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    editProjectInfo: async (
      parent,
      { title, summary, genre, isPublic },
      context
    ) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(
          { _id },
          { title, summary, genre, isPublic },
          { new: true, runValidators: true }
        );

        return project;
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Deletes a project
    deleteProject: async (parent, { _id }, context) => {
      if (context.user) {
        return await Project.deleteOne({ _id });
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Accept a collaborator to project
    acceptCollaborator: async (parent, { projectId, userId }, context) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(
          { _id: projectId },
          {
            $addToSet: { collaborators: userId },
            $pull: { collabsToAddOrDenyList: userId },
          },
          { new: true, runValidators: true }
        );

        return project;
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Deny a collaborator
    denyCollaborator: async (parent, { projectId, userId }, context) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(
          { _id: projectId },
          { $pull: { collabsToAddOrDenyList: userId } },
          { new: true, runValidators: true }
        );

        return project;
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Add chapter
    addChapter: async (parent, { projectId, ...args }, context) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(
          {
            _id: projectId,
          },
          { $addToSet: { chapters: args } },
          { new: true, runValidators: true }
        );

        return project;
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Add comment to a chapter nested within a project (public)
    addComment: async (
      parent,
      { projectId, chapterId, commentText },
      context
    ) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(
          { _id: projectId, "chapters._id": chapterId },
          {
            $addToSet: {
              "chapters.$.comments": {
                commentText,
                username: context.user.username,
              },
            },
          },
          { new: true, runValidators: true }
        );
        // MAY WANT TO DO A `Project.findOne().then()` IF THIS FAILS

        return project;
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Add commit to a chapter nested within a project (private)
    addCommit: async (
      parent,
      { projectId, chapterId, commitText, commitType },
      context
    ) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(
          { _id: projectId, "chapters._id": chapterId },
          {
            $addToSet: {
              "chapters.$.commits": {
                commitText,
                commitType,
                username: context.user.username,
              },
            },
          },
          { new: true, runValidators: true }
        );

        return project;
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Upvote a project
    upvoteProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(
          { _id: projectId },
          { $addToSet: { upvotes: context.user._id } },
          { new: true, runValidators: true }
        );

        return project;
      }

      throw new AuthenticationError("You need to be logged in...");
    },
  },
};

module.exports = resolvers;
