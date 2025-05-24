import { ITableHeader } from '@/types/table';

export const merchantHeader = (t: any): ITableHeader[] => [
  { id: '_id', name: t('merchant_header.number'), sortable: true },
  { id: 'avatar', name: t('merchant_header.avatar'), sortable: false },
  { id: 'name', name: t('merchant_header.name'), sortable: true },
  { id: 'address', name: t('merchant_header.address'), sortable: false },
  { id: 'mobile_number', name: t('merchant_header.mobile_number'), sortable: false },
  { id: 'is_open', name: t('merchant_header.status'), sortable: true },
  { id: 'created_at', name: t('merchant_header.created_at'), sortable: true },
  { id: 'action', name: t('merchant_header.action'), sortable: false },
];
