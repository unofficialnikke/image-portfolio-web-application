export type RegisterInputs = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

export type LoginInputs = {
    email: string
    password: string
}

export type AddNewUserResult = {
    success: boolean;
    data: string;
} | undefined;