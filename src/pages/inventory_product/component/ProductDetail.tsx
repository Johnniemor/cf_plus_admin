import Button from '@/components/Button';
import { iconArrowBack } from '@/configs/icon';
import useProductHook from '@/hooks/product/useProductHook';
import { IProduct } from '@/types/inventory/product';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { getProductById } = useProductHook();
  const { t } = useTranslation();
  const params = useParams();
  const _id = params.id;
  const [product, setProduct] = useState<IProduct | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  useEffect(() => {
    if (!_id) {
      console.error('Product ID not found in URL');
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await getProductById(_id);
        setProduct(res);
        setPhotos(res?.photos || []);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [_id]);

  const productDetails = [
    { label: t('product_detail.cfid'), value: product?.cf_code },
    { label: t('product_detail.selling_price'), value: product?.pos_price },
    { label: t('product_detail.wholesale_price'), value: product?.online_price },
    { label: t('product_detail.cf_price'), value: product?.cf_price },
    {
      label: `${t('product_detail.category')}/${t('product_detail.supplier')}`,
      value: `${product?.category_id?.name ?? 'N/A'} / ${product?.supplier_id?.name ?? 'N/A'}`,
    },
    { label: t('product_detail.unit'), value: product?.unit_id?.name },
    { label: t('product_detail.amount_to_be_storedd'), value: product?.inventory_id?.quantity ?? '0' },
    { label: t('product_detail.number_of_item_sold'), value: product?.inventory_id?.sold_qty ?? '0' },
    { label: t('product_detail.detail'), value: product?.descriptions },
    {
      label: t('product_detail.create_at  '),
      value: product?.created_at ? new Date(product.created_at).toLocaleString() : 'N/A',
    },
    { label: t('product_detail.close_product'), value: product?.available === true ? 'ເປິດ' : 'ປິດ' },
  ];

  return (
    <div>
      <div className="rounded-xl bg-white dark:bg-boxdark">
        <div className="border-b-2 border-gray-300 p-10 py-6">
          <Button
            onClick={() => navigate(-1)}
            className="border-2 border-gray-400 bg-white"
            icon={iconArrowBack}
            children={<div className="text-black">{t('back')}</div>}
          />
        </div>
        <div className="p-10">
          <h1 className="text-3xl">{product?.name}</h1>
          <h4 className="py-4">{product?.code}</h4>
        </div>
        <div className="px-4">
          <div className="flex flex-col items-center justify-center gap-6 align-middle md:flex-row">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="rounded-xl bg-white md:w-2/5">
                <img className="h-100 w-full rounded-xl bg-customgray object-contain" src={photos[0]} alt="product" />
              </div>

              <div className="h-full w-full rounded-xl bg-customgray p-4 md:h-100 md:w-3/5">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {photos.map((photo, index) => (
                    <img
                      className="h-44 w-full rounded-lg bg-white object-contain"
                      key={index}
                      src={photo}
                      alt={'product'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md">
          <h1 className="p-6">{t('all_detail')}</h1>
          {productDetails.map((item, index) => (
            <div key={index} className={`p-6 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <h1>
                {item.label}: {item.value}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
