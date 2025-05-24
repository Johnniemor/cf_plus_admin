import { IconAlert } from '@/configs/icon';
import Button from '../Button';

const CustomAlert: React.FC<{ title: string; message: string; onClose?: () => void }> = ({
  message,
  onClose,
  title,
}) => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-100 rounded-lg bg-white p-6 text-center shadow-lg">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center">{IconAlert}</div>
          <h2 className="flex text-lg font-bold">{title}</h2>
        </div>
        <p className="mt-2">{message}</p>
        {/* <Button className="mt-4 rounded bg-red-500 px-11 text-white" onClick={onClose}>
          ປິດ
        </Button> */}
      </div>
    </div>
  );
};

export default CustomAlert;
