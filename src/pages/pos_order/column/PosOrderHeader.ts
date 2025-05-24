import { ITableHeader } from '@/types/table';

export const posOrderHeader = (t: any): ITableHeader[] => [
  // { id: 'numbers', name: t('pos_order_header.avatar'), sortable: true },
  { id: 'pos_order_uid', name: t('pos_order_header.pos_uid'), sortable: true },
  { id: 'name', name: t('pos_order_header.fullname'), sortable: false },
  { id: 'mobile_number', name: t('pos_order_header.product_list'), sortable: false },
  // { id: 'address', name: t('pos_order_header.shipping_address'), sortable: true },
  { id: 'grand_total', name: t('pos_order_header.grand_total'), sortable: true },
  { id: 'status', name: t('pos_order_header.status'), sortable: false },
  { id: 'created_at', name: t('pos_order_header.created_at'), sortable: true },
  // { id: 'action', name: t('pos_order_header.action'), sortable: false },
];

export const posOrderDetailHeader = (t: any): ITableHeader[] => [
  { id: 'photos', name: t('pos_order_detail_header.photos'), sortable: true },
  { id: 'name', name: t('pos_order_detail_header.name'), sortable: true },
  { id: 'descriptions', name: t('pos_order_detail_header.descriptions'), sortable: true },
  { id: 'pos_price', name: t('pos_order_detail_header.pos_price'), sortable: true },
  { id: 'currency', name: t('pos_order_detail_header.currency'), sortable: true },
  { id: 'quantity', name: t('pos_order_detail_header.quantity'), sortable: true },
  { id: 'price', name: t('pos_order_detail_header.price'), sortable: true },
  { id: 'quantity', name: t('pos_order_detail_header.quantity'), sortable: true },
];
