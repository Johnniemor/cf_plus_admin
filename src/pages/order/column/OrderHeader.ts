import { ITableHeader } from '@/types/table';

export const orderHeaders: ITableHeader[] = [
  { id: 'img', name: 'ຮູບພາບ', sortable: true },
  { id: 'name', name: 'ຊື່', sortable: true },
  { id: 'sang', name: 'ໃນສາງ', sortable: true },
  { id: 'price_unit', name: 'ລາຄາຕໍ່ຫົວໜ່ວຍ', sortable: true },
  { id: 'quantity', name: 'ຈຳນວນ', sortable: true },
  { id: 'total_price', name: 'ລາຄາລວມທັງໝົດ', sortable: false },
];

export const allOrderHeader = (t: any): ITableHeader[] => [
  { id: 'order_id', name: `${t('cf_order.label_order_number')}`, sortable: false },
  { id: 'customer_name', name: `${t('cf_order.label_customer_name')}`, sortable: false },
  { id: 'order_date', name: `${t('cf_order.date_order')}`, sortable: false },
  { id: 'total_price', name: `${t('cf_order.label_total')}`, sortable: false },
  { id: 'description', name: `${t('cf_order.label_detail')}`, sortable: false },
  { id: 'status', name: `${t('cf_order.label_status')}`, sortable: false },
  { id: 'cancel_reason', name: `${t('cf_order.label_add')}`, sortable: false },
  { id: 'created_at', name: `${t('cf_order_detail.date')}`, sortable: true },
  { id: 'action', name: `${t('cf_order.actions')}`, sortable: false },
];
