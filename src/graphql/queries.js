/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserData = /* GraphQL */ `
  query GetUserData($id: ID!) {
    getUserData(id: $id) {
      id
      username
      personName
      personPhone
      personEmail
      personOwing
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserData = /* GraphQL */ `
  query ListUserData(
    $filter: ModelUserDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        personName
        personPhone
        personEmail
        personOwing
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
