import ICategory from '../inventory/category';
import { IInventory, IProduct } from '../inventory/product';
import ISupplier from '../inventory/supplier';
import { IUnit } from '../inventory/unit.type';
import { IPage } from '../page/page';

export interface IProductGroup {
  _id: string;
  group_id?: string;
  cf_code: string;
  price: number | null;
  quantity: number | null;
  product_id: string;
  product?: IProduct;
  groupCF_id?: string;
  pending_qty: number | null;
  sold_qty?: number;
}

export interface IProductGroupAction {
  group_id: string;
  type: 'add' | 'remove';
  products_groupCF_ids?: string[];
  products: IProductGroup[];
}
export interface IGroup {
  _id: string;
  name: string;
  description: string;
  page_id: string;
  available: boolean;
  f_post_ids: string[];
  post_ids?: IPage[];
  products: Array<IProductGroup>;
  products_groupCF_ids?: string[];
  group_id: string;
  start_at: string;
  expired_at: string;
}

export interface IPattern {
  cf_code: string;
  type: string;
  group_id: string;
}

export interface IAddPost {
  group_id: string;
  type: 'add' | 'remove';
  f_post_ids: string[];
  page_id?: string;
}

export interface INoCf {
  _id: string;
  owner: string;
  f_page_id: string;
  facebook_id: string;
  about: string;
  access_token: string;
  available: boolean;
  close_fc_f_post_ids: string[];
  close_fc_post_ids: IPost[];
  created_at: string;
  long_live_token: string;
  long_live_token_expired_at: string;
  name: string;
  picture: Picture;
  subscript_webhook: string[];
  subscript_webhook_at: string;
  updated_at: string;
}
export interface IPost {
  _id: string;
  f_page_id: string;
  f_post_id: string;
  warehouse_id: string;
  page_id: string;
  f_page_post_id: string;
  __v: number;
  actions: PostAction[];
  available: boolean;
  created_at: string;
  full_picture: string;
  group_id: string | null;
  message: string | null;
  post_created_time: string;
  status_type: string;
  type: string;
  updated_at: string;
}

interface PostAction {
  name: string;
  link: string;
  _id: string;
}
interface Picture {
  data: {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
  };
  _id: string;
}

export interface IProductGroupItem {
  sold_qty: number;
  _id: string;
  cf_code: string;
  price: number;
  quantity: number;
  pending_qty: number;
  groupCF_id: string;
  product: IProduct;
}
export interface IUpdateProductGroup {
  group_id: string;
  cf_code: string;
  price: number;
  quantity: number;
}
