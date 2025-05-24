import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Table from '@/components/Table';
import { stockHeaders } from './column/stock';
import Search from '@/components/Forms/Search';
import TablePagination from '@/components/Table/Pagination';
import Button from '@/components/Button';
import { iconAdd, iconCalendar } from '@/configs/icon';
import { TableAction } from '@/components/Table/TableAction';
import useStocke from '@/hooks/stock/useStocke';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import DatePicker from '@/components/Forms/DatePicker';
import api from '@/lib/axios';
import { useTranslation } from 'react-i18next';
import { ROW_PER_PAGE } from '@/configs';

const StockPage: React.FC = () => {
  const { stocks, isLoading, queryParams, isDeleting, deleteStock, fetchStocks, totalPages } = useStocke();
  const [showModal, setShowModal] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { control, watch } = useForm();
  const [selectedStockBox, setSelectedStockBox] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { t } = useTranslation();

  const selectedDateRange = watch('transfer_time');

  useEffect(() => {
    fetchStocks({
      ...queryParams,
      search: searchTerm,
      start_date: selectedDateRange?.[0] || undefined,
      end_date: selectedDateRange?.[1] || undefined,
      revers: 'false',
    });
  }, [queryParams.page, queryParams.limit, selectedDateRange, searchTerm]);

  const openDeleteModal = (ids: string) => () => {
    setSelectedStockBox([ids]);
    setShowModal(true);
  };
  const handleDeleteConfirm = async () => {
    if (selectedStockBox.length > 0) {
      setShowModal(false);
      await deleteStock(selectedStockBox);
      setSelectedStockBox([]);
      fetchStocks({ ...queryParams, revers: 'false' });
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await api.get<{ data: IProductDetail[] }>(`/product`, {
      params: { search: e.target.value },
    });
  };
  const handleRowPerpage = (limit: number) => {
    fetchStocks({ ...queryParams, limit });
  };

  const handleSelectStockBox = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    setSelectedStockBox((prevSelected) =>
      e.target.checked ? [...prevSelected, productId] : prevSelected.filter((id) => id !== productId),
    );
  };

  const handlePageChange = (page: number) => {
    fetchStocks({ ...queryParams, page });
  };

  return (
    <div className="rounded-xl bg-white pt-4 dark:bg-boxdark">
      <div className="flex items-center justify-between border-b border-stroke px-4 pb-4 dark:border-strokedark">
        <h1 className="text-xl font-bold">{t('stock.title_stock')}</h1>
        <div className="flex items-center gap-2">
          {selectedStockBox.length > 0 && (
            <Button onClick={handleDeleteConfirm} className="bg-red-500 text-white">
              ລົບທັງໝົດ ({selectedStockBox.length})
            </Button>
          )}
          <Button onClick={() => navigate('/stock/create')} icon={iconAdd} className="bg-royalblue">
            {t('stock.btn_add_product_to_stock')}
          </Button>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 p-4">
        <Search
          type="text"
          name="search"
          placeholder={t('stock.placeholder_search_product')}
          className="rounded border border-stroke"
          onChange={handleSearch}
          // value={searchTerm}
        />

        <DatePicker
          showIcon={false}
          icon={iconCalendar}
          className="rounded border border-stroke bg-contains_mainly_blue"
          name="transfer_time"
          control={control}
          placeholder={t('stock.placeholder_date_time')}
          isRange
        />
      </div>
      {selectedDateRange && selectedDateRange[0] && (
        <div className="px-4 pb-2 text-sm text-primarySecond dark:text-white">
          ເລືອກເບິງວັນທີ່ {new Date(selectedDateRange[0]).toLocaleDateString()}
          {selectedDateRange[1] ? <> ຮອດວັນທີ່ {new Date(selectedDateRange[1]).toLocaleDateString()}</> : null}
        </div>
      )}

      <div className="text-sm">
        {/* {(isLoading || isDeleting) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="w-full max-w-md">
              <LoadingProgressBar />
            </div>
          </div>
        )} */}

        {showModal && (
          <ConfirmModal
            textCancel="ຍົກເລີກ"
            textConfirm="ລົບຂໍ້ມູນ"
            show={showModal}
            setShow={setShowModal}
            message={`ທ່ານຕ້ອງການລົບສິນຄ້າ: ${
              stocks.find((c) => c._id === selectedStockId)?.product.name
            } ອອກຈາກລະບົບບໍ່?`}
            handleConfirm={handleDeleteConfirm}
          />
        )}

        <Table
          header={stockHeaders(t)}
          data={stocks || []}
          body={
            stocks.length > 0 ? (
              <>
                {stocks.map((dstock, index) => (
                  <tr key={index} className="border-b border-stroke dark:border-strokedark">
                    <td className="p-4 px-4">
                      <input
                        className="h-5 w-5"
                        type="checkbox"
                        onChange={(e) => handleSelectStockBox(e, dstock._id)}
                        checked={selectedStockBox.includes(dstock._id)}
                      />
                    </td>
                    <td className="px-4">
                      {new Date(dstock.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>

                    <td>
                      <div className="flex items-center space-x-2 px-3 py-2">
                        {dstock.product.photos ? (
                          <img src={dstock.product.photos} alt={dstock.product.name} width="35" />
                        ) : (
                          <div className="h-8 w-8 rounded bg-gray-200" />
                        )}
                        <div>
                          <p className="font-medium">{dstock.product.name}</p>
                          <p className="text-sm text-gray-500">{dstock.product.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4">{dstock.category.name}</td>
                    <td className="px-4">{dstock.unit.name}</td>
                    <td className="px-4">{dstock.product.pos_price}</td>
                    <td className="px-4">{dstock.import_price}</td>
                    <td className="px-4">{dstock.inventory.quantity}</td>
                    <td className="px-4">{dstock.quantity}</td>
                    <td className="px-10">
                      <TableAction id={dstock._id} onDelete={openDeleteModal(dstock._id)} />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={9} className="py-4 text-center text-gray-500">
                  ບໍ່ມີຂໍ້ມູນ
                </td>
              </tr>
            )
          }
          loading={isLoading}
          children={undefined}
        />
        <TablePagination
          totalPages={totalPages}
          currentPage={queryParams.page}
          onPageChange={handlePageChange}
          rowsPerPage={queryParams.limit}
          options={ROW_PER_PAGE}
          onRowsPerPageChange={handleRowPerpage}
        />
      </div>
    </div>
  );
};

export default StockPage;
