const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    firstName: String
    lastName: String
    email: String
    projects: [Project]
    collaborations: [Project]
}

type Project {
    title: String
    genre: String
    createdAt: String
    authorName: String
    chapters: [Chapter]
    collaborators: [User]
    collabsToAddOrDenyList: [User]
    upvotes: [Vote]
}

type Chapter {
    chapterText: String
    createdAt: String
    authorName: String
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

type Reaction{
    reactionBody: String
    username: String
    createdAt: String
}

type Query {
    getUser: User
    getLoggedInUser: User
    getProjectsByUpvote: [Project]
    getProjectsBySearch(title: String, genre: String, authorName: String): Project
    getChapter(_id: ID!): Chapter
}
type Mutation {
    testmcgee: User
}
`;

module.exports = typeDefs;
