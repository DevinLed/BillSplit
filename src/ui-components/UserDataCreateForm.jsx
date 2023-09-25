/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { createUserData } from "../graphql/mutations";
export default function UserDataCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    email: "",
    personName: "",
    personPhone: "",
    personEmail: "",
    personOwing: "",
    createdAt: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [personName, setPersonName] = React.useState(initialValues.personName);
  const [personPhone, setPersonPhone] = React.useState(
    initialValues.personPhone
  );
  const [personEmail, setPersonEmail] = React.useState(
    initialValues.personEmail
  );
  const [personOwing, setPersonOwing] = React.useState(
    initialValues.personOwing
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmail(initialValues.email);
    setPersonName(initialValues.personName);
    setPersonPhone(initialValues.personPhone);
    setPersonEmail(initialValues.personEmail);
    setPersonOwing(initialValues.personOwing);
    setCreatedAt(initialValues.createdAt);
    setErrors({});
  };
  const validations = {
    email: [{ type: "Required" }],
    personName: [{ type: "Required" }],
    personPhone: [],
    personEmail: [],
    personOwing: [],
    createdAt: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          email,
          personName,
          personPhone,
          personEmail,
          personOwing,
          createdAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createUserData,
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserDataCreateForm")}
      {...rest}
    >
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              personName,
              personPhone,
              personEmail,
              personOwing,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Person name"
        isRequired={true}
        isReadOnly={false}
        value={personName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              personName: value,
              personPhone,
              personEmail,
              personOwing,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.personName ?? value;
          }
          if (errors.personName?.hasError) {
            runValidationTasks("personName", value);
          }
          setPersonName(value);
        }}
        onBlur={() => runValidationTasks("personName", personName)}
        errorMessage={errors.personName?.errorMessage}
        hasError={errors.personName?.hasError}
        {...getOverrideProps(overrides, "personName")}
      ></TextField>
      <TextField
        label="Person phone"
        isRequired={false}
        isReadOnly={false}
        value={personPhone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              personName,
              personPhone: value,
              personEmail,
              personOwing,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.personPhone ?? value;
          }
          if (errors.personPhone?.hasError) {
            runValidationTasks("personPhone", value);
          }
          setPersonPhone(value);
        }}
        onBlur={() => runValidationTasks("personPhone", personPhone)}
        errorMessage={errors.personPhone?.errorMessage}
        hasError={errors.personPhone?.hasError}
        {...getOverrideProps(overrides, "personPhone")}
      ></TextField>
      <TextField
        label="Person email"
        isRequired={false}
        isReadOnly={false}
        value={personEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              personName,
              personPhone,
              personEmail: value,
              personOwing,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.personEmail ?? value;
          }
          if (errors.personEmail?.hasError) {
            runValidationTasks("personEmail", value);
          }
          setPersonEmail(value);
        }}
        onBlur={() => runValidationTasks("personEmail", personEmail)}
        errorMessage={errors.personEmail?.errorMessage}
        hasError={errors.personEmail?.hasError}
        {...getOverrideProps(overrides, "personEmail")}
      ></TextField>
      <TextField
        label="Person owing"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={personOwing}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              email,
              personName,
              personPhone,
              personEmail,
              personOwing: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.personOwing ?? value;
          }
          if (errors.personOwing?.hasError) {
            runValidationTasks("personOwing", value);
          }
          setPersonOwing(value);
        }}
        onBlur={() => runValidationTasks("personOwing", personOwing)}
        errorMessage={errors.personOwing?.errorMessage}
        hasError={errors.personOwing?.hasError}
        {...getOverrideProps(overrides, "personOwing")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              email,
              personName,
              personPhone,
              personEmail,
              personOwing,
              createdAt: value,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
