import { ITableHeader } from '@/types/table';

export const orderCartHeader: ITableHeader[] = [
  { id: 'id_order', name: 'ເລກລະຫັດສັ່ງຊື່', sortable: true },
  { id: 'date', name: 'ວັນທີ່ເປີດບິນ', sortable: true },
  { id: 'c_name', name: 'ຊື່ລູກຄ້າ', sortable: true },
  { id: 'qty', name: 'ຈຳນວນ', sortable: true },
  { id: 'total', name: 'ລາຄາລວມ', sortable: true },
  { id: 'form', name: 'ຈາກ', sortable: true },
  { id: 'status', name: 'ສະຖານະ', sortable: true },
];

export const paymentHeader: ITableHeader[] = [
  { id: 'productname', name: 'ຊື່ສິນຄ້າ', sortable: true },
  { id: 'image', name: 'ຮູບ', sortable: true },
  { id: 'quantity', name: 'ຈຳນວນ', sortable: true },
  { id: 'price', name: 'ລາຄາ', sortable: true },
];
