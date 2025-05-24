import { iconCart } from '@/configs/icon';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    product_name: 'ມິດ',
    product_id: 'A11',
    img_product: 'https://khuan-jai.s3-ap-southeast-1.amazonaws.com/product/f88fba98-24c3-47c7-8636-c276bf30c086.jpeg',
    product_type: 'ເຄື່ອງໃຊ້ໄຟຟ້າ',
    quantity: '5/ແພັກ',
    price: '80,000 ກີບ',
  },
  {
    product_name: 'ກະແວ່ນແຕ່ງໜ້າ',
    product_id: 'B24',
    img_product: 'https://khuan-jai.s3-ap-southeast-1.amazonaws.com/product/f88fba98-24c3-47c7-8636-c276bf30c086.jpeg',
    product_type: 'ເຄື່ອງໃຊ້ໄຟຟ້າ',
    quantity: '2 ອັນ',
    price: '120,000 ກີບ',
  },
];

const PaymentBill: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <div className="flex justify-center rounded-xl bg-white py-4">
          <img className="" width={75} height={75} src="src/images/logo/round_logo.png" alt="" />
        </div>
        <div className="flex justify-center py-4">
          <h1 className="text-royalblue">ເລກອໍເດີ #123456910</h1>
        </div>
      </header>

      {/* section detail order buy */}
      <br />
      <div className="md:px-[88px]">
        <div className="rounded-xl bg-white pb-6 pt-2">
          <div className="px-6">
            <div className="flex py-4">
              <div className="">{iconCart}</div>
              <h1 className="text-xl font-bold text-periwinkleblue">ລາຍລະອຽດຄຳສັ່ງຊື່</h1>
            </div>
            <h1 className="py-2 text-black">
              ໝາຍເລກຄຳສັ່ງຊື່ : <span className="font-medium text-black">5257851 </span>
            </h1>
            <h1 className="py-2 text-black">
              ສະຖານະ : <span className="font-medium text-black">ຍັງບໍ່ທັນຊຳລະເງີນ</span>
            </h1>
            <h1 className="py-2 text-black">
              ເລກພັດສະດຸ : <span className="font-medium text-black">2345 8899</span>
            </h1>
          </div>
          <div className="py-10">
            <div className="border-t-2 border-gray-300 py-2">
              <div className="mb-4 flex items-center justify-between px-10">
                <div className="w-1/4">
                  <h1 className="text-lg font-semibold text-black md:text-sm">ຊື່ສິນຄ້າ</h1>
                </div>
                <div className="w-1/4 text-center">
                  <h1 className="text-lg font-semibold text-black md:text-sm">ຮູບ</h1>
                </div>
                <div className="w-1/4 text-center">
                  <h1 className="text-lg font-semibold text-black md:text-sm">ຈຳນວນ</h1>
                </div>
                <div className="w-1/4 text-right text-black">
                  <h1 className="text-lg font-semibold">ລາຄາ</h1>
                </div>
              </div>
              <div className="space-y-4">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 flex items-center justify-between rounded-lg border-b-2 border-gray-300 px-10 py-6"
                  >
                    <div className="w-1/4">
                      <p className="font-medium text-black">{product.product_name}</p>
                      <p className="text-sm text-black">{product.product_id}</p>
                    </div>
                    <div className="flex w-1/4 justify-center">
                      <img src={product.img_product} alt={'img'} className="h-24 w-24 object-cover" />
                    </div>
                    <div className="w-1/4 text-center text-black">
                      <p>{product.quantity}</p>
                    </div>
                    <div className="w-1/4 text-right text-black">
                      <p>{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="py-10 text-center">
            <h1 className="text-lg font-bold text-black">ທ່ານມີຈຳນວນສີນຄ້າທັງໝົດ: {21} ລາຍການ</h1>
            <h1 className="text-lg font-bold text-black">
              {' '}
              ລາຄາທັງໝົດ: <span className="text-periwinkleblue">4,608,000 ກີບ</span>
            </h1>
          </div>

          <div className="flex justify-end px-10">
            <Button
              onClick={() => {
                navigate('/cart/location');
              }}
              children={'ຢືນຢັນຄຳສັ່ງຊື້'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentBill;
