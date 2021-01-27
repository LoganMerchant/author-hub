import gql from "graphql-tag";

export const QUERY_GET_USER = gql`
  query getUser($_id: ID!) {
    getUser(_id: $_id) {
      _id
      username
      email
      projects {
        _id
        title
      }
      collaborations {
        _id
        title
      }
    }
  }
`;

export const QUERY_GET_USERS = gql`
  {
    getUsers {
      _id
      username
      email
      projects {
        _id
        title
      }
      collaborations {
        _id
        title
      }
    }
  }
`;

export const QUERY_GET_PROJECTS_BY_UPVOTE = gql`
  {
    getProjectsByUpvote {
      _id
      title
      summary
      genre
      authorName
      chapters {
        _id
        title
      }
      collaborators {
        _id
        username
      }
      upvoteCount
    }
  }
`;

export const QUERY_GET_PROJECTS_BY_SEARCH = gql`
  query getProjectsBySearch($searchTerm: String, $genre: String!) {
    getProjectsBySearch(searchTerm: $searchTerm, genre: $genre) {
      _id
      title
      summary
      genre
      authorName
      chapters {
        _id
        title
      }
      collaborators {
        _id
        username
      }
      upvoteCount
    }
  }
`;

export const QUERY_GET_PROJECT_INFO = gql`
  query getProjectInfo($id: ID!) {
    getProjectInfo(_id: $id) {
      _id
      title
      summary
      genre
      createdAt
      authorName
      isPublic
      chapters {
        _id
        title
        isPublic
      }
      collaborators {
        _id
        username
      }
      collabsToAddOrDenyList {
        _id
        username
      }
      upvotes {
        userId
      }
      upvoteCount
    }
  }
`;

export const QUERY_GET_CHAPTER = gql`
  query getChapter($id: ID!) {
    getChapter(_id: $id) {
      _id
      title
      chapterText
      authorName
      createdAt
      isPublic
      collaborators {
        _id
        username
      }
      comments {
        _id
        commentText
        username
        createdAt
      }
      commits {
        _id
        commitText
        commitType
      }
    }
  }
`;