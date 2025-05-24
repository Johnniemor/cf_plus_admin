import { ITableHeader } from '@/types/table';

export const groupHeader = (t: any): ITableHeader[] => [
  { id: 'no', name: t('group_header.number'), sortable: true },
  { id: 'name', name: t('group_header.group_name'), sortable: true },
  { id: 'description', name: t('description'), sortable: false },
  { id: 'status', name: t('group_header.status'), sortable: false },
  { id: 'created_at', name: t('group_header.created_at'), sortable: true },
  { id: 'expired_at', name: t('group_header.expired_at'), sortable: false },
  { id: 'action', name: t('group_header.action'), sortable: false },
];

export const groupProductHeader = (t: any): ITableHeader[] => [
  { id: 'img', name: t('group_detail_header.picture'), sortable: false },
  { id: 'name', name: t('group_detail_header.name'), sortable: true },
  { id: 'cf_code', name: t('group_detail_header.cf_code'), sortable: true },
  { id: 'price', name: t('group_detail_header.price'), sortable: false },
  { id: 'stock', name: t('group_detail_header.stock'), sortable: false },
  { id: 'action', name: t('group_detail_header.action'), sortable: false },
];
export const groupDetailHeader = (t: any): ITableHeader[] => [
  { id: 'img', name: t('group_detail_header.picture'), sortable: false },
  { id: 'cf_code', name: t('group_detail_header.cf_code'), sortable: true, width: 'w-[100px]' },
  { id: 'qty', name: t('group_detail_header.quantity'), sortable: false, width: 'w-[100px]' },
  { id: 'price', name: t('group_detail_header.price'), sortable: false, width: 'w-[140px]' },
  { id: 'name', name: t('group_detail_header.name'), sortable: true },
  { id: 'pending_qty', name: t('group_detail_header.pending_qty'), sortable: false, width: 'w-[100px]' },
  { id: 'action', name: t('group_detail_header.action'), sortable: false },
];

export const groupPostDetailHeader = (t: any): ITableHeader[] => [
  { id: 'price', name: t('group_post_detail_header.picture'), sortable: false },
  { id: 'post_created_at', name: t('group_post_detail_header.post_created_at'), sortable: true },
  { id: 'message', name: t('group_post_detail_header.message'), sortable: true },
  { id: 'action', name: t('group_post_detail_header.action'), sortable: true },
];

export const GroupPatternHeader: ITableHeader[] = [
  { id: 'cf_code', name: 'cf_code', sortable: false },
  { id: 'type', name: 'type', sortable: false },
  { id: 'group_id', name: 'group_id', sortable: false },
];
