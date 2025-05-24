import Table from '@/components/Table';
import { NoCFHeader } from './column/HeaderColumn';
import { useEffect, useState } from 'react';
import useGroupHook from '@/hooks/group/useGroupHook';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IGroup, INoCf } from '@/types/group/group';

const NoCFPage: React.FC = () => {
  const { queryParams, isLoading, getGroupByIdHook, getNoCFHook, noCf, setNoCf } = useGroupHook();
  const [groupProduct, setGroupProduct] = useState<INoCf | null>(null);

  const params = useParams();
  const _id = params.id;

  console.log('############## _id', _id);

  useEffect(() => {
    if (!_id) {
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await getGroupByIdHook(_id);
        setGroupProduct(res);
        return res;
      } catch (error: any) {
        toast.error(error?.message || error?.data || 'Network Error!');
      }
    };

    fetchProduct();
  }, [_id]);

  useEffect(() => {
    if (_id) {
      getNoCFHook(_id);
    }
  }, [queryParams.page, queryParams.limit, queryParams.search]);

  return (
    <div>
      <Table
        header={NoCFHeader}
        data={noCf}
        body={
          <>
            {noCf.map((no_cf, index) => (
              <tr className="border-b border-gray-300" key={index}>
                <td className="p-4 text-black dark:text-white">{index + 1}</td>
                <td className="p-4 text-black dark:text-white">{no_cf.name}</td>
                <td className="p-4 text-black dark:text-white">{no_cf.owner}</td>
                <td className="p-4 text-black dark:text-white">{no_cf.about}</td>
              </tr>
            ))}
          </>
        }
        loading={isLoading}
        children={undefined}
      />
    </div>
  );
};

export default NoCFPage;
