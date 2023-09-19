/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserData = /* GraphQL */ `
  subscription OnCreateUserData($filter: ModelSubscriptionUserDataFilterInput) {
    onCreateUserData(filter: $filter) {
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
export const onUpdateUserData = /* GraphQL */ `
  subscription OnUpdateUserData($filter: ModelSubscriptionUserDataFilterInput) {
    onUpdateUserData(filter: $filter) {
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
export const onDeleteUserData = /* GraphQL */ `
  subscription OnDeleteUserData($filter: ModelSubscriptionUserDataFilterInput) {
    onDeleteUserData(filter: $filter) {
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
export const onCreateHistoryData = /* GraphQL */ `
  subscription OnCreateHistoryData(
    $filter: ModelSubscriptionHistoryDataFilterInput
  ) {
    onCreateHistoryData(filter: $filter) {
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
export const onUpdateHistoryData = /* GraphQL */ `
  subscription OnUpdateHistoryData(
    $filter: ModelSubscriptionHistoryDataFilterInput
  ) {
    onUpdateHistoryData(filter: $filter) {
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
export const onDeleteHistoryData = /* GraphQL */ `
  subscription OnDeleteHistoryData(
    $filter: ModelSubscriptionHistoryDataFilterInput
  ) {
    onDeleteHistoryData(filter: $filter) {
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
export const onCreateAccountData = /* GraphQL */ `
  subscription OnCreateAccountData(
    $filter: ModelSubscriptionAccountDataFilterInput
  ) {
    onCreateAccountData(filter: $filter) {
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
export const onUpdateAccountData = /* GraphQL */ `
  subscription OnUpdateAccountData(
    $filter: ModelSubscriptionAccountDataFilterInput
  ) {
    onUpdateAccountData(filter: $filter) {
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
export const onDeleteAccountData = /* GraphQL */ `
  subscription OnDeleteAccountData(
    $filter: ModelSubscriptionAccountDataFilterInput
  ) {
    onDeleteAccountData(filter: $filter) {
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
