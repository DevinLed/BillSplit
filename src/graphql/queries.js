/* eslint-disable */
// This is an auto-generated file. It will be overwritten

export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
      id
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

export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        personName
        personPhone
        personEmail
        personOwing
        createdAt
        updatedAt
        __typename
      }
      nextToken
    }
  }
`;
