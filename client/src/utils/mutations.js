import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $title: String!
    $genre: String!
    $summary: String!
    $authorName: String!
  ) {
    addProject(
      title: $title
      genre: $genre
      summary: $summary
      authorName: $authorName
    ) {
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
      }
      collaborators {
        _id
        username
      }
      collabsToAddOrDenyList {
        _id
        username
      }
      upvoteCount
    }
  }
`;

export const EDIT_PROJECT_INFO = gql`
  mutation editProjectInfo(
    $projectId: ID!
    $title: String
    $summary: String
    $genre: String
    $isPublic: Boolean
  ) {
    editProjectInfo(
      projectId: $projectId
      title: $title
      summary: $summary
      genre: $genre
      isPublic: $isPublic
    ) {
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
      }
      collaborators {
        _id
        username
      }
      collabsToAddOrDenyList {
        _id
        username
      }
      upvoteCount
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($_id: ID!) {
    deleteProject(_id: $_id) {
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
      }
      collaborators {
        _id
        username
      }
      collabsToAddOrDenyList {
        _id
        username
      }
      upvoteCount
    }
  }
`;

export const ADD_APPLICANT = gql`
  mutation addApplicant($projectId: ID!, $userId: ID!) {
    addApplicant(projectId: $projectId, userId: $userId) {
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
      }
      collaborators {
        _id
        username
      }
      collabsToAddOrDenyList {
        _id
        username
      }
      upvoteCount
    }
  }
`;

export const ACCEPT_COLLABORATOR = gql`
  mutation acceptCollaborator($projectId: ID!, $userId: ID!) {
    acceptCollaborator(projectId: $projectId, userId: $userId) {
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
      }
      collaborators {
        _id
        username
      }
      collabsToAddOrDenyList {
        _id
        username
      }
      upvoteCount
    }
  }
`;

export const DENY_COLLABORATOR = gql`
  mutation denyCollaborator($projectId: ID!, $userId: ID!) {
    denyCollaborator(projectId: $projectId, userId: $userId) {
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
      }
      collaborators {
        _id
        username
      }
      collabsToAddOrDenyList {
        _id
        username
      }
      upvoteCount
    }
  }
`;

export const ADD_CHAPTER = gql`
  mutation addChapter(
    $projectId: ID!
    $title: String!
    $chapterText: String!
    $authorName: String!
  ) {
    addChapter(
      projectId: $projectId
      title: $title
      chapterText: $chapterText
      authorName: $authorName
    ) {
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
      }
      commits {
        _id
        commitText
        commitType
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($chapterId: ID!, $commentText: String!, $username: String!) {
    addComment(chapterId: $chapterId, commentText: $commentText, username: $username) {
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
      }
      commits {
        _id
        commitText
        commitType
      }
    }
  }
`;

export const ADD_COMMIT = gql`
  mutation addCommit(
    $chapterId: ID!
    $title: String!
    $isPublic: Boolean!
    $chapterText: String!
    $commitText: String!
    $commitType: String!
  ) {
    addCommit(
      chapterId: $chapterId
      title: $title
      isPublic: $isPublic
      chapterText: $chapterText
      commitText: $commitText
      commitType: $commitType
    ) {
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
      }
      commits {
        _id
        commitText
        commitType
      }
    }
  }
`;

export const UPVOTE_PROJECT = gql`
  mutation upvoteProject($projectId: ID!, $userId: ID!) {
    upvoteProject(projectId: $projectId, userId: $userId) {
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
      }
      collaborators {
        _id
        username
      }
      collabsToAddOrDenyList {
        _id
        username
      }
      upvoteCount
    }
  }
`;