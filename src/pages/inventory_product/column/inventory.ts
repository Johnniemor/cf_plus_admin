import { ITableHeader } from '@/types/table';

const productHeader = (t: any): ITableHeader[] => [
  { id: 'image', name: t('product_header.image'), sortable: true },
  { id: 'name', name: `${t('product_header.product_name')}/${t('product_header.code')}`, sortable: true },
  { id: 'pos_price', name: t('product_header.pos_price'), sortable: true },
  { id: 'online_price', name: t('product_header.online_price'), sortable: true },
  { id: 'cf_price', name: t('product_header.cf_price'), sortable: true },
  // { id: 'unit_id', name: t('product_header.unit'), sortable: false },
  { id: 'type', name: `${t('product_header.type')}/${t('product_header.supplier')}`, sortable: false },
  { id: 'descriptions', name: t('description'), sortable: false },
  // { id: 'total_product', name: t('product_header.total_product'), sortable: false },
  { id: 'sold_order', name: t('product_header.sold_product'), sortable: false },
  { id: 'sold_order', name: t('product_header.stock'), sortable: false },
  // { id: 'detail', name: 'ລາຍລະອຽດ', sortable: true },
  { id: 'created_at', name: t('product_header.created_at'), sortable: true },
  { id: 'close_product', name: t('product_header.close_product'), sortable: false },
  { id: 'action', name: t('product_header.manage'), sortable: false },
];

const categoryHeader = (t: any): ITableHeader[] => [
  { id: '_id', name: t('category_header.order'), sortable: true },
  { id: 'icon', name: t('category_header.icon'), sortable: false },
  { id: 'name', name: t('category_header.name'), sortable: true },
  { id: 'description', name: t('category_header.description'), sortable: false },
  { id: 'created_at', name: t('category_header.created_at'), sortable: true },
  { id: 'actions', name: t('category_header.actions'), sortable: false },
];

const supplierHeaders = (t: any): ITableHeader[] => [
  { id: 'email', name: t('supplier_header.email'), sortable: false },
  { id: 'name', name: t('supplier_header.name'), sortable: true },
  { id: 'contact_name', name: t('supplier_header.contact_name'), sortable: false },
  { id: 'country', name: t('supplier_header.mobile_number'), sortable: false },
  { id: 'note', name: t('supplier_header.address'), sortable: false },
  { id: 'created_at', name: t('supplier_header.created_at'), sortable: true },
  { id: 'actions', name: t('supplier_header.actions'), sortable: false },
];

const unitHeaders = (t: any): ITableHeader[] => [
  { id: 'id', name: t('unit_header.number'), sortable: true },
  { id: 'name', name: t('unit_header.unit_name'), sortable: true },
  { id: 'unit_code', name: t('unit_header.unit_code'), sortable: true },
  { id: 'quantity', name: t('unit_header.quantity'), sortable: true },
  { id: 'created_at', name: t('unit_header.created_at'), sortable: true },
  { id: 'actions', name: t('unit_header.actions'), sortable: false },
];

const inventoryHeader = (t: any): ITableHeader[] => [
  { id: 'photos', name: t('inventory.photos'), sortable: true },
  { id: 'inventory', name: t('inventory.name'), sortable: true },
  { id: 'cf_code', name: t('inventory.cf_code'), sortable: true },
  { id: 'code', name: t('inventory.code'), sortable: true },
  { id: 'quantity', name: t('inventory.quantity'), sortable: true },
  { id: 'sold_qty', name: t('inventory.sold_qty'), sortable: true },
  { id: 'pos_price', name: t('inventory.pos_price'), sortable: true },
  { id: 'pos_price', name: t('inventory.cf_price'), sortable: true },
  { id: 'pos_price', name: t('inventory.online_price'), sortable: true },
  { id: 'created_at', name: t('inventory.created_at'), sortable: true },
  { id: 'action ', name: t('inventory.action'), sortable: true },
];
export { productHeader, categoryHeader, supplierHeaders, unitHeaders, inventoryHeader };
