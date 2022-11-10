export interface ILogin {
    email: string;
    password: string;
}

export interface ILoggedUser {
    id: number;
    email: string;
}
export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserCreate {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}