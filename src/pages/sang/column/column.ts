

import { ITableHeader } from "@/types/table";

export const sangHeaders: ITableHeader[] = [
    { id: 'no', name: 'ລຳດັບ', sortable: true },
    { id: 'name', name: 'ຊື່', sortable: true },
    { id: 'img', name: 'ຮູບພາບ', sortable: true },
    { id: 'address', name: 'ທີ່ຢູ່', sortable: true },
    { id: 'contract', name: 'ເບິຕິດຕໍ່', sortable: true },
    { id: 'status', name: 'ສະຖານະ', sortable: false },
    { id: 'created_at', name: 'ວັນທີ່ສ້າງ', sortable: false },
    { id: 'action', name: 'ຈັດການຂໍ້ມູນ', sortable: false },
  ];