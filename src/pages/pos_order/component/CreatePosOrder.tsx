import { useEffect, useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import SearchDropdown from '@/components/Forms/SearchDropDown';
import CustomAlert from '@/components/Modal/CustomAlert';
import { iconArrowBack } from '@/configs/icon';
import useInventoryHook from '@/hooks/inventory/useInventoryHook';
import usePosOrderHook from '@/hooks/pos_order/usePosOrder';
import useUnitHook from '@/hooks/product/useUnitHook';
import { IInventory } from '@/types/inventory/product';
import { ICreatePosOrder } from '@/types/pos_order/pos_order';
import { useFormatCurrency } from '@/utils/format_currency';

const CreatePosOrder: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedProducts, setSelectedProducts] = useState<IInventory[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('ສີນຄ້າໃນສະຕອ໋ກໝົດແລ້ວ ບໍ່ສາມາດເພີ່ມສີນຄ້າໄດ້');
  const formatCurrency = useFormatCurrency();

  const { createPosOrder } = usePosOrderHook();
  const { getInventoryHook, inventory, queryParams } = useInventoryHook();
  const { getUnit, queryParams: unitParam } = useUnitHook();

  const { handleSubmit } = useForm<ICreatePosOrder>({
    defaultValues: {
      orderItems: [{ inventory_id: '', quantity: 1 }],
    },
  });

  useEffect(() => {
    getUnit(unitParam);
    getInventoryHook(queryParams);
  }, []);

  const inventoryOptions = useMemo(
    () =>
      inventory.map((item) => ({
        label: item.product.name,
        value: item.product.name,
        icon: item.product.photos?.toString() ?? '',
        quantity: item.quantity,
        unitName: item.product.unit_name,
      })),
    [inventory],
  );

  const calculateAmount = useCallback(
    (productId: string) => {
      const product = selectedProducts.find((p) => p._id === productId);
      if (!product) return 0;
      const amount = Math.floor(product.quantity);
      return amount;
    },
    [selectedProducts],
  );

  const handleFormSubmit = async (data: ICreatePosOrder) => {
    try {
      if (selectedProducts.length === 0) {
        toast.warning('ກະລຸນາເພີ່ມສິນຄ້າຢ່າງໜ້ອຍ 1 ລາຍການ');
        return;
      }

      const orderItems = selectedProducts.map((product) => ({
        inventory_id: product._id,
        quantity: quantities[product._id] || 1,
      }));

      const res = await createPosOrder({
        ...data,
        orderItems,
      });

      toast.success('ສ້າງ Order ສຳເລັດແລ້ວ');
      return res;
    } catch (error) {
      toast.error('ເກີດຂໍ້ຜິດພາດໃນການສ້າງ Order');
      throw error;
    }
  };

  const handleProductSelect = (value: string) => {
    const inventoryItem = inventory.find((item) => item.product.name === value);
    if (!inventoryItem || inventoryItem.quantity <= 0) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
      return;
    }

    const existingProductIndex = selectedProducts.findIndex((p) => p._id === inventoryItem._id);

    if (existingProductIndex === -1) {
      setSelectedProducts((prev) => [...prev, inventoryItem]);
      setQuantities((prev) => ({
        ...prev,
        [inventoryItem._id]: 1,
      }));
    } else {
      const currentQty = quantities[inventoryItem._id] || 0;

      if (currentQty < inventoryItem.quantity) {
        setQuantities((prev) => ({
          ...prev,
          [inventoryItem._id]: currentQty + 1,
        }));
      } else {
        toast.warning('ສີນຄ້າເຖິງຈຳນວນສູງສຸດໃນສະຕອ໋ກແລ້ວ');
      }
    }
  };

  const handleRemoveProduct = useCallback(
    (productName: string) => {
      const productsToRemove = selectedProducts.filter((p) => p.product.name === productName);
      setSelectedProducts((prev) => prev.filter((p) => p.product.name !== productName));
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        productsToRemove.forEach((product) => {
          delete newQuantities[product._id];
        });
        return newQuantities;
      });
    },
    [selectedProducts],
  );

  const increaseQty = useCallback(
    (productId: string) => {
      const quantity = quantities[productId] || 0;
      const amount = calculateAmount(productId);

      if (quantity <= amount) {
        setQuantities((prev) => ({
          ...prev,
          [productId]: quantity + 1,
        }));
      } else if (quantity === amount) {
        toast.warning('ສີນຄ້າເຖິງຈຳນວນສູງສຸດໃນສະຕອ໋ກແລ້ວ');
      }
    },
    [quantities, calculateAmount],
  );

  const decreaseQty = useCallback((productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  }, []);

  const calculateProductTotal = useCallback(
    (product: IInventory) => {
      return Number(product.product.pos_price) * (quantities[product._id] || 1);
    },
    [quantities],
  );

  const totalPrice = useMemo(
    () => selectedProducts.reduce((total, product) => total + calculateProductTotal(product), 0),
    [selectedProducts, calculateProductTotal],
  );
  const tableStyles = 'grid grid-cols-6 px-4 py-2';
  const cellStyles = 'flex items-center';
  return (
    <div>
      <div className="relative flex h-[80vh] w-full flex-col rounded-lg bg-white pt-8 dark:bg-boxdark">
        <div className="border-b-2 border-gray-300 px-8 pb-6">
          <Button
            variant="info"
            onClick={() => navigate(-1)}
            className="text-black"
            icon={iconArrowBack}
            shape="rounded"
            children={t('btn_back')}
          />
        </div>

        {showAlert && <CustomAlert message={alertMessage} title={'ແຈ້ງເຕືອນ'} />}

        <div className="flex-grow p-8">
          <div className="py-6">
            <SearchDropdown
              className="bg-gray-100 p-5"
              name={'orderItems[].inventory_id'}
              value={''}
              options={inventoryOptions}
              onSelect={(option) => handleProductSelect(option.value)}
              onChange={(e) => console.log('Search input changed:', e.target.value)}
            />
          </div>

          {selectedProducts.length > 0 && (
            <div className="rounded-lg border">
              <div className="relative space-y-4">
                <table className="w-full">
                  <thead>
                    <tr className={`${tableStyles} border-b-[1px] font-bold`}>
                      <th className={cellStyles}>{t('pos_order.title_name')}</th>
                      <th className={cellStyles}>{t('pos_order.title_description')}</th>
                      <th className={cellStyles}>{t('pos_order.title_price')}</th>
                      <th className={cellStyles}>{t('pos_order.title_quantity')}</th>
                      <th className={cellStyles}>{t('pos_order.title_total')}</th>
                      <th className={cellStyles}>{t('pos_order.title_delete')}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedProducts.map((product, index) => (
                      <tr key={`${product._id}-${index}`} className={`${tableStyles} border-b-[1px]`}>
                        <td className={cellStyles}>
                          <p>{product.product.name}</p>
                        </td>
                        <td className={cellStyles}>
                          <p>{product.product.descriptions}</p>
                        </td>
                        <td className={cellStyles}>
                          <p>{formatCurrency(Number(product?.product?.pos_price) || 0)}</p>
                        </td>
                        <td className={cellStyles}>
                          <div className="flex items-center">
                            <Button onClick={() => decreaseQty(product._id)} className="h-8 w-8" children="-" />
                            <p className="px-4">{quantities[product._id] || 1}</p>
                            <Button onClick={() => increaseQty(product._id)} className="h-8 w-8" children="+" />
                          </div>
                        </td>
                        <td className={cellStyles}>
                          <p>{formatCurrency(calculateProductTotal(product))}</p>
                        </td>
                        <td
                          className={`${cellStyles} cursor-pointer text-red-500`}
                          onClick={() => handleRemoveProduct(product.product.name)}
                        >
                          <div>{t('btn_cancel')}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="grid grid-cols-7 pb-4 font-bold">
                  <div className="col-span-6 pr-4 text-right">{t('pos_order.total_price')} :</div>
                  <div>{formatCurrency(totalPrice)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end border-t-2 border-gray-300 p-8">
          <Button onClick={handleSubmit(handleFormSubmit)} children={t('pos_order.btn_create')} />
        </div>
      </div>
    </div>
  );
};

export default CreatePosOrder;
