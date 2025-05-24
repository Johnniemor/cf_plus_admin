import Table from '@/components/Table';
import { orderCartHeader } from './column/column';

const OrderCart: React.FC = () => {
  return (
    <div>
      <Table header={orderCartHeader} data={[]} body={undefined} loading={false} children={undefined}></Table>
    </div>
  );
};
export default OrderCart;
