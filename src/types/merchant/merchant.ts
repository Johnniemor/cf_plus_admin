export interface IMerchant {
  description: string | null;
  is_open: boolean;
  _id: string;
  warehouse_id: string;
  avatar: string;
  name: string;
  address: string;
  mobile_number: string;
  owner: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ICreateMerchant {
  name: string;
  address: string;
  mobile_number: string;
  avatar: string;
}

export interface IImportProductMerchant {
  merchant_id: string;
  importItems: Array<IImportItem>;
}

export interface IImportItem {
  product_id: string;
  price: number;
  quantity: number;
}
