import { IProduct } from '../inventory/product';
import { IUnit } from '../inventory/unit.type';
import { IUser } from '../user';

export interface ICreatePosOrder {
  orderItems: IInventoryOrder[];
}

export interface IInventoryOrder {
  inventory_id: string;
  quantity: number;
}

export interface IUpdateStatusOrder {
  id: string;
  status: string;
}

export interface IUpdateDetailOrder {
  id: string;
  bank: string;
  reference_code: string;
  shipping: string;
  shipping_address: string;
  slip_timestamps: string;
}

export interface IGetPosOrder {
  _id: string;
  pos_order_uid: string;
  warehouse_id: string;
  merchant_id: string;
  customer_id: string;
  count_item: number;
  grand_total: number;
  bank: string;
  slip: string;
  reference_code: string;
  slip_timestamps: string;
  status: string;
  shipping_address: string;
  shipping: string;
  note: string;
  created_by: IUser;
  created_at: string;
}

export interface IGetPosOrderDetail {
  order: IGetPosOrder;
  order_items: OrderItem[];
  logs: any[];
}

interface OrderItem {
  _id: string;
  product_id: IProduct;
  product: string;
  price: number;
  quantity: number;
  unit_id: IUnit;
  created_at: string;
}
