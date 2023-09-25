/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserData = /* GraphQL */ `
  query GetUserData($id: ID!) {
    getUserData(id: $id) {
      id
      email
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
        email
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
export const getUsersDB = /* GraphQL */ `
  query GetUsersDB($id: ID!) {
    getUsersDB(id: $id) {
      id
      email
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
export const listUsersDBS = /* GraphQL */ `
  query ListUsersDBS(
    $filter: ModelUsersDBFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersDBS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
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
      email
      personName
      merchantName
      startDate
      invoiceNumber
      receiptTotal
      selectedValue
      personReceiptAmount
      taxActual
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
        email
        personName
        merchantName
        startDate
        invoiceNumber
        receiptTotal
        selectedValue
        personReceiptAmount
        taxActual
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
      email
      theme
      language
      taxRate
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
        email
        theme
        language
        taxRate
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
