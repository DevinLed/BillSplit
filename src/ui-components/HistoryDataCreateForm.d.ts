/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HistoryDataCreateFormInputValues = {
    email?: string;
    personName?: string;
    merchantName?: string;
    startDate?: string;
    invoiceNumber?: string;
    receiptTotal?: number;
    selectedValue?: string;
    personReceiptAmount?: string;
    taxActual?: string;
    createdAt?: string;
};
export declare type HistoryDataCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    personName?: ValidationFunction<string>;
    merchantName?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    invoiceNumber?: ValidationFunction<string>;
    receiptTotal?: ValidationFunction<number>;
    selectedValue?: ValidationFunction<string>;
    personReceiptAmount?: ValidationFunction<string>;
    taxActual?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HistoryDataCreateFormOverridesProps = {
    HistoryDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    personName?: PrimitiveOverrideProps<TextFieldProps>;
    merchantName?: PrimitiveOverrideProps<TextFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    invoiceNumber?: PrimitiveOverrideProps<TextFieldProps>;
    receiptTotal?: PrimitiveOverrideProps<TextFieldProps>;
    selectedValue?: PrimitiveOverrideProps<TextFieldProps>;
    personReceiptAmount?: PrimitiveOverrideProps<TextFieldProps>;
    taxActual?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HistoryDataCreateFormProps = React.PropsWithChildren<{
    overrides?: HistoryDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HistoryDataCreateFormInputValues) => HistoryDataCreateFormInputValues;
    onSuccess?: (fields: HistoryDataCreateFormInputValues) => void;
    onError?: (fields: HistoryDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HistoryDataCreateFormInputValues) => HistoryDataCreateFormInputValues;
    onValidate?: HistoryDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function HistoryDataCreateForm(props: HistoryDataCreateFormProps): React.ReactElement;
