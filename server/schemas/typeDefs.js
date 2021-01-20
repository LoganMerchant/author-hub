const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    firstName: String
    lastName: String
    email: String
    projects: [Project]
}

type Project {
    
}

type Chapter {

}

type Votes {

}

type Comment {

}

type Commit {

}

type Query {
    getUser: User
    getProjects(name: String, genre: String): [Project]
    getChapter(_id: ID!): Chapter
}
type Mutation {

}
`;

module.exports = typeDefs;
