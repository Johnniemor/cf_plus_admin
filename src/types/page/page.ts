export interface IPage {
  id: string;
  name: string;
  long_live_token_expired_at: Date;
  available: boolean;
  created_at: string;
  post_created_time: string;
  full_picture: string;
  message: string;
  f_post_ids: IGetFeed;
  f_page_post_id: string;
  about: string;
  picture: IPicture;
  subscript_webhook_at: boolean;
}

export interface IPictureData {
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}
interface IPicture {
  data: IPictureData;
  _id: string;
}
export interface IGetFeed {
  id: string;
  page_id: string;
  full_picture: string;
  created_time: string;
}
