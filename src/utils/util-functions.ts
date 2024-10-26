import { RegisterOptions } from "react-hook-form-mui"

export const getValidations = (
  required: boolean,
  minLength?: boolean | number,
  maxLength?: boolean | number,
  extraValidatons = {},
): RegisterOptions<any> => {
  const validations: RegisterOptions<any> = extraValidatons

  if (required) {
    validations.required = 'Please fill out the field'
  }

  if (typeof minLength === 'number') {
    validations.minLength = {
      value: minLength,
      message: `Minimum ${minLength} characters required to enter`,
    }
  }

  if (typeof maxLength === 'number') {
    validations.maxLength = {
      value: maxLength,
      message: `Maximum ${maxLength} characters allowed to enter`,
    }
  }

  return validations
}

export const extractErrorMsg = (error: any) =>
  typeof error === 'string'
    ? error
    : typeof error === 'object'
      ? error?.error?.msg ||
        error?.error?.message ||
        error?.data?.error?.msg ||
        error?.msg ||
        error?.[0]?.password ||
        'Unknown error occured'
      : 'Unknown error occured'
