import { ITableHeader } from '@/types/table';

export const shopHeaders = (t: any): ITableHeader[] => [
  { id: 'id', name: t('shop_header.number'), sortable: true },
  { id: 'picture', name: t('shop_header.picture'), sortable: true },
  { id: 'name', name: t('shop_header.name'), sortable: true },
  { id: 'about', name: t('shop_header.about'), sortable: true },
  { id: 'expire', name: t('shop_header.expire'), sortable: true },
  { id: 'available', name: t('shop_header.available'), sortable: true },
  { id: 'subScription', name: t('shop_header.subScription'), sortable: true },
  { id: 'createdAt', name: t('shop_header.created_at'), sortable: true },
];

export const messageHeader = (t: any): ITableHeader[] => [
  { id: 'id', name: t('message_header.number'), sortable: true },
  { id: 'picture', name: t('message_header.picture'), sortable: true },
  { id: 'name', name: t('message_header.name'), sortable: true },
  { id: 'header', name: t('message_header.header'), sortable: true },
  { id: 'footer', name: t('message_header.footer'), sortable: true },
];
