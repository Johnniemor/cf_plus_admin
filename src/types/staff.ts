export interface IStaff {
  id: string;
  avatar: string;
  fullname: string;
  username: string;
  email: string;
  role: string;
  warehouse_id: string;
  merchant_id: string;
  position: string;
  created_at: Date;
  updated_at: string;
  locked_at: Date;
}

export interface ICreateStaff {
  merchant_id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface IUpdateStaff extends ICreateStaff {
  id: string;
  reset: boolean;
}
