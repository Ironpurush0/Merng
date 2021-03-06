import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
      }
    }
  }
`;

export const FETCH_USERS = gql`
  query getUsers {
    getUsers {
      id
      username
      email
      createdAt
    }
  }
`;
