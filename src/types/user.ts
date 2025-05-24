export interface IUser {
  id: string;
  avatar: string | null;
  fullname: string;
  username: string;
  email: string;
  role: string;
  warehouse_id: string | null;
  merchant_id: string | null;
  position: string;
  created_at: Date;
  updated_at: Date;
  locked_at: Date | null;
}

export type ILogin = {
  username: string;
  password: string;
};

export type IRegister = {
  username: string;
  email: string;
  fullname: string;
  password: string;
  confirm_password: string;
};

export type IEmail = {
  email: string;
};

export type ISetPassword = {
  recover_token: string;
  password: string;
  confirm_password: string;
};

export type IChangePassword = {
  current_password: string;
  password: string;
  confirm_password: string;
};

export type IVerityToken = {
  verification_token?: string;
  recover_token?: string;
};
