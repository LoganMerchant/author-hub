const { AuthenticationError } = require("apollo-server-express");
const { User, Project, Chapter } = require("../models");
const { signToken, readTokenFromHeader } = require("../utils/auth");

const resolvers = {
  Query: {
    // Get any user by its `_id`
    getUser: async (parent, { _id }) => {
      return await User.findOne({
        _id,
      })
        .populate("projects")
        .populate("collaborations");
    },

    // Get all users in database
    getUsers: async () => {
      return await User.find().populate("projects").populate("collaborations");
    },

    // Get all of the projects, sorting them by most upvotes
    getProjectsByUpvote: async () => {
      return await Project.find({
        isPublic: true,
      })
        .sort({ upvotes: -1 })
        .populate("chapters")
        .populate("collaborators");
    },

    // Get all of the projects that match the searched title, genre or authorName
    getProjectsBySearch: async (parent, { searchTerm, genre }) => {
      return await Project.find({
        $and: [{ genre }, { title: { $regex: searchTerm, $options: "i" } }],
      })
        .populate("chapters")
        .populate("collaborators");
    },

    // Get all of the project info
    getProjectInfo: async (parent, { _id }) => {
      return await Project.findOne({ _id })
        .populate("chapters")
        .populate("collaborators")
        .populate("collabsToAddOrDenyList");
    },

    // Get a chapter of a book
    getChapter: async (parent, { _id }) => {
      return await Chapter.findOne({ _id });
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
        const user = readTokenFromHeader(context.headers.authorization);
        const newProject = await Project.create(args);

        await User.findByIdAndUpdate(
          { _id: user._id },
          { $addToSet: { projects: newProject._id } },
          { runValidators: true }
        );

        return newProject;
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Edit a project's details according to what is passed to this resolver
    editProjectInfo: async (
      parent,
      { projectId, title, summary, genre, isPublic },
      context
    ) => {
      if (context.user) {
        const project = await Project.findByIdAndUpdate(
          { _id: projectId },
          { title, summary, genre, isPublic },
          { new: true, runValidators: true, omitUndefined: true }
        );

        return project;
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Deletes a project
    deleteProject: async (parent, { _id }, context) => {
      if (context.user) {
        return await Project.findByIdAndDelete({ _id });
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    addApplicant: async (parent, { projectId }, context) => {
      if (context.user) {
        return await Project.findByIdAndUpdate(
          { _id: projectId },
          { $addToSet: { collabsToAddOrDenyList: context.user._id } },
          { new: true, runValidators: true }
        );
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
    addChapter: async (
      parent,
      { projectId, title, chapterText, authorName },
      context
    ) => {
      if (context.user) {
        const newChapter = await Chapter.create(title, chapterText, authorName);

        await Project.findByIdAndUpdate(
          { _id: projectId },
          { $addToSet: { chapters: newChapter._id } },
          { runValidators: true }
        );

        return newChapter;
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Add comment to a chapter nested within a project (public)
    addComment: async (parent, { chapterId, commentText }, context) => {
      if (context.user) {
        return await Chapter.findByIdAndUpdate(
          { _id: chapterId },
          {
            $addToSet: {
              comments: { commentText, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Add commit to a chapter nested within a project (private)
    addCommit: async (
      parent,
      { chapterId, chapterText, commitText, commitType },
      context
    ) => {
      if (context.user) {
        return await Chapter.findByIdAndUpdate(
          { _id: chapterId },
          {
            $addToSet: {
              commits: {
                commitText,
                commitType,
                username: context.user.username,
              },
            },
            chapterText: chapterText,
          },
          { new: true, runValidators: true }
        );
      }

      throw new AuthenticationError("You need to be logged in...");
    },

    // Upvote a project
    upvoteProject: async (parent, { projectId }, context) => {
      if (context.user) {
        console.log(context.user);
        return await Project.findByIdAndUpdate(
          { _id: projectId },
          { $addToSet: { upvotes: context.user._id } },
          { new: true, runValidators: true }
        );
      }

      throw new AuthenticationError("You need to be logged in...");
    },
  },
};

module.exports = resolvers;