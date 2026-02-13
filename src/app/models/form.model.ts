export enum ControlType {
    TEXT,
    PASSWORD,
    EMAIL
}

export interface Control {
    selector: string;
    type: ControlType;
    placeholder?: string;
    value?: any;
    state?: ValidityState;
    valid?: boolean;
    required?: boolean;
}

export interface MyForm {
    controls: Control[];
    valid?: boolean;
    value?: { [key: string]: any };
}