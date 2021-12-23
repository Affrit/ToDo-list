export interface IUserData {
  name: string;
  email: string;
  password: string;
}

export interface IUserDataErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}
