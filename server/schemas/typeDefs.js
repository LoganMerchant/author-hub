const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String
    email: String
    projects: [Project]
    collaborations: [Project]
  }

  type Project {
    title: String
    summary: String
    genre: String
    createdAt: String
    authorName: String
    isPublic: Boolean
    chapters: [Chapter]
    collaborators: [User]
    collabsToAddOrDenyList: [User]
    upvotes: [Vote]
  }

  type Chapter {
    title: String
    chapterText: String
    createdAt: String
    isPublic: Boolean
    collaborators: [User]
    comments: [Comment]
    commits: [Commit]
  }

  type Vote {
    userId: ID
  }

  type Comment {
    commentText: String
    createdAt: String
    username: String
    reactions: [Reaction]
  }

  type Commit {
    commitText: String
    commitType: String
    createdAt: String
    username: String
  }

  type Reaction {
    reactionBody: String
    username: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getUser: User
    getLoggedInUser: User
    getProjectsByUpvote: [Project]
    getProjectsBySearch(
      title: String
      genre: String
      authorName: String
    ): Project
    getChapter(bookId: ID!, _id: ID!): Chapter
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProject(title: String!, genre: String!): Project
    editProjectInfo(
      title: String
      summary: String
      genre: String
      isPublic: Boolean
    ): Project
    deleteProject(_id: ID): Project
    acceptCollaborator(projectId: ID!, userId: ID!): Project
    denyCollaborator(projectId: ID!, userId: ID!): Project
    addChapter(projectId: ID!, title: String!, chapterText: String!): Project
    addComment(commentText: String!): Project
    addCommit(commitText: String!, commitType: String!): Project
    upvoteProject(userId: ID!): Project
  }
`;

module.exports = typeDefs;
