import { ITableHeader } from '@/types/table';

export const stockHeaders = (t: any): ITableHeader[] => [
  { id: '', name: '', sortable: true },
  { id: 'import_date', name: t('stock_header.import_date'), sortable: true },
  { id: 'product', name: t('stock_header.product'), sortable: true },
  { id: 'type', name: t('stock_header.type'), sortable: true },
  { id: 'unit', name: t('stock_header.unit'), sortable: true },
  { id: 'price', name: t('stock_header.price'), sortable: true },
  { id: 'import_price', name: t('stock_header.import_price'), sortable: true },
  { id: 'inventory', name: t('stock_header.inventory'), sortable: true },
  { id: 'sold_out', name: t('stock_header.sold_out'), sortable: true },
  { id: 'action', name: t('stock_header.action'), sortable: true },
];
