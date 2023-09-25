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
export declare type UserDBCreateFormInputValues = {
    email?: string;
    personName?: string;
    personPhone?: string;
    personEmail?: string;
    personOwing?: number;
    createdAt?: string;
};
export declare type UserDBCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    personName?: ValidationFunction<string>;
    personPhone?: ValidationFunction<string>;
    personEmail?: ValidationFunction<string>;
    personOwing?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserDBCreateFormOverridesProps = {
    UserDBCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    personName?: PrimitiveOverrideProps<TextFieldProps>;
    personPhone?: PrimitiveOverrideProps<TextFieldProps>;
    personEmail?: PrimitiveOverrideProps<TextFieldProps>;
    personOwing?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserDBCreateFormProps = React.PropsWithChildren<{
    overrides?: UserDBCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserDBCreateFormInputValues) => UserDBCreateFormInputValues;
    onSuccess?: (fields: UserDBCreateFormInputValues) => void;
    onError?: (fields: UserDBCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserDBCreateFormInputValues) => UserDBCreateFormInputValues;
    onValidate?: UserDBCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserDBCreateForm(props: UserDBCreateFormProps): React.ReactElement;
