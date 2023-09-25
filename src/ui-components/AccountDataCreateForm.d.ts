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
export declare type AccountDataCreateFormInputValues = {
    username?: string;
    theme?: string;
    language?: string;
    taxRate?: number;
    email?: string;
};
export declare type AccountDataCreateFormValidationValues = {
    username?: ValidationFunction<string>;
    theme?: ValidationFunction<string>;
    language?: ValidationFunction<string>;
    taxRate?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AccountDataCreateFormOverridesProps = {
    AccountDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    theme?: PrimitiveOverrideProps<TextFieldProps>;
    language?: PrimitiveOverrideProps<TextFieldProps>;
    taxRate?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AccountDataCreateFormProps = React.PropsWithChildren<{
    overrides?: AccountDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AccountDataCreateFormInputValues) => AccountDataCreateFormInputValues;
    onSuccess?: (fields: AccountDataCreateFormInputValues) => void;
    onError?: (fields: AccountDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AccountDataCreateFormInputValues) => AccountDataCreateFormInputValues;
    onValidate?: AccountDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function AccountDataCreateForm(props: AccountDataCreateFormProps): React.ReactElement;
