/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $title: String!
    $description: String!
    $author: String!
    $city: String!
    $country: String!
  ) {
    createPost(
      title: $title
      description: $description
      author: $author
      city: $city
      country: $country
    ) {
      id
      title
      description
      author
      city
      country
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $id: ID!
    $title: String!
    $description: String!
    $author: String!
    $city: String!
    $country: String!
  ) {
    updatePost(
      id: $id
      title: $title
      description: $description
      author: $author
      city: $city
      country: $country
    ) {
      id
      title
      description
      author
      city
      country
    }
  }
`;
