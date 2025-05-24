import Button from '@/components/Button';
import SearchDropdown from '@/components/Forms/SearchDropDown';
import Table from '@/components/Table';
import TablePagination from '@/components/Table/Pagination';
import { iconAdd } from '@/configs/icon';
import { usePagination } from '@/hooks/usePaginationHook';
import { useNavigate } from 'react-router-dom';
import { sangHeaders } from './column/column';
import StatusBadge from '@/components/Status/StatusBage';
import { TableAction } from '@/components/Table/TableAction';
import { ISang } from '@/types/sang';
import { useEffect, useState } from 'react';

const Sang: React.FC = () => {
  const ITEMS_PER_PAGE = 5;
  const navigate = useNavigate();
  const [sang, setSang] = useState<ISang[]>([]);
  useEffect(() => {
    fetch('src/json/sang.json')
      .then((response) => response.json())
      .then((data) => setSang(data.sang))
      .catch((error) => console.error('Error loading mock data:', error));
  }, []);
  const { currentPage, setCurrentPage, totalPages, paginatedItems } = usePagination(sang, ITEMS_PER_PAGE);
  return (
    <div>
      <Table
        className="pt-6"
        title="ຈັດການສາງ"
        headerAction={[
          <Button
            onClick={() => {
              navigate('/sang/create');
            }}
            icon={iconAdd}
            className="bg-royalblue"
            children={'ເພີ່ມພະນັກງານສາງ'}
          />,
        ]}
        filterAction={[
          <div className="grid w-full grid-cols-2 gap-4 p-4">
            <div>
              <SearchDropdown className="bg-white py-3.5" options={[]} onSelect={() => {}} />
            </div>
          </div>,
        ]}
        header={sangHeaders}
        data={sang}
        body={
          <>
            {paginatedItems.map((sang, index) => (
              <tr className="border-b border-gray-300" key={index}>
                <td className="p-4 text-black dark:text-white">{sang.id}</td>
                <td className="p-4 text-black dark:text-white">{sang.sang_name}</td>
                <td className="p-4">
                  <img src={sang.sang_img} alt="sang" className="h-16 w-16 rounded-lg" />
                </td>
                <td className="p-4 text-black dark:text-white">{sang.sang_address}</td>
                <td className="p-4 text-black dark:text-white">{sang.sang_contract}</td>
                <td className="p-4">
                  <StatusBadge
                    status={sang.status}
                    className={sang.status === 'open' ? 'rounded-lg' : 'border-red-500 bg-red-50 text-red-500'}
                  />
                </td>
                <td className="p-4 text-black dark:text-white">{sang.sang_detail}</td>
                <td className="p-4">
                  <TableAction id={sang.id} onEdit={() => {}} onDelete={() => {}} />
                </td>
              </tr>
            ))}
          </>
        }
        loading={false}
        children={
          <div>
            <TablePagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        }
      />
    </div>
  );
};

export default Sang;
