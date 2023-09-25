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
export declare type AccountDataUpdateFormInputValues = {
    email?: string;
    theme?: string;
    language?: string;
    taxRate?: number;
    createdAt?: string;
};
export declare type AccountDataUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
    theme?: ValidationFunction<string>;
    language?: ValidationFunction<string>;
    taxRate?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AccountDataUpdateFormOverridesProps = {
    AccountDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    theme?: PrimitiveOverrideProps<TextFieldProps>;
    language?: PrimitiveOverrideProps<TextFieldProps>;
    taxRate?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AccountDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: AccountDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    accountData?: any;
    onSubmit?: (fields: AccountDataUpdateFormInputValues) => AccountDataUpdateFormInputValues;
    onSuccess?: (fields: AccountDataUpdateFormInputValues) => void;
    onError?: (fields: AccountDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AccountDataUpdateFormInputValues) => AccountDataUpdateFormInputValues;
    onValidate?: AccountDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AccountDataUpdateForm(props: AccountDataUpdateFormProps): React.ReactElement;
