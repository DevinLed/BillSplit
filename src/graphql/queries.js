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
export const getHistoryData = /* GraphQL */ `
  query GetHistoryData($id: ID!) {
    getHistoryData(id: $id) {
      id
      username
      personName
      receiptStore
      receiptDate
      receiptInvoice
      receiptTotal
      personPurchase
      oweTotal
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listHistoryData = /* GraphQL */ `
  query ListHistoryData(
    $filter: ModelHistoryDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHistoryData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        personName
        receiptStore
        receiptDate
        receiptInvoice
        receiptTotal
        personPurchase
        oweTotal
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAccountData = /* GraphQL */ `
  query GetAccountData($id: ID!) {
    getAccountData(id: $id) {
      id
      username
      theme
      language
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAccountData = /* GraphQL */ `
  query ListAccountData(
    $filter: ModelAccountDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccountData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        theme
        language
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
