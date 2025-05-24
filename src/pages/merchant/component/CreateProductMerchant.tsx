import Button from '@/components/Button';
import SearchableDropdown from '@/components/Forms/SearchableDropdown';
import { iconArrowBack } from '@/configs/icon';
import useInventoryHook from '@/hooks/inventory/useInventoryHook';
import { ICreateInventory, IInventory } from '@/types/inventory/product';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateProductMerchant: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<IInventory[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { getInventoryHook, inventory, queryParams, createInventory } = useInventoryHook();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleSubmit } = useForm<ICreateInventory>();
  const params = useParams();
  const id = params.id;
  console.log('inv_products_id', id);
  useEffect(() => {
    getInventoryHook(queryParams);
  }, []);

  const handleCreateProductInventory = async (data: ICreateInventory) => {
    try {
      if (!id) {
        throw new Error('Merchant ID is required');
      }
      const invProduct: any = {
        ...data,
        merchant_id: id ?? '',
        importItems: selectedProducts.map((p) => ({
          product_id: p.product._id,
          quantity: quantities[p._id],
        })),
      };
      const response = await createInventory(invProduct);
      if (response.data) {
        toast.success('add product successfully');
        navigate(`/inventory/${id}`);
      }
      return response;
    } catch (error: any) {
      toast.error(error?.message || error?.data || 'Network Error!');
    }
  };

  const handleDropdownChange = (value: string | null) => {
    if (value) {
      setSelectedValue(value);
    }
  };
  const handleProductSelect = (option: { value: string; label: string }) => {
    const inventoryItem = inventory.find((item) => item._id === option.value);
    if (!inventoryItem) {
      return;
    }

    const existingProductIndex = selectedProducts.findIndex((p) => p._id === inventoryItem._id);

    if (existingProductIndex === -1) {
      setSelectedProducts((prev) => [...prev, inventoryItem]);
      setQuantities((prev) => ({
        ...prev,
        [inventoryItem._id]: 1,
      }));
    }
    setSelectedValue('');
  };
  const decreaseQty = (productId: string) => {
    const currentQty = quantities[productId] || 1;
    if (currentQty > 1) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: currentQty - 1,
      }));
    }
  };

  const increaseQty = (productId: string) => {
    const product = selectedProducts.find((p) => p._id === productId);
    const currentQty = quantities[productId] || 1;

    if (product && currentQty < product.quantity) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: currentQty + 1,
      }));
    } else {
      toast.warning('ສີນຄ້າເຖິງຈຳນວນສູງສຸດໃນສະຕອ໋ກແລ້ວ');
    }
  };

  const handleRemoveProduct = (productName: string) => {
    const productToRemove = selectedProducts.find((item) => item.product.name === productName);
    if (productToRemove) {
      setSelectedProducts((prevProducts) => prevProducts.filter((item) => item._id !== productToRemove._id));

      const newQuantities = { ...quantities };
      delete newQuantities[productToRemove._id];
      setQuantities(newQuantities);
    }
  };

  const inventoryOptions = inventory.map((item) => ({
    value: item._id,
    label: item.product.name,
    photos: item.product.photos?.toString(),
  }));
  return (
    <div className="relative flex w-full flex-col rounded-lg bg-white pt-8 dark:bg-boxdark">
      <div className="border-b-2 border-gray-300 px-8 pb-6">
        <Button variant="info" onClick={() => navigate(-1)} className="text-black" icon={iconArrowBack} shape="rounded">
          {t('btn_back')}
        </Button>
      </div>
      <div className="flex-grow p-8">
        <div className="py-6">
          <SearchableDropdown
            name="importItems"
            options={inventoryOptions}
            label="label"
            id="importItems"
            selectedVal={selectedValue}
            handleChange={handleDropdownChange}
            placeholder="Search for a product..."
            onSelect={handleProductSelect}
          />
          {selectedProducts.length > 0 && (
            <div className="mt-6 flex w-full flex-col overflow-scroll rounded-lg bg-white text-gray-700 shadow-md">
              <div className="relative">
                <form onSubmit={handleSubmit(handleCreateProductInventory)} action="">
                  <table className="w-full min-w-max table-auto">
                    <thead className="border-b-2 border-gray-300 py-4">
                      <tr className={`font-bold`}>
                        <th className={'py-4'}>{t('pos_order.photo')}</th>
                        <th className={''}>{t('pos_order.title_name')}</th>
                        <th className={''}>{t('pos_order.title_description')}</th>
                        <th className={''}>{t('pos_order.title_quantity')}</th>
                        <th className={''}>{t('pos_order.title_delete')}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedProducts.map((product, index) => (
                        <tr className="border-b-2 border-gray-300" key={`${product._id}-${index}`}>
                          <td className={'text-center'}>
                            <div className="flex justify-center">
                              <img
                                src={product.product.photos?.toString()}
                                alt="product.photos"
                                className="h-16 w-16"
                              />
                            </div>
                          </td>
                          <td className={'text-center'}>
                            <p>{product.product.name}</p>
                          </td>
                          <td className={'text-center'}>
                            <p>{product.product.descriptions}</p>
                          </td>
                          <td className={'text-center'}>
                            <div className="flex items-center justify-center">
                              <Button onClick={() => decreaseQty(product._id)} className="h-8 w-8" children="-" />
                              {/* <p className="px-4">{quantities[product._id] || 1}</p> */}
                              <div className="px-2">
                                <input
                                  className="w-20 rounded-lg bg-gray-400 py-1 text-center"
                                  name="importItems[]"
                                  type="text"
                                  value={quantities[product._id] ?? 0}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setQuantities((prev) => ({
                                      ...prev,
                                      [product._id]: value === '' ? 0 : parseInt(value) || 0,
                                    }));
                                  }}
                                />
                              </div>

                              <Button onClick={() => increaseQty(product._id)} className="h-8 w-8" children="+" />
                            </div>
                          </td>
                          <td className={`${''} cursor-pointer text-red-500`}>
                            <div className="flex justify-center">
                              <Button onClick={() => handleRemoveProduct(product.product.name)} variant="error">
                                {t('btn_cancel')}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end p-8">
                    <Button type="submit" children={t('pos_order.btn_create')} />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProductMerchant;
