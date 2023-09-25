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
import { getAccountData } from "../graphql/queries";
import { updateAccountData } from "../graphql/mutations";
export default function AccountDataUpdateForm(props) {
  const {
    id: idProp,
    accountData: accountDataModelProp,
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
    theme: "",
    language: "",
    taxRate: "",
    createdAt: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [theme, setTheme] = React.useState(initialValues.theme);
  const [language, setLanguage] = React.useState(initialValues.language);
  const [taxRate, setTaxRate] = React.useState(initialValues.taxRate);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = accountDataRecord
      ? { ...initialValues, ...accountDataRecord }
      : initialValues;
    setEmail(cleanValues.email);
    setTheme(cleanValues.theme);
    setLanguage(cleanValues.language);
    setTaxRate(cleanValues.taxRate);
    setCreatedAt(cleanValues.createdAt);
    setErrors({});
  };
  const [accountDataRecord, setAccountDataRecord] =
    React.useState(accountDataModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getAccountData,
              variables: { id: idProp },
            })
          )?.data?.getAccountData
        : accountDataModelProp;
      setAccountDataRecord(record);
    };
    queryData();
  }, [idProp, accountDataModelProp]);
  React.useEffect(resetStateValues, [accountDataRecord]);
  const validations = {
    email: [{ type: "Required" }],
    theme: [{ type: "Required" }],
    language: [{ type: "Required" }],
    taxRate: [{ type: "Required" }],
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
          theme,
          language,
          taxRate,
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
            query: updateAccountData,
            variables: {
              input: {
                id: accountDataRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "AccountDataUpdateForm")}
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
              theme,
              language,
              taxRate,
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
        label="Theme"
        isRequired={true}
        isReadOnly={false}
        value={theme}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              theme: value,
              language,
              taxRate,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.theme ?? value;
          }
          if (errors.theme?.hasError) {
            runValidationTasks("theme", value);
          }
          setTheme(value);
        }}
        onBlur={() => runValidationTasks("theme", theme)}
        errorMessage={errors.theme?.errorMessage}
        hasError={errors.theme?.hasError}
        {...getOverrideProps(overrides, "theme")}
      ></TextField>
      <TextField
        label="Language"
        isRequired={true}
        isReadOnly={false}
        value={language}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              theme,
              language: value,
              taxRate,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.language ?? value;
          }
          if (errors.language?.hasError) {
            runValidationTasks("language", value);
          }
          setLanguage(value);
        }}
        onBlur={() => runValidationTasks("language", language)}
        errorMessage={errors.language?.errorMessage}
        hasError={errors.language?.hasError}
        {...getOverrideProps(overrides, "language")}
      ></TextField>
      <TextField
        label="Tax rate"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={taxRate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              email,
              theme,
              language,
              taxRate: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.taxRate ?? value;
          }
          if (errors.taxRate?.hasError) {
            runValidationTasks("taxRate", value);
          }
          setTaxRate(value);
        }}
        onBlur={() => runValidationTasks("taxRate", taxRate)}
        errorMessage={errors.taxRate?.errorMessage}
        hasError={errors.taxRate?.hasError}
        {...getOverrideProps(overrides, "taxRate")}
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
              theme,
              language,
              taxRate,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || accountDataModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || accountDataModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
