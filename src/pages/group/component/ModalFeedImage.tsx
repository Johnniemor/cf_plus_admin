import Button from '@/components/Button';
import DropdownMenuWithImages from '@/components/Forms/ImageSelect';
import { iconCancel, IconConnectPost, IconImage } from '@/configs/icon';
import usePageHook from '@/hooks/page/usePageHook';
import { IAddPost } from '@/types/group/group';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ModalFeedImage: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  groupId?: string;
  pageId?: string;
  onPostAdded?: () => void;
}> = ({ isOpen, onClose, groupId, pageId, onPostAdded }) => {
  const {
    feed,
    setSelectedPageId,
    getFeedHook,
    getPageHook,
    selectedPageId,
    queryParams,
    isLoading,
    setIsLoading,
    createPostHook,
  } = usePageHook();

  const [preview, setPreview] = useState<string[] | null>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getPageHook(queryParams);
  }, []);

  useEffect(() => {
    if (selectedPageId) {
      getFeedHook(queryParams, selectedPageId);
    }
  }, [selectedPageId]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IAddPost>({
    defaultValues: { type: 'add', group_id: groupId || '', page_id: '', f_post_ids: [] },
  });

  useEffect(() => {
    if (isOpen) {
      setValue('page_id', pageId ?? '');
      reset({
        type: 'add',
        group_id: groupId || '',
        page_id: pageId || '',
        f_post_ids: [],
      });
      setSelectedPageId(pageId ?? '');
    }
  }, [isOpen, pageId, groupId, setValue, reset, setSelectedPageId]);

  const onHandleSubmit = async (data: IAddPost) => {
    try {
      setIsLoading(true);
      const response = await createPostHook(data);

      if (onPostAdded) {
        onClose();
        onPostAdded();
      }

      toast.success(t('group_post_detail.post_created_success'));
      setPreview([]);
      return response;
    } catch (error: any) {
      toast.error(error?.message || error?.data || 'Network Error!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (imageUrls: string[], isRemoval?: boolean, removedUrl?: string) => {
    if (isRemoval && removedUrl) {
      setPreview((prev) => (prev ? prev.filter((url) => url !== removedUrl) : []));
    } else if (imageUrls.length > 0) {
      setPreview((prev) => [...(prev || []), ...imageUrls]);
    }
  };

  const handleClose = () => {
    setPreview([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center rounded-[10px]">
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 mx-4 w-full max-w-[606px] rounded-lg bg-white p-6">
        <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700" onClick={handleClose}>
          {iconCancel}
        </button>

        <h2 className="w-full pb-[18px] text-left font-['Noto_Sans_Lao'] text-base font-semibold tracking-wide text-neutral-500 md:text-xl">
          {t('group_post_detail.title_create_post')}
        </h2>
        <h3 className="justify-start font-['Noto_Sans_Lao'] text-base font-semibold leading-normal text-neutral-500">
          {t('group_post_detail.title_create_post_2')}
        </h3>

        <div className="h-32 w-full max-w-[575px] rounded-lg border border-gray-300 bg-white">
          {preview && preview.length > 0 ? (
            <div className="flex items-center space-x-2 p-[26px] align-middle">
              {preview.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`Preview ${index}`} className="h-17 w-17 rounded-md object-cover" />
              ))}
            </div>
          ) : (
            <div className="flex items-center p-[26px] align-middle">
              <div>
                <div className="relative h-12 w-12 overflow-hidden">{IconImage}</div>
                <h1 className="h-6 w-20 justify-start font-['Noto_Sans_Lao'] text-xs font-semibold leading-none text-zinc-400">
                  {t('group_post_detail.label_none_picture')}
                </h1>
              </div>
              <div className="justify-start font-['Noto_Sans_Lao'] text-sm font-medium leading-tight text-neutral-500">
                {t('group_post_detail.label_please_choose_picture')}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onHandleSubmit)} className="pt-1">
          <DropdownMenuWithImages
            pageId={pageId}
            placeholder={t('group.label_choose_feed')}
            classLabel="mb-2.5"
            label={t('group.label_choose_feed')}
            imageSize="large"
            control={control}
            error={errors}
            name="f_post_ids"
            options={feed.map((item) => ({
              value: item.id,
              imageUrl: item.full_picture,
              action: 'hello',
              share: new Date(item.created_time).toLocaleDateString(),
            }))}
            onImageSelect={handleImageSelect}
          />

          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <Button className="h-10 rounded bg-gray-700" type="button" onClick={handleClose}>
              {t('btn_cancel')}
            </Button>
            <Button className="h-10 rounded bg-green-500" icon={IconConnectPost} type="submit" disabled={isLoading}>
              {t('group_post_detail.btn_connect_post')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFeedImage;
