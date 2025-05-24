export interface RootObject {
  [x: string]: any;
  category: any;
  unit: any;
  product: any;
  _id: string;
  warehouse_id: string;
  merchant_id: null;
  inventory_id: string;
  product_id: Productid;
  quantity: number;
  import_price: number;
  created_by: string;
  revers_at: null;
  revers_by: null;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface Productid {
  _id: string;
  code: string;
  cf_code: string;
  name: string;
  pos_price: number;
  cf_price: number;
  online_price: number;
  photos: string[];
  category_id: Categoryid;
  unit_id: Unitid;
  supplier_id: Supplierid;
}

export interface Supplierid {
  _id: string;
  name: string;
  contract_name: string;
  mobile_number: string;
  email: string;
  address: string;
}

export interface Unitid {
  _id: string;
  name: string;
  description: string;
  unit: string;
  amount: number;
}

export interface Categoryid {
  _id: string;
  name: string;
  description: string;
  image: string;
}


export interface ICreateStock {
  importItems: {
    product_id: string;
    price: number;
    quantity: number;
  }[];
}


export type IStockArray = RootObject[];
export interface RootObject {
  data: IStockArray[];
  status: string;
  error_message: string;
  error_code: string;
}
