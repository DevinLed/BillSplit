/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserData = /* GraphQL */ `
  mutation CreateUserData(
    $input: CreateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    createUserData(input: $input, condition: $condition) {
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
export const updateUserData = /* GraphQL */ `
  mutation UpdateUserData(
    $input: UpdateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    updateUserData(input: $input, condition: $condition) {
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
export const deleteUserData = /* GraphQL */ `
  mutation DeleteUserData(
    $input: DeleteUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    deleteUserData(input: $input, condition: $condition) {
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
export const createHistoryData = /* GraphQL */ `
  mutation CreateHistoryData(
    $input: CreateHistoryDataInput!
    $condition: ModelHistoryDataConditionInput
  ) {
    createHistoryData(input: $input, condition: $condition) {
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
export const updateHistoryData = /* GraphQL */ `
  mutation UpdateHistoryData(
    $input: UpdateHistoryDataInput!
    $condition: ModelHistoryDataConditionInput
  ) {
    updateHistoryData(input: $input, condition: $condition) {
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
export const deleteHistoryData = /* GraphQL */ `
  mutation DeleteHistoryData(
    $input: DeleteHistoryDataInput!
    $condition: ModelHistoryDataConditionInput
  ) {
    deleteHistoryData(input: $input, condition: $condition) {
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
export const createAccountData = /* GraphQL */ `
  mutation CreateAccountData(
    $input: CreateAccountDataInput!
    $condition: ModelAccountDataConditionInput
  ) {
    createAccountData(input: $input, condition: $condition) {
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
export const updateAccountData = /* GraphQL */ `
  mutation UpdateAccountData(
    $input: UpdateAccountDataInput!
    $condition: ModelAccountDataConditionInput
  ) {
    updateAccountData(input: $input, condition: $condition) {
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
export const deleteAccountData = /* GraphQL */ `
  mutation DeleteAccountData(
    $input: DeleteAccountDataInput!
    $condition: ModelAccountDataConditionInput
  ) {
    deleteAccountData(input: $input, condition: $condition) {
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
