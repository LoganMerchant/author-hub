const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    projects: [Project]
    collaborations: [Project]
  }
  type Project {
    _id: ID
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
    upvoteCount: Int
  }
  type Chapter {
    _id: ID
    title: String
    chapterText: String
    authorName: String
    createdAt: String
    isPublic: Boolean
    collaborators: [User]
    comments: [Comment]
    commits: [Commit]
  }
  type Vote {
    _id: ID
    userId: ID
  }
  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
    reactions: [Reaction]
  }
  type Commit {
    _id: ID
    commitText: String
    commitType: String
    createdAt: String
    username: String
  }
  type Reaction {
    _id: ID
    reactionBody: String
    username: String
    createdAt: String
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    getUser(_id: ID!): User
    getUsers: [User]
    getProjectsByUpvote: [Project]
    getProjectsBySearch(genre: String!, searchTerm: String): [Project]
    getProjectInfo(_id: ID!): Project
    getChapter(_id: ID!): Chapter
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProject(
      title: String!
      genre: String!
      summary: String!
      authorName: String!
    ): Project
    editProjectInfo(
      projectId: ID!
      title: String
      summary: String
      genre: String
      isPublic: Boolean
    ): Project
    deleteProject(_id: ID): Project
    addApplicant(projectId: ID!, userId: ID!): Project
    acceptCollaborator(projectId: ID!, userId: ID!): Project
    denyCollaborator(projectId: ID!, userId: ID!): Project
    addChapter(
      projectId: ID!
      title: String!
      chapterText: String!
      authorName: String!
    ): Chapter
    addComment(chapterId: ID!, commentText: String!, username: String!): Chapter
    addCommit(
      chapterId: ID!
      title: String!
      isPublic: Boolean!
      chapterText: String!
      commitText: String!
      commitType: String!
    ): Chapter
    upvoteProject(projectId: ID!, userId: ID!): Project
  }
`;

module.exports = typeDefs;
