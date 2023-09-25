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
export declare type UserDataCreateFormInputValues = {
    username?: string;
    personName?: string;
    personPhone?: string;
    personEmail?: string;
    personOwing?: number;
    createdAt?: string;
};
export declare type UserDataCreateFormValidationValues = {
    username?: ValidationFunction<string>;
    personName?: ValidationFunction<string>;
    personPhone?: ValidationFunction<string>;
    personEmail?: ValidationFunction<string>;
    personOwing?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserDataCreateFormOverridesProps = {
    UserDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    personName?: PrimitiveOverrideProps<TextFieldProps>;
    personPhone?: PrimitiveOverrideProps<TextFieldProps>;
    personEmail?: PrimitiveOverrideProps<TextFieldProps>;
    personOwing?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserDataCreateFormProps = React.PropsWithChildren<{
    overrides?: UserDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserDataCreateFormInputValues) => UserDataCreateFormInputValues;
    onSuccess?: (fields: UserDataCreateFormInputValues) => void;
    onError?: (fields: UserDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserDataCreateFormInputValues) => UserDataCreateFormInputValues;
    onValidate?: UserDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserDataCreateForm(props: UserDataCreateFormProps): React.ReactElement;
