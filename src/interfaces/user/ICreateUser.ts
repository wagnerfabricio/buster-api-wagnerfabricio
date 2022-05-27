interface ICreateUser {
  id?: string;
  name: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

export default ICreateUser;
