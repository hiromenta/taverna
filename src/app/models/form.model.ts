export enum ControlType {
    TEXT = 'text',
    PASSWORD = 'password',
    EMAIL = 'email',
    CHECKBOX = 'checkbox',
    PHONE = 'phone',
    ZIPCODE = 'zipcode'
}

export const Errors = {
    badInput: 'form.errors.badInput',
    customError: 'form.errors.customError',
    patternMismatch: 'form.errors.patternMismatch',
    rangeOverflow: 'form.errors.rangeOverflow',
    rangeUnderflow: 'form.errors.rangeUnderflow',
    stepMismatch: 'form.errors.stepMismatch',
    tooLong: 'form.errors.tooLong',
    tooShort: 'form.errors.tooShort',
    typeMismatch: 'form.errors.typeMismatch',
    valid: 'form.errors.valid',
    valueMissing: 'form.errors.valueMissing'
}

export interface Control {
    selector: string;
    type: ControlType;
    placeholder?: string;
    value?: any;
    state?: ValidityState;
    valid?: boolean;
    required?: boolean;
    label?: string;
    errors?: string[];
    touched?: boolean;
    description?: string;
    darkStyle?: boolean;
    size?: number;
}

export interface MyForm {
    controls: Control[];
    valid?: boolean;
    value?: { [key: string]: any };
}