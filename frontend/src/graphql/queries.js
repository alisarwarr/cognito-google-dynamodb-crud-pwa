/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOnePost = /* GraphQL */ `
  query GetOnePost($id: ID!) {
    getOnePost(id: $id) {
      id
      title
      description
      author
      city
      country
    }
  }
`;
export const getAllPosts = /* GraphQL */ `
  query GetAllPosts {
    getAllPosts {
      id
      title
      description
      author
      city
      country
    }
  }
`;
