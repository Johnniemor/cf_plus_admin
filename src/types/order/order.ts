import { OrderStatus } from '@/configs';
import { IProduct } from '../inventory/product';
import { IUnit } from '../inventory/unit.type';

export interface IOrder {
  _id: string;
  status: string;
  page_id: string;
  facebook_customer_id: IFaceBookCustomer;
  warehouse_id: string;
  merchant_id: null;
  groupCF_id: string;
  f_page_id: string;
  __v: 0;
  bank: null;
  cf_order_uid: string;
  created_at: string;
  created_by: null;
  grand_total: number;
  note: string | null;
  reference_code: string | null;
  shipping: string | null;
  shipping_address: string | null;
  slip: string;
  slip_timestamps: string | null;
  updated_at: string;
}

export interface IFaceBookCustomer {
  _id: string;
  f_facebook_id: string;
  address: {
    _id: string;
  };
  display_name: string;
  mobile_number: string | null;
  shipping: string | null;
}

export interface IOrderdetail {
  order: IOrder;
  orderItems: IOrderItems[];
}

export interface IOrderItems {
  _id: string;
  product_group_id: string;
  product_id: string;
  cf_order_id: string;
  created_at: string;
  price: number;
  product: IProduct;
  quantity: number;
  updated_at: string;
  unit: IUnit;
}

export interface IUpdateOrderStatus {
  ids: IOrderItems[];
  status: OrderStatus;
}

export interface IOrderStatus {
  status: OrderStatus;
}

export interface IUpdateOrderDetail {
  id: string;
  bank: string;
  reference_code?: string;
  shipping: string;
  shipping_address: string;
  slip_timestamps: string;
}

export interface ICountOrder {
  in_cart: number;
  pending: number;
  verified: number;
  packed: number;
  on_delivery: number;
}
