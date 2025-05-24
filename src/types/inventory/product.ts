import { IProductGroup } from '../group/group';
import ICategory from './category';
import ISupplier from './supplier';
import { IUnit } from './unit.type';

export interface IProduct {
  _id: string;
  product_id: string;
  warehouse_id: string;
  code: string;
  name: string;
  descriptions: string;
  photos?: (File | string)[] | string;
  // photos?: string;
  category_id: ICategory;
  supplier_id: ISupplier;
  unit_id: IUnit;
  unit_name: string;
  supplier_name: string;
  category_name: string;
  inventory_id: IInventory;
  tag: string[];
  cf_code: string;
  pos_price: number;
  online_price: number;
  cf_price: string;
  currency?: string;
  created_at: string;
  updated_at: string;
  available: boolean;
  group_id?: string;
  type?: string;
  products_groupCF_ids?: string[];
  products?: IProductGroup;
}

export interface IInventory {
  _id: string;
  merchant_id: string;
  product: IProduct;
  product_id: string;
  warehouse_id: string;
  quantity: number;
  sold_qty: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  cf_price: number;
  online_price: number;
  pos_price: number;
}

export interface ICreateInventory {
  merchant_id: string;
  importItems: Array<ICreateInventoryItem>;
}
export interface ICreateInventoryItem {
  product_id: IProduct;
  price: number;
  quantity: number;
}

export interface IUpdateInventory extends ICreateInventory {
  cf_price: number;
}
export interface IUpdateQuantity {
  quantity: number;
}

export interface IPayloadProduct {
  code: string;
  cf_code: string;
  name: string;
  pos_price: number;
  cf_price: number;
  online_price: number;
  descriptions: string;
  category_id: string;
  unit_id: string;
  supplier_id: string;
  currency?: string;
  tag: Array<string>;
  available: boolean;
  photos: Array<string>;
}
