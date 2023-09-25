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
export declare type HistoryDataUpdateFormInputValues = {
    username?: string;
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
export declare type HistoryDataUpdateFormValidationValues = {
    username?: ValidationFunction<string>;
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
export declare type HistoryDataUpdateFormOverridesProps = {
    HistoryDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
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
export declare type HistoryDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: HistoryDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    historyData?: any;
    onSubmit?: (fields: HistoryDataUpdateFormInputValues) => HistoryDataUpdateFormInputValues;
    onSuccess?: (fields: HistoryDataUpdateFormInputValues) => void;
    onError?: (fields: HistoryDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HistoryDataUpdateFormInputValues) => HistoryDataUpdateFormInputValues;
    onValidate?: HistoryDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HistoryDataUpdateForm(props: HistoryDataUpdateFormProps): React.ReactElement;
