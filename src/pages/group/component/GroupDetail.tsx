import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

// Components
import Button from '@/components/Button';
import Table from '@/components/Table';
import { TableAction } from '@/components/Table/TableAction';
import ModalFeedImage from './ModalFeedImage';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import ProductListStock from './ProductListStock';
import ProductListDetail from './ProductListDetail';

// Hooks
import useGroupHook from '@/hooks/group/useGroupHook';
import usePageHook from '@/hooks/page/usePageHook';
import useProductHook from '@/hooks/product/useProductHook';

// Types and Config
import { iconAdd, iconArrowBack } from '@/configs/icon';
import { groupPostDetailHeader } from '../column/Header';
import { IGroup, IProductGroup } from '@/types/group/group';
import { IPage } from '@/types/page/page';

const GroupDetail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Hooks
  const { getGroupByIdHook, addGroupProductHook } = useGroupHook();
  const { createPostHook } = usePageHook();
  const { products, getProduct, queryParams, setQueryParams, totalPages } = useProductHook();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productGroup, setProductGroup] = useState<IProductGroup>();

  // State
  const [groupProduct, setGroupProduct] = useState<IGroup>();
  const [showModalDeletePost, setShowModalDeletePost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupId, setGroupId] = useState('');
  const [pageId, setPageId] = useState('');

  const productQuantity = products.map((item) => item.inventory_id.quantity);

  // Methods
  const fetchGroupData = async () => {
    setLoadingProduct(true);
    true;
    try {
      if (!id) return;
      const res = await getGroupByIdHook(id);
      setGroupProduct(res);
      setGroupId(res._id);

      await getProduct(queryParams);

      return res;
    } catch (error: any) {
      toast.error(error?.message || error?.data || 'Network Error!');
    } finally {
      setLoadingProduct(false);
    }
  };


  const fetchPageData = async () => {
    setLoadingPage(true);
    try {
      if (!id) return;
      const res = await getGroupByIdHook(id);
      setGroupProduct(res);
      setPageId(res.page_id?._id);
      return res;
    } catch (error: any) {
      toast.error(error?.message || error?.data || 'Network Error!');
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const refreshAllData = async () => {
    try {
      await fetchGroupData();
    } catch (error) {
      toast.error('Failed to refresh data');
    }
  };

  const handleAddProducts = async (data: any) => {
    try {
      await addGroupProductHook(data);
      await refreshAllData();
      toast.success('Products added successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to add products');
    }
  };

  const handleRemoveProducts = async (data: any) => {
    try {
      await addGroupProductHook(data);
      await refreshAllData();
      toast.success(t('group_product_detail.toast_remove_product'));
    } catch (error: any) {
      toast.error(error?.message || 'Failed to remove products');
    }
  };

  const handleDeletePost = async () => {
    if (!groupId || !selectedPostId) {
      toast.error('No post selected for deletion');
      return;
    }

    try {
      await createPostHook({
        type: 'remove',
        group_id: groupId,
        f_post_ids: [selectedPostId],
      });

      await fetchPageData();
      toast.success(t('group_post_detail.toast_remove_post'));
    } catch (error: any) {
      toast.error(error?.message || 'Error removing the post');
    } finally {
      setShowModalDeletePost(false);
      setSelectedPostId('');
    }
  };

  const handleOpenDeletePostModal = (postId: string) => {
    setSelectedPostId(postId);
    setShowModalDeletePost(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Effects
  useEffect(() => {
    refreshAllData();
  }, [id]);

  // Get posts from group product
  const posts = groupProduct?.post_ids || [];

  // Render methods
  const renderPostRow = (post: IPage, index: number) => (
    <tr className="border-b border-gray-300" key={index}>
      <td className="whitespace-nowrap p-4">
        <img className="h-14 w-14 object-cover" src={post.full_picture} alt={`Post image ${index + 1}`} />
      </td>
      <td className="p-4 text-black dark:text-white">{formatDate(post.post_created_time)}</td>
      <td className="p-4 text-black dark:text-white">{post.message}</td>
      <td className="p-4">
        <TableAction onDelete={() => handleOpenDeletePostModal(post.f_page_post_id)} />
      </td>
    </tr>
  );

  return (
    <div>
      {/* Delete Post Confirmation Modal */}
      {showModalDeletePost && (
        <ConfirmModal
          title={t('group_post_detail.title_remove_post')}
          textCancel="ຍົກເລີກ"
          textConfirm="ລົບຂໍ້ມູນ"
          show={showModalDeletePost}
          setShow={setShowModalDeletePost}
          message="ທ່ານຕ້ອງການລົບຂໍ້ມຸນອອກຈາກລະບົບບໍ່?"
          handleConfirm={handleDeletePost}
        />
      )}

      {/* Back Button */}
      <div className="px-8 pb-6">
        <Button variant="info" onClick={() => navigate(-1)} className="text-black" icon={iconArrowBack} shape="rounded">
          {t('btn_back')}
        </Button>
      </div>

      {/* Posts Section */}
      <div className="w-full py-2">
        <div className="w-full rounded-xl bg-white dark:bg-boxdark">
          <div>
            <h1 className="pb-6 text-black dark:text-white">
              <div className="w-full">
                <Table
                  className="pt-8"
                  title={t('group_post_detail.title_post_detail')}
                  headerAction={[
                    <Button key="add-post" className="h-10" icon={iconAdd} onClick={() => setIsModalOpen(true)}>
                      {t('group_post_detail.btn_add_post')}
                    </Button>,
                  ]}
                  header={groupPostDetailHeader(t)}
                  data={posts}
                  body={<>{posts.map(renderPostRow)}</>}
                  loading={loadingPage}
                  dataEmptyText="ບໍ່ພົບ Page"
                  children={undefined}
                />
              </div>
            </h1>
          </div>

          {/* Add Post Modal */}
          <ModalFeedImage
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            groupId={groupId}
            pageId={pageId}
            onPostAdded={fetchPageData}
          />
        </div>
      </div>

      {/* Product Lists Section */}
      <div className="gap-4 xl:grid xl:grid-cols-2">
        {/* {groupProduct && ( */}
        <ProductListStock
          groupProduct={groupProduct}
          products={products}
          queryParams={queryParams}
          totalPages={totalPages}
          isLoading={loadingProduct}
          onAddProducts={handleAddProducts}
          onSearchChange={(searchTerm: string) => {
            const search = { ...queryParams, search: searchTerm, page: 1 };
            setQueryParams(search);
            getProduct(search);
          }}
          onPageChange={(page: number) => getProduct({ ...queryParams, page })}
          onRowPerPageChange={(limit: number) => getProduct({ ...queryParams, limit })}
        />
        {/* )} */}

        <ProductListDetail
          groupData={groupProduct}
          productsGroup={products}
          queryParams={queryParams}
          totalPages={totalPages}
          isLoading={loadingProduct}
          onRemoveProducts={handleRemoveProducts}
          onPageChange={(page: number) => getProduct({ ...queryParams, page })}
          onRowPerPageChange={(limit: number) => getProduct({ ...queryParams, limit })}
          onSearchChange={(searchTerm: string) => {
            const search = { ...queryParams, search: searchTerm, page: 1 };
            setQueryParams(search);
            getProduct(search);
          }}
          onAddProducts={() => fetchGroupData()}
        />
      </div>
    </div>
  );
};

export default GroupDetail;
