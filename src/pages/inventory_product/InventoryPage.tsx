// import Table from '@/components/Table';
// import { inventoryHeader } from './column/inventory';
// import { useTranslation } from 'react-i18next';
// import useInventoryHook from '@/hooks/inventory/useInventoryHook';
// import { useEffect } from 'react';
// import Button from '@/components/Button';
// import { iconAdd } from '@/configs/icon';
// import { TableAction } from '@/components/Table/TableAction';
// import { useNavigate } from 'react-router-dom';
// import Search from '@/components/Forms/Search';
// import TablePagination from '@/components/Table/Pagination';
// import { ROW_PER_PAGE } from '@/configs';

// const InventoryPage: React.FC = () => {
//   const { inventory, getInventoryHook, queryParams, setQueryParams, totalPages, isLoading } = useInventoryHook();
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   useEffect(() => {
//     getInventoryHook(queryParams);
//   }, [queryParams.page, queryParams.limit, queryParams.search]);
//   const handleSearchChange = (searchTerm: string) => {
//     setQueryParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
//   };

//   const handlePageChange = (page: number) => {
//     getInventoryHook({ ...queryParams, page });
//   };

//   const handleRowPerpage = (limit: number) => {
//     getInventoryHook({ ...queryParams, limit });
//   };
//   const handleEdit = (id: string) => {
//     navigate(`/inventory/edit/${id}`);
//   };
//   return (
//     <div>
//       <Table
//         className="pt-6"
//         headerAction={[
//           <Button
//             icon={iconAdd}
//             onClick={() => {
//               navigate('/inventory/create');
//             }}
//             children={t('inventory.btn_create_inv')}
//           />,
//         ]}
//         filterAction={[
//           <div className="grid w-full grid-cols-3 py-4">
//             <Search
//               type="small"
//               name="search"
//               placeholder={t('search')}
//               className="rounded-xl bg-contains_mainly_blue p-4"
//               onChange={(e) => handleSearchChange(e.target.value)}
//             />
//           </div>,
//         ]}
//         title={t('inventory.title_inventory')}
//         header={inventoryHeader(t)}
//         data={inventory}
//         body={
//           <>
//             {inventory.map((inv, index) => (
//               <tr key={index} className="border-b border-gray-400">
//                 <td className="px-4 py-4 text-colorblack dark:text-white">
//                   <img src={inv.product_id.photos?.toString()} alt="" className="h-16 w-16" />
//                 </td>
//                 <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.product_id?.name}</td>
//                 <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.product_id?.cf_code}</td>
//                 <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.product_id?.code}</td>
//                 <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.quantity}</td>
//                 <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.sold_qty}</td>
//                 <td className="px-4 py-4 text-colorblack dark:text-white">
//                   {inv?.product_id?.pos_price} {inv?.product_id?.currency}
//                 </td>
//                 <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.product_id?.cf_price}</td>
//                 <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.product_id?.online_price}</td>
//                 <td className="px-4 py-4 text-colorblack dark:text-white">
//                   {new Date(inv?.created_at).toLocaleDateString()}
//                 </td>
//                 <td className="p-4">
//                   <TableAction onEdit={() => handleEdit(inv._id)} />
//                 </td>
//               </tr>
//             ))}
//           </>
//         }
//         loading={isLoading}
//         children={
//           <div>
//             <TablePagination
//               totalPages={totalPages}
//               currentPage={queryParams.page}
//               onPageChange={handlePageChange}
//               rowsPerPage={queryParams.limit}
//               options={ROW_PER_PAGE}
//               onRowsPerPageChange={handleRowPerpage}
//             />
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export default InventoryPage;
