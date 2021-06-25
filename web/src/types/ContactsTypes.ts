export interface IValues {
    name: string,
    phone: string,
    email: string,
    description: string,
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

export interface ParamsType {
    id: string
}