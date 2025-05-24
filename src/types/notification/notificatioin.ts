export interface INotification {
  id: string;
  type: string;
  message: string;
  title: string;
  ref: string;
  ref_id: IRefId;
  created_at: string;
  is_read: boolean;
}

export interface IRefId {
  _id: string;
  merchant_id: string;
  groupCF_id: string;
  f_page_id: string;
  status: string;
  page_id: string;
  warehouse_id: string;
  facebook_customer_id: string;
  bank: string;
  cf_order_uid: string;
  created_at: string;
  created_by: string;
  grand_total: number;
  note: string;
  reference_code: string;
  shipping: string;
  shipping_address: string;
  slip: string;
  slip_timestamps: string;
  updated_at: string;
}
