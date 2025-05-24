import { IPage } from '../page/page';

export interface IMessage {
  page_id: string;
  header: string;
  footer: string;
}

export interface IPayloadMessage {
  _id: string;
  page_id: IPage;
  created: string;
  footer: string;
  header: string;
}
