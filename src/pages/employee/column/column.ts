import { ITableHeader } from '@/types/table';

export const employeeHeaders = (t: any): ITableHeader[] => [
  { id: 'no', name: t('employee_header.number'), sortable: true },
  { id: 'username', name: t('employee_header.name'), sortable: true },
  { id: 'email', name: t('employee_header.email'), sortable: true },
  { id: 'role', name: t('employee_header.role'), sortable: false },
  { id: 'position', name: t('employee_header.position'), sortable: true },
  { id: 'lock', name: t('employee_header.lock'), sortable: false },
  { id: 'created_at', name: t('employee_header.created_at'), sortable: true },
  { id: 'action', name: t('employee_header.action'), sortable: false },
];
