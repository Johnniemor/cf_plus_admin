interface StatusBadgeProp {
  status: string;
  className?: string;
}

const statusColors: Record<string, string> = {
  ໂອນແລ້ວ: 'bg-green-100 text-green-500 border-green-500',
  ກຳລັງຈັດສົ່ງ: 'bg-orange-50 text-orange-500 border-orange-500',
  ຍັງບໍ່ຊຳລະ: 'bg-gray-50 text-gray-500 border-gray-500',
  ຍົກເລີກ: 'bg-red-50 text-red-500 border-red-500',
  ສຳເລັດ: 'bg-green-50 text-green-600 border-green-600',
  ແພັກເຄື່ອງ: 'bg-blue-50 text-blue-500 border-blue-500',
  ລາຍລະອຽດ: 'border border-blue-300 bg-blue-50',
};

export default function StatusBadge({ status, className }: StatusBadgeProp) {
  const colorClass = statusColors[status] || 'bg-green-100 text-green-500 border-green-500  ';

  return (
    <span className={`${className} inline-block rounded-md border px-3 py-1 text-sm font-medium `}>
      {status}
    </span>
  );
}
