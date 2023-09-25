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
import { getHistoryData } from "../graphql/queries";
import { updateHistoryData } from "../graphql/mutations";
export default function HistoryDataUpdateForm(props) {
  const {
    id: idProp,
    historyData: historyDataModelProp,
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
    merchantName: "",
    startDate: "",
    invoiceNumber: "",
    receiptTotal: "",
    selectedValue: "",
    personReceiptAmount: "",
    taxActual: "",
    createdAt: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [personName, setPersonName] = React.useState(initialValues.personName);
  const [merchantName, setMerchantName] = React.useState(
    initialValues.merchantName
  );
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [invoiceNumber, setInvoiceNumber] = React.useState(
    initialValues.invoiceNumber
  );
  const [receiptTotal, setReceiptTotal] = React.useState(
    initialValues.receiptTotal
  );
  const [selectedValue, setSelectedValue] = React.useState(
    initialValues.selectedValue
  );
  const [personReceiptAmount, setPersonReceiptAmount] = React.useState(
    initialValues.personReceiptAmount
  );
  const [taxActual, setTaxActual] = React.useState(initialValues.taxActual);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = historyDataRecord
      ? { ...initialValues, ...historyDataRecord }
      : initialValues;
    setEmail(cleanValues.email);
    setPersonName(cleanValues.personName);
    setMerchantName(cleanValues.merchantName);
    setStartDate(cleanValues.startDate);
    setInvoiceNumber(cleanValues.invoiceNumber);
    setReceiptTotal(cleanValues.receiptTotal);
    setSelectedValue(cleanValues.selectedValue);
    setPersonReceiptAmount(cleanValues.personReceiptAmount);
    setTaxActual(cleanValues.taxActual);
    setCreatedAt(cleanValues.createdAt);
    setErrors({});
  };
  const [historyDataRecord, setHistoryDataRecord] =
    React.useState(historyDataModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getHistoryData,
              variables: { id: idProp },
            })
          )?.data?.getHistoryData
        : historyDataModelProp;
      setHistoryDataRecord(record);
    };
    queryData();
  }, [idProp, historyDataModelProp]);
  React.useEffect(resetStateValues, [historyDataRecord]);
  const validations = {
    email: [{ type: "Required" }],
    personName: [{ type: "Required" }],
    merchantName: [{ type: "Required" }],
    startDate: [{ type: "Required" }],
    invoiceNumber: [{ type: "Required" }],
    receiptTotal: [{ type: "Required" }],
    selectedValue: [{ type: "Required" }],
    personReceiptAmount: [{ type: "Required" }],
    taxActual: [{ type: "Required" }],
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
          merchantName,
          startDate,
          invoiceNumber,
          receiptTotal,
          selectedValue,
          personReceiptAmount,
          taxActual,
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
            query: updateHistoryData,
            variables: {
              input: {
                id: historyDataRecord.id,
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
      {...getOverrideProps(overrides, "HistoryDataUpdateForm")}
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
              merchantName,
              startDate,
              invoiceNumber,
              receiptTotal,
              selectedValue,
              personReceiptAmount,
              taxActual,
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
              merchantName,
              startDate,
              invoiceNumber,
              receiptTotal,
              selectedValue,
              personReceiptAmount,
              taxActual,
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
        label="Merchant name"
        isRequired={true}
        isReadOnly={false}
        value={merchantName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              personName,
              merchantName: value,
              startDate,
              invoiceNumber,
              receiptTotal,
              selectedValue,
              personReceiptAmount,
              taxActual,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.merchantName ?? value;
          }
          if (errors.merchantName?.hasError) {
            runValidationTasks("merchantName", value);
          }
          setMerchantName(value);
        }}
        onBlur={() => runValidationTasks("merchantName", merchantName)}
        errorMessage={errors.merchantName?.errorMessage}
        hasError={errors.merchantName?.hasError}
        {...getOverrideProps(overrides, "merchantName")}
      ></TextField>
      <TextField
        label="Start date"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={startDate && convertToLocal(new Date(startDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              email,
              personName,
              merchantName,
              startDate: value,
              invoiceNumber,
              receiptTotal,
              selectedValue,
              personReceiptAmount,
              taxActual,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.startDate ?? value;
          }
          if (errors.startDate?.hasError) {
            runValidationTasks("startDate", value);
          }
          setStartDate(value);
        }}
        onBlur={() => runValidationTasks("startDate", startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, "startDate")}
      ></TextField>
      <TextField
        label="Invoice number"
        isRequired={true}
        isReadOnly={false}
        value={invoiceNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              personName,
              merchantName,
              startDate,
              invoiceNumber: value,
              receiptTotal,
              selectedValue,
              personReceiptAmount,
              taxActual,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.invoiceNumber ?? value;
          }
          if (errors.invoiceNumber?.hasError) {
            runValidationTasks("invoiceNumber", value);
          }
          setInvoiceNumber(value);
        }}
        onBlur={() => runValidationTasks("invoiceNumber", invoiceNumber)}
        errorMessage={errors.invoiceNumber?.errorMessage}
        hasError={errors.invoiceNumber?.hasError}
        {...getOverrideProps(overrides, "invoiceNumber")}
      ></TextField>
      <TextField
        label="Receipt total"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={receiptTotal}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              email,
              personName,
              merchantName,
              startDate,
              invoiceNumber,
              receiptTotal: value,
              selectedValue,
              personReceiptAmount,
              taxActual,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.receiptTotal ?? value;
          }
          if (errors.receiptTotal?.hasError) {
            runValidationTasks("receiptTotal", value);
          }
          setReceiptTotal(value);
        }}
        onBlur={() => runValidationTasks("receiptTotal", receiptTotal)}
        errorMessage={errors.receiptTotal?.errorMessage}
        hasError={errors.receiptTotal?.hasError}
        {...getOverrideProps(overrides, "receiptTotal")}
      ></TextField>
      <TextField
        label="Selected value"
        isRequired={true}
        isReadOnly={false}
        value={selectedValue}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              personName,
              merchantName,
              startDate,
              invoiceNumber,
              receiptTotal,
              selectedValue: value,
              personReceiptAmount,
              taxActual,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.selectedValue ?? value;
          }
          if (errors.selectedValue?.hasError) {
            runValidationTasks("selectedValue", value);
          }
          setSelectedValue(value);
        }}
        onBlur={() => runValidationTasks("selectedValue", selectedValue)}
        errorMessage={errors.selectedValue?.errorMessage}
        hasError={errors.selectedValue?.hasError}
        {...getOverrideProps(overrides, "selectedValue")}
      ></TextField>
      <TextField
        label="Person receipt amount"
        isRequired={true}
        isReadOnly={false}
        value={personReceiptAmount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              personName,
              merchantName,
              startDate,
              invoiceNumber,
              receiptTotal,
              selectedValue,
              personReceiptAmount: value,
              taxActual,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.personReceiptAmount ?? value;
          }
          if (errors.personReceiptAmount?.hasError) {
            runValidationTasks("personReceiptAmount", value);
          }
          setPersonReceiptAmount(value);
        }}
        onBlur={() =>
          runValidationTasks("personReceiptAmount", personReceiptAmount)
        }
        errorMessage={errors.personReceiptAmount?.errorMessage}
        hasError={errors.personReceiptAmount?.hasError}
        {...getOverrideProps(overrides, "personReceiptAmount")}
      ></TextField>
      <TextField
        label="Tax actual"
        isRequired={true}
        isReadOnly={false}
        value={taxActual}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              personName,
              merchantName,
              startDate,
              invoiceNumber,
              receiptTotal,
              selectedValue,
              personReceiptAmount,
              taxActual: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.taxActual ?? value;
          }
          if (errors.taxActual?.hasError) {
            runValidationTasks("taxActual", value);
          }
          setTaxActual(value);
        }}
        onBlur={() => runValidationTasks("taxActual", taxActual)}
        errorMessage={errors.taxActual?.errorMessage}
        hasError={errors.taxActual?.hasError}
        {...getOverrideProps(overrides, "taxActual")}
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
              merchantName,
              startDate,
              invoiceNumber,
              receiptTotal,
              selectedValue,
              personReceiptAmount,
              taxActual,
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
          isDisabled={!(idProp || historyDataModelProp)}
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
              !(idProp || historyDataModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
